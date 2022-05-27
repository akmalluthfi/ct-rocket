<?php

use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\ORM\ValidationException;

class UserController extends Controller
{
    private static $allowed_actions = [
        'follow',
        'unfollow',
        'block',
        'unblock',
        'getVisitors',
        'getFollowers'
    ];

    private static $url_handlers = [
        'GET /' => 'index',
        'POST /' => 'make',
        'GET visitors/$UserID' => 'getVisitors',
        'GET followers/$UserID' => 'getFollowers'
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

    public function block()
    {
        if (!$this->getRequest()->isAjax()) return $this->httpError(404);
        $this->getResponse()->addHeader('content-type', 'application/json');

        $data = $_POST;

        // cek apakah user difollow atau belum 
        // apakah user id yang mau diblock(blocked id) followed(mengikuti/difollow) user yang mau memblokir (userID) 
        $hasfollow = UserFollowed::get()->filter([
            'UserID' => $data['blockedID'],
            'FollowedID' => $data['userID']
        ])->first();

        // jika sudah follow, hapus
        if ($hasfollow) $hasfollow->delete();

        // cek apakah user sudah diblock atau belum 
        $blocked = UserBlock::get()->filter([
            'UserID' => $data['blockedID'],
            'BlockedID' => $data['userID']
        ])->first();

        // jika sudah diblock, hapus
        if ($blocked) $blocked->delete();

        $block = UserBlock::create();
        $block->UserID = $data['userID']; // id yang diblock
        $block->BlockedID = $data['blockedID']; // id yang memblokir

        try {
            $block->write();
        } catch (ValidationException $e) {
            return $this->getResponse()->setBody(json_encode([
                'status' => 500,
                'message' => $e->getMessage()
            ]));
        }

        return $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Success',
        ]));
    }

    public function unblock()
    {
        if (!$this->getRequest()->isAjax()) return $this->httpError(404);
        $this->getResponse()->addHeader('content-type', 'application/json');

        $data = $_POST;

        // cek apakah ada didatabase 
        $exists = UserBlock::get()->filter([
            'UserID' => $data['userID'],
            'BlockedID' => $data['blockedID']
        ])->first();

        $this->getResponse()->addHeader('content-type', 'application/json');

        // jika tidak ada return pesan error
        if (is_null($exists)) return $this->getResponse()->setBody(json_encode([
            'status' => 400,
            'message' => 'you not follow this account'
        ]));

        // jika ada 
        if ($exists) $exists->delete();

        return $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'success unblock',
        ]));
    }

    public function getVisitors(HTTPRequest $request)
    {
        // cek apakah request dari ajax 
        if (!$request->isAjax()) return $this->httpError(404);

        // set response 
        $this->getResponse()->addHeader("Content-type", "application/json");

        // cek apakah ada param 
        $userID = $request->param('UserID');
        if (is_null($userID)) return $this->getResponse()->setBody(json_encode([
            'status' => 400,
            'message' => 'no parameters passed',
        ]));

        // cek apakah ada queryparam
        $filterByDay = $request->getVar('filter') ?? 'today';

        if ($filterByDay === 'today') {
            $filter = [
                'VisitedAt:PartialMatch' => date('Y-m-d')
            ];
        } else if ($filterByDay === 'last7days') {
            $filter = [
                'VisitedAt:GreaterThanOrEqual' => date('Y-m-d', strtotime('-7 days')),
                'VisitedAt:LessThanOrEqual' => date('Y-m-d'),
            ];
        }

        // get user berdasarkan id 
        $user = User::get_by_id($userID);

        // cek apakah user ada 
        if (is_null($user)) return $this->getResponse()->setBody(json_encode([
            'status' => 404,
            'message' => 'User not found',
        ]));

        // jika ada, 
        // ambil jumlah visitor
        $filteredVisitors = $user->Visitors()->filter($filter);

        return $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Success',
            'totalResults' => $filteredVisitors->Count(),
        ]));
    }

    public function getFollowers(HTTPRequest $request)
    {
        if (!$request->isAjax()) return $this->httpError(404);

        // set response 
        $this->getResponse()->addHeader("Content-type", "application/json");

        // cek apakah ada param 
        $userID = $request->param('UserID');
        if (is_null($userID)) return $this->getResponse()->setBody(json_encode([
            'status' => 400,
            'message' => 'no parameters passed',
        ]));

        // get user berdasarkan id 
        $user = User::get_by_id($userID);

        // cek apakah user ada 
        if (is_null($user)) return $this->getResponse()->setBody(json_encode([
            'status' => 404,
            'message' => 'User not found',
        ]));

        // cek apakah ada queryparam
        $filterByDay = $request->getVar('filter') ?? 'today';

        if ($filterByDay === 'today') {
            $filter = [
                'FollowedAt:PartialMatch' => date('Y-m-d')
            ];
        } else if ($filterByDay === 'last7days') {
            $filter = [
                'FollowedAt:GreaterThanOrEqual' => date('Y-m-d', strtotime('-7 days')),
                'FollowedAt:LessThanOrEqual' => date('Y-m-d'),
            ];
        }

        // cari semua id followers akun ini, lalu filter
        $followers = $user->UserFollowed();
        $filteredFollowers = $followers->filter($filter);

        // jika ada hitung jumlah followers 
        // followers didapatkan dari menghitung jumlah userId pada tabel UserFollowed
        // user_id diikuti oleh followedID 
        return $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Success',
            'totalFollowers' => $followers->Count(),
            'filteredFollowers' => $filteredFollowers->Count(),
            'filterBy' => $filterByDay
        ]));
    }
}
