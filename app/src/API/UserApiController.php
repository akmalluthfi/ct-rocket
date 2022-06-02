<?php

namespace API;

use Follower;
use User;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;

class UserApiController extends Controller
{
  /*
    End Point 
    GET /users => get all user
    GET /users/{username} => get single user
    GET /users/{username}/posts => get user posts
    GET /users/{username}/visitor => get user visitor
    GET /users/{username}/followers => get user followers
    query params
    {
      filter: last7days | today 
    }
    GET /users/{username}/following/{other} => check if user follow other user
    POST /users/{username}/following/{other} => user follow other user 
    DELETE /users/{username}/following/{other} => user unfollow other user

  */

  public function init()
  {
    parent::init();

    $this->getResponse()->addHeader("Content-type", "application/json");
    $this->getResponse()->addHeader(
      'Access-Control-Allow-Origin',
      "*"
    );
    $this->getResponse()->addHeader("Access-Control-Allow-Methods", "GET");
    $this->getResponse()->addHeader("Access-Control-Allow-Headers", "x-requested-with");
  }

  public function index(HTTPRequest $request)
  {
    $username = $request->param('username');
    if (!is_null($username)) {
      // cek apakah username tersedia
      $user = User::get()->filter('Username', $username)->first();

      // cek apakah user ada 
      if (is_null($user)) return $this->getResponse()->setBody(json_encode([
        'success' => false,
        'message' => "$username Not Found!",
      ]));

      // cek resource mana yang mau diakses
      $resource = $request->param('resource');
      if ($resource === 'posts') {
        return $this->getUserPosts($user);
      } else if ($resource === 'visitors') {
        return $this->getUserVisitors($user, $request);
      } else if ($resource === 'followers') {
        return $this->getUserFollowers($user, $request);
      } else if ($resource === 'following') {
        // cek apakah ada param other 
        if (is_null($other_user = $request->param('other')))
          return $this->getUserFollowing($user, $request);

        // jika ada 
        // cek http request yang dipakai 
        if ($request->isGET()) return $this->isUserFollowing($user, $other_user);
        if ($request->isPOST()) return $this->setFollowUser($user, $other_user);
        if ($request->isDELETE()) return $this->setUnfollowUser($user, $other_user);
      } else {
        return $this->getUser($user);
      }
    } else {
      return $this->getAllUsers();
    }
  }

  // ! Working in this line
  // method unfollow user
  public function setUnfollowUser($user, $wantToUnFollow)
  {
    // cek apakah ada user dengan username yang mau difollow
    $user_wantToUnfollow = User::get()->filter('Username', $wantToUnFollow)->first();

    // cek apakah user ada 
    // jika tidak ada return error
    if (is_null($user_wantToUnfollow)) return $this->getResponse()->setBody(json_encode([
      'success' => false,
      'message' => "$wantToUnFollow Not Found!",
    ]));

    // cek apakah ada user id yang mau diunfollow di followers user 
    $follow = Follower::get()->filter(['UserID' => $user_wantToUnfollow->ID, 'FollowedID' => $user->ID])->first();

    if (is_null($follow)) return $this->getResponse()->setBody(json_encode([
      'success' => false,
      'message' => "you not followed by $wantToUnFollow",
    ]));

    // hapus data 
    $follow->delete();
    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "success unfollow $wantToUnFollow",
    ]));
  }

  // this method to follow another user
  public function setFollowUser($user, $wantToFollow)
  {
    // $user => user followedID 
    // $wantToFollow => userID

    // cek apakah ada user dengan username yang mau difollow
    $user_wantToFollow = User::get()->filter('Username', $wantToFollow)->first();

    // cek apakah user ada 
    // jika tidak ada return error
    if (is_null($user_wantToFollow)) return $this->getResponse()->setBody(json_encode([
      'success' => false,
      'message' => "$wantToFollow Not Found!",
    ]));

    // buat instance 
    $follow = Follower::create();
    $follow->UserID = $user_wantToFollow->ID;
    $follow->FollowedID = $user->ID;
    $follow->FollowedAt = date('Y-m-d');

    try {
      $follow->write();
      return $this->getResponse()->setBody(json_encode([
        'success' => true,
        'message' => "$user->Username success follow $user_wantToFollow->Username",
      ]));
    } catch (\SilverStripe\ORM\ValidationException $e) {
      return $this->getResponse()->setBody(json_encode([
        'success' => false,
        'message' => $e->getMessage(),
      ]));
    }
  }

  /*
    param {
      user: data list user (from user get)
      $following: string username 
    }
  */
  public function isUserFollowing($user, $following)
  {
    // cek apakah ada user username $user_following
    $user_following = User::get()->filter('Username', $following)->first();

    // cek apakah user ada 
    // jika tidak ada return error
    if (is_null($user_following)) return $this->getResponse()->setBody(json_encode([
      'success' => false,
      'message' => "$following Not Found!",
    ]));

    $isFollowing = $user_following->followers()->filter('FollowedID', $user->ID)->first();

    // cek apakah user sudah difollow
    if (is_null($isFollowing)) return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "$user->Username($user->ID) not following $user_following->Username($user_following->ID)",
      'following' => false
    ]));

    // user follow
    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "$user->Username($user->ID) has following $user_following->Username($user_following->ID)",
      'following' => true,
    ]));
  }


  public function getUserFollowers($user, HTTPRequest $request)
  {
    // cek apakah ada queryparam
    if (!is_null($filterByDay = $request->getVar('filter'))) return $this->_getFilteredUserFollower($filterByDay, $user);

    //! jika tidak ada 

    // ambil user followers
    $followersRef = $user->followers();
    // loop data tiap follower
    $followers = [];
    foreach ($followersRef as $follower) {
      $userFollower = User::get_by_id($follower->FollowedID);
      array_push($followers, [
        'id' => $userFollower->ID,
        'username' => $userFollower->Username,
        'isBusinessAccount' => $userFollower->isBusinessAccount,
        'avatar_url' => $userFollower->avatar_url(),
        'posts_url' => $userFollower->posts_url(),
        'followers' => $userFollower->followers_url(),
        'following' => $userFollower->following_url(),
      ]);
    }

    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "Success get followers from $user->Username",
      'total_followers' => $followersRef->count(),
      'followers' => $followers,
    ]));
  }

  public function getUserVisitors($user, HTTPRequest $request)
  {
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

    $visitors = $user->Visitors()->filter($filter);

    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "Success get visitors accounts from $user->Username",
      'visitors' => $visitors->count(),
    ]));
  }

  public function getUserPosts($user)
  {
    // ambil posts user 
    $posts = [];

    foreach ($user->Posts() as $i => $post) {
      array_push($posts, [
        'id' => $post->ID,
        'isAds' => $post->isAds,
        'created' => $post->Created,
        'caption' => $post->Caption,
        'isAds' => $post->isAds,
        'categories' => [],
        'images' => [],
      ]);

      foreach ($post->Categories() as $category) {
        array_push($posts[$i]['categories'], [
          'id' => $category->ID,
          'name' => $category->Name
        ]);
      }

      foreach ($post->Images() as $image) {
        array_push($posts[$i]['images'], [
          'id' => $image->ID,
          'caption' => $image->Caption,
          'link' => $image->Fill(614, 614)->AbsoluteLink(),
        ]);
      }
    }

    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "Success get posts $user->Username",
      'author' => [
        'id' => $user->ID,
        'avatar_url' => $user->avatar_url(),
        'username' => $user->Username,
        'isBusinessAccount' => $user->isBusinessAccount,
      ],
      'posts' => $posts
    ]));
  }

  public function getUser($user)
  {
    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => 'success get user',
      'user' => [
        'id' => $user->ID,
        'username' => $user->Username,
        'email' => $user->Email,
        'bio' => $user->Bio,
        'isBusinessAccount' => $user->isBusinessAccount,
        'avatar_url' => $user->avatar_url(),
        'posts' => $user->Posts()->Count(),
        'followers' => $user->getFollowers(),
        'following' => $user->getFollowing(),
      ]
    ]));
  }

  public function getAllUsers()
  {
    $resource = [];
    foreach (User::get() as $user) {
      array_push($resource, [
        'id' => $user->ID,
        'username' => $user->Username,
        'email' => $user->Email,
        'bio' => $user->Bio,
        'isBusinessAccount' => $user->isBusinessAccount,
        'avatar_url' => $user->avatar_url(),
        'followers' => $user->getFollowers(),
        'following' => $user->getFollowing(),
      ]);
    }

    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => 'success get all users',
      'posts' => $resource
    ]));
  }

  // Method helper for getUserFollowers
  public function _getFilteredUserFollower($filterVal, $user)
  {
    // cek nilai dari filter
    if ($filterVal === 'today') {
      $filter = [
        'FollowedAt:PartialMatch' => date('Y-m-d')
      ];
    } else if ($filterVal === 'last7days') {
      $filter = [
        'FollowedAt:GreaterThanOrEqual' => date('Y-m-d', strtotime('-7 days')),
        'FollowedAt:LessThanOrEqual' => date('Y-m-d'),
      ];
    }

    // ambil user 
    $followers = $user->followers()->filter($filter);

    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => "Success get followers from $user->Username",
      'followers' => $user->getFollowers(),
      'followers_url' => $user->followers_url(),
      'filtered_followers' => $followers->count(),
      'filtered_by' => $filterVal
    ]));
  }
}
