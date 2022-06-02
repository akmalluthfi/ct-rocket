<?php

use SilverStripe\Assets\Upload;
use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\ORM\ValidationException;

class PostController extends Controller
{
    private static $allowed_actions = [
        'index',
        'make',
        'edit',
        'delete',
        'getPost',
        'getPosts',
        'getAllPosts',
        'getPostsByUserId',
        'getPostsByUserName',
        'updatePostAds'
    ];

    private static $url_handlers = [
        'GET /$id!/' => 'getPost',
        'GET /' => 'getAllPost',
        'POST /' => 'make',
        'byUsername/$Username' => 'getPostsByUserName',
        'PUT $id!/ads' => 'updatePostAds'
    ];

    public function init()
    {
        parent::init();
    }

    public function index(HTTPRequest $request)
    {
        if (!is_null($request->getVar('id'))) {
            return $this->getPost($request->getVar('id'));
        } else {
            return $this->getAllPosts($request);
        }
    }

    public function updatePostAds(HTTPRequest $request)
    {
        // cek apakah method nya put 
        if (!$request->isPUT()) return $this->httpError(404);

        // cek apakah ajax
        // if (!$request->isAjax()) return $this->httpError(404);

        // set response header
        $this->getResponse()->addHeader("Content-type", "application/json");

        // ambil parameter id dan body 
        $body = json_decode($request->getBody());
        $id = $request->param('id');
        // ambil post berdasarkan id
        $post = Post::get_by_id($id);
        // lalu ubah column isAds menjadi apa yang dikirim oleh user
        $post->isAds = $body->value;

        try {
            $post->write();
            return $this->getResponse()->setBody(json_encode([
                'status' => 200,
                'message' => 'success update post with id ' . $post->ID,
                'post' => $post->toMap(),
            ]));
        } catch (ValidationException $e) {
            return $this->getResponse()->setBody(json_encode([
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ]));
        }
    }

    public function getAllPosts($request)
    {
        if (!$request->isAjax()) return $this->httpError(404);

        $allPosts = [];
        $images = [];
        $categories = [];

        // filter ketika user diblock, tidak bisa melihat postingan user tersebut
        // cari apakah user ini sedang diblock oleh blocked_id
        $blockedID = UserBlock::get()->filter([
            'UserID' => Security::getCurrentUser()->ID
        ])->column('BlockedID');

        // cari id user yang difollow oleh user ini
        $notFollow = UserFollowed::get()->filter([
            'UserID' => Security::getCurrentUser()->ID,
        ])->column('FollowedID');

        // kumpulkan filter
        $postFilter = [
            'UserID' =>  $notFollow
        ];

        // cek, jika empty akan error
        if (!empty($blockedID)) {
            $postFilter['UserID:not'] = $blockedID;
        }

        $posts = Post::get()->filter($postFilter);

        foreach ($posts as $key => $post) {
            foreach ($post->Images() as $image) {
                $images[] = [
                    'link' => $image->Fill(614, 614)->Link(),
                    'caption' => $image->Caption
                ];
            }

            foreach ($post->Categories() as $category) {
                $categories[] = [
                    'title' => $category->Title,
                    'link' => $category->Link()
                ];
            }

            $allPosts[$key] = [
                'author' => [
                    'username' => $post->User()->Username,
                    'profileLink' => $post->User()->Picture()->Link(),
                ],
                'caption' => $post->Caption,
                'categories' => $categories,
                'images' => $images
            ];

            $images = [];
            $categories = [];
        }

        return json_encode($allPosts);
    }

    public function getPost($id)
    {
        if (!$this->getRequest()->isAjax()) return $this->httpError(404);

        $post = Post::get_by_id($id);

        if (is_null($post)) {
            $this->getResponse()->setBody(json_encode([
                'status' => 404,
                'message' => 'Post Not Found'
            ]));

            $this->getResponse()->setStatusCode(404, 'NOT FOUND');
            $this->getResponse()->addHeader('content-type', 'application/json');
            return $this->getResponse();
        }

        foreach ($post->Images() as $image) {
            $images[] = [
                'link' => $image->Fill(614, 614)->Link(),
                'caption' => $image->Caption
            ];
        }

        $this->getResponse()->addHeader('content-type', 'application/json');
        $this->getResponse()->setBody(json_encode([
            'status' => 200,
            // 'message' => 'Success get post with id : ' . $post->ID,
            'post' => [
                'username' => $post->User()->Username,
                'profilePicture' => $post->User()->Picture()->Link(),
                'caption' => $post->Caption,
                'categories' => $post->Categories()->column('Title'),
                'images' => $images
            ]
        ]));

        return $this->getResponse();
    }

    public function make(HTTPRequest $request)
    {
        if (!Security::getCurrentUser()) return $this->redirect('login/');
        if (!$request->isAjax()) return $this->httpError(404);

        if (!$request->postVars()) return $this->httpError(400);

        // settings respon 
        $request->addHeader('content-type', 'application/json');
        $this->getResponse()->setStatusCode(200, 'OK');
        $this->getResponse()->addHeader('content-type', 'application/json');

        // ambil data user yang sedang aktif 
        $user = Security::getCurrentUser();

        // buat post baru 
        $post = Post::create();
        $post->Caption = $request->postVar('caption');
        $post->UserID = $user->ID;

        foreach ($request->postVar('categories') as $category) {
            // cek apakah array category sudah tersedia 
            $hasCategory = Category::get()->filter('Title', $category)->first();
            if (isset($hasCategory)) {
                // jika iya tambahkan ke category milik user baru 
                $post->Categories()->push($hasCategory);
            } else {
                // jika tidak ada, buat category baru dengan category yang dikirimkan 
                $categoryInstance = Category::create();
                // $categoryInstance->Title = '#' . $category;

                try {
                    $categoryInstance->write();
                } catch (ValidationException $e) {
                    // jika gagal menambahkan category baru 
                    $this->getResponse()->setBody(json_encode([
                        'status' => 500,
                        'message' => $e->getMessage()
                    ]));
                    return $this->getResponse();
                }
                // jika berhasil menambahkan category baru
                // tambahkan category tersebut di category milik user  
                $post->Categories()->push($categoryInstance);
            }
        }

        try {
            $idPost = $post->write();
        } catch (ValidationException $e) {
            // gagal upload post 
            $this->getResponse()->setBody(json_encode([
                'status' => 500,
                'message' => $e->getMessage()
            ]));
            return $this->getResponse();
        }

        // jika berhasil, coba semua gambar dengan id post yang baru 
        $i = 0;
        // upload semua img 
        foreach ($_FILES as $file) {
            $imageObject = CustomImage::create();
            $imageObject->Caption = $_POST['description-' . $i] ?? '';
            $imageObject->PostID = $idPost;
            try {
                $upload = new Upload();
                $upload->loadIntoFile($file, $imageObject, 'User Post Image/' . $user->ID);
                $upload->getValidator()->setAllowedExtensions(['jpg', 'jpeg', 'png']);
            } catch (Exception $e) {
                // jika gagal upload image
                $this->getResponse()->setBody(json_encode([
                    'status' => 500,
                    'message' => $e->getMessage()
                ]));
                return $this->getResponse();
            }
            $i++;
        }

        $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Your post has been shared.'
        ]));

        return $this->getResponse();
    }

    public function getPosts(HTTPRequest $request)
    {
        // Search Field on Navbar
        if (!$request->isAjax()) return $this->httpError(404);

        if (!$request->getVar('term')) return $this->httpError(400);

        if ($request->getVar('term')[0] === '#') {
            $keyword = substr($request->getVar('term'), 1);

            $categoryId = Category::get()->filter([
                'Title:PartialMatch' => $keyword
            ]);

            return json_encode($categoryId->column('Title'));
        }

        // cari id yang memblokir user yang sedang aktif 
        $blockedID = UserBlock::get()->filter([
            'UserID' => Security::getCurrentUser()->ID
        ])->column('BlockedID');

        // filter, saat user A mencari id user B (yang memblokir), 
        $users = User::get()->filter([
            'Username:PartialMatch' => $request->getVar('term'),
            'ID:not' => $blockedID
        ]);

        return json_encode($users->column('Username'));
    }

    public function getPostsByUserId(HTTPRequest $request)
    {
        if (!$request->isAjax()) return $this->httpError(404);
        if (!$request->param('ID')) return $this->httpError(404);

        $userPosts = Post::get()->filter('UserID', $request->param('ID'));

        $posts = [];

        foreach ($userPosts as $index => $post) {
            $posts[$index] = [
                'Id' => $post->ID,
                'Caption' => $post->Caption,
                'Categories' => $post->Categories()->column('Title')
            ];

            foreach ($post->Images() as $image) {
                $posts[$index]['Images'][] = [
                    'Link' => $image->Fill(614, 614)->Link(),
                    'Caption' => $image->Caption
                ];
            }
        }
        return json_encode($posts);
    }

    public function getPostsByUserName(HTTPRequest $request)
    {
        if (!$request->isAjax()) return $this->httpError(404);
        if (!$request->param('Username')) return $this->httpError(400, 'Include param username');

        $userPosts = Post::get()->filter('User.Username', $request->param('Username'));

        if (!$userPosts->exists()) return $this->httpError(404, 'User Not Found');

        $user = $userPosts->first()->User();

        $posts = [
            'author' => [
                'id' => $user->ID,
                'picture' => $user->Picture()->Fill(150, 150)->Link(),
                'username' => $user->Username,
                'bio' => $user->Bio,
                'followers' => $user->getFollowers(),
                'following' => $user->UserFollowed()->Count(),
                'hasFollow' => $user->hasFollow(Security::getCurrentUser()->ID)
            ]
        ];

        foreach ($userPosts as $index => $post) {
            $posts['posts'][$index] = [
                'Id' => $post->ID,
                'isAds' => $post->isAds,
                'Caption' => $post->Caption,
                'Categories' => $post->Categories()->column('Title')
            ];

            foreach ($post->Images() as $image) {
                $posts['posts'][$index]['Images'][] = [
                    'Link' => $image->Fill(614, 614)->Link(),
                    'Caption' => $image->Caption
                ];
            }
        }
        return json_encode($posts);
    }

    public function edit()
    {
    }

    public function delete()
    {
    }
}
