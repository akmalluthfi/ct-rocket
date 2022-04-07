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
        'getAllPosts'
    ];

    private static $url_handlers = [
        'GET /' => 'index',
        'POST /' => 'make',
    ];

    public function init()
    {
        parent::init();
    }

    public function index(HTTPRequest $request)
    {
        if ($request->getVar('id')) {
            return $this->getPost($request->getVar('id'));
        } else {
            return $this->getAllPosts();
        }
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
                'link' => $image->Link(),
                'caption' => $image->Caption
            ];
        }

        $this->getResponse()->addHeader('content-type', 'application/json');
        $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Success get post with id : ' . $post->ID,
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
                $categoryInstance->Title = '#' . $category;

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
            $imageObject->Caption = $_POST['description-' . $i];
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
        if (!$request->isAjax()) return $this->httpError(404);

        if (!$request->getVar('term')) return $this->httpError(400);

        if ($request->getVar('term')[0] === '#') {
            $keyword = substr($request->getVar('term'), 1);

            $categoryId = Category::get()->filter([
                'Title:PartialMatch' => $keyword
            ]);

            return json_encode($categoryId->column('Title'));
        }

        $users = User::get()->filter([
            'Username:PartialMatch' => $request->getVar('term')
        ]);

        return json_encode($users->column('Username'));
    }

    public function edit()
    {
    }

    public function delete()
    {
    }
}
