<?php

use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;

class ExploreController extends Controller
{
    private static $allowed_actions = [
        'tags'
    ];

    private static $url_handlers = [
        'GET tags/$tags' => 'tags',
    ];

    public function index()
    {
        return $this->httpError(404);
    }

    public function tags(HTTPRequest $request)
    {
        if (empty($request->param('tags'))) return $this->httpError(404);

        // cari tags didalam category 
        $category = Category::get()->filter([
            'Title' => '#' . $request->param('tags')
        ])->first();

        // jika ada, ambil idnya, 
        if (is_null($category)) return $this->httpError(404);

        // lalu cari post berdasarkan category id yang didapat 
        $posts = Post::get()->filter([
            'Categories.ID' => $category->ID
        ]);

        $user = $posts->first()->User();
        $p = [
            'author' => [
                'id' => $user->ID,
                'picture' => $user->Picture()->Fill(150, 150)->Link(),
                'username' => $user->Username,
                'bio' => $user->Bio,
                'followers' => $user->getFollowers(),
                'following' => $user->UserFollowed()->Count(),
                'hasFollow' => $user->hasFollow(Security::getCurrentUser()->ID)
            ],
            'status' => [
                'code' => 200,
                'message' => 'success',
                'categoryName' => $category->Title
            ]
        ];

        foreach ($posts as $index => $post) {
            $p['posts'][$index] = [
                'Id' => $post->ID,
                'Caption' => $post->Caption,
                'Categories' => $post->Categories()->column('Title')
            ];

            foreach ($post->Images() as $image) {
                $p['posts'][$index]['Images'][] = [
                    'Link' => $image->Fill(614, 614)->Link(),
                    'Caption' => $image->Caption
                ];
            }
        }

        if ($this->getRequest()->isAjax()) return json_encode($p);

        return $this->customise([
            'CategoryName' => $category->Title,
            'Title' => $category->Title . ' category on rocket',
            'getAccTk' => Token::get()->filter('UserID', Security::getCurrentUser()->ID)->first()->Token
        ])->renderWith(['Tags', 'Page']);
    }
}
