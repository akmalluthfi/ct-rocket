<?php

use SilverStripe\Security\Security;

class HomePageController extends PageController
{
    private static $allowed_actions = [
        'getPosts'
    ];

    public function init()
    {
        parent::init();

        if (!Security::getCurrentUser()) return $this->redirect('login/');
    }

    public function getPosts()
    {
        // ambil id current user 
        // query ke userfollowed dan ambil followedID, simpan dalam array 
        $userID = UserFollowed::get()->filter([
            'UserID' => Security::getCurrentUser()->ID
        ]);

        $arrIdUser =  $userID->column('FollowedID');
        $arrIdUser[] = Security::getCurrentUser()->ID;

        return Post::get()->filter([
            'UserID' => $arrIdUser
        ])->sort('ID', 'DESC');
    }
}
