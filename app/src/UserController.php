<?php

use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\ORM\ValidationException;

class UserController extends Controller
{
    private static $allowed_actions = [
        'follow', 'unfollow'
    ];

    private static $url_handlers = [
        'GET /' => 'index',
        'POST /' => 'make',
    ];

    public function init()
    {
        parent::init();

        if (!Security::getCurrentUser()) return $this->redirect('login/');
    }

    public function follow()
    {
        // cek apakah sudah ada atau belum 
        $hasfollow = UserFollowed::get()->filter([
            'UserID' => $_POST['userID'],
            'FollowedID' => $_POST['followedID']
        ])->first();

        $this->getResponse()->addHeader('content-type', 'application/json');

        // jika sudah follow, hapus, agar dibuatkan lagi
        if ($hasfollow) $hasfollow->delete();

        // jika belum follow user tersebut 
        $follow = UserFollowed::create();

        $follow->UserID = $_POST['userID'];
        $follow->FollowedID = $_POST['followedID'];

        try {
            $follow->write();
        } catch (ValidationException $e) {
            return $this->getResponse()->setBody(json_encode([
                'status' => 500,
                'message' => $e->getMessage()
            ]));
        }

        return $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Success',
            'followers' => User::get_by_id($_POST['followedID'])->getFollowers()
        ]));
    }

    public function unfollow()
    {
        // cek apakah ada UserID dan FollowedID yg sama
        $user = UserFollowed::get()->filter([
            'UserID' => $_POST['userID'],
            'FollowedID' => $_POST['followedID']
        ])->first();

        $this->getResponse()->addHeader('content-type', 'application/json');

        // jika tidak ada return pesan error
        if (is_null($user)) return $this->getResponse()->setBody(json_encode([
            'status' => 400,
            'message' => 'you not follow this account'
        ]));

        // jika iya hapus, 
        $user->delete();

        return $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'success unfollowed',
            'followers' => User::get_by_id($_POST['followedID'])->getFollowers(),
            'userID' => $_POST['userID'],
            'followedID' => $_POST['followedID']
        ]));
    }
}
