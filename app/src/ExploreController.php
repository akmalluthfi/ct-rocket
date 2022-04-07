<?php

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

        return $this->customise([
            'CategoryName' => $category->Title,
            'Title' => $category->Title . ' category on rocket',
            'Posts' => $posts
        ])->renderWith(['Tags', 'Page']);
    }
}
