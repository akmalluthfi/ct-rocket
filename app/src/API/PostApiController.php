<?php

namespace API;

use Follower;
use Post;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use User;

class PostApiController extends Controller
{
  private static $allowed_actions = [
    'getAllPosts',
    'getPostById'
  ];

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
    $id = $request->param('id');
    if (!is_null($id)) {
      return $this->getPostById($id);
    } else {
      return $this->getAllPosts($request);
    }
    die();
  }

  /*
  TODO : get all posts
  @query param for filtering,  
  {
    user-id = :userId, 
  }
  @return all post lists
  */
  public function getAllPosts(HTTPRequest $request)
  {
    // cek apakah dikirim lewat ajax 
    // if (!$request->isAjax()) return $this->httpError(404);

    // dapatkan semua posts, yang bukan ads 
    $posts = Post::get()->filter('isAds', false)->sort('Created');

    // cek apakah ada param user
    if ($filterUser = $request->getVar('user')) {
      // jika ada cek apakah user tersebut tersedia 
      $user = User::get()->filter('Username', $filterUser)->first();
      if ($user) {
        // ambil siapa id akun yang difollow
        $following = Follower::get()->filter('FollowedID', $user->ID);

        $followedId = [$user->ID];
        foreach ($following as $follow) {
          array_push($followedId, $follow->UserID);
        }

        // filter post berdasarkan userid = [followed id dan user id] 
        $posts = $posts->filter('UserID', $followedId);
      }
    }

    $new = []; // variable untuk menampung post yang baru 
    //  cek apakah ada param is ads    
    if ($filterAds = $request->getVar('ads')) {
      // jika ada cek apakah nilainya true 
      if ($filterAds === 'true') {
        // jika iya ambil post yang tipe ads 
        // cek apakah ada filter user, 
        // jika ada jangan tampilkan ads dengan user id tersebut
        $filter = [
          'isAds' => true
        ];

        if ($user) $filter['UserID:not'] = $user->ID;

        $ads = Post::get()->filter($filter);

        // lalu masukkan ads di tiap-tiap post 
        $count = 2;
        $index = 0;
        foreach ($posts as $i => $post) {
          // cek jika post sama dengan $count
          if ($i == $count) {
            // cek apakah ada ads dengan index = $index
            if (isset($ads[$index])) {
              // jika ada, tambahkan ke dalam post 
              array_push($new, $ads[$index]);
              $count += 2; // lalu tambahkan dua agar kalipatan 2
              $index++; // agar nilai index pada ads terus bertambah
            };
          }
          // jika tidak sama, push seperti biasa
          array_push($new, $post);
        }
      }
    }

    $resource = [];
    foreach ($new as $i => $post) {
      array_push($resource, [
        'id' => $post->ID,
        'isAds' => $post->isAds,
        'created' => $post->Created,
        'caption' => $post->Caption,
        'isAds' => $post->isAds,
        'categories' => [],
        'images' => [],
        'author' => [
          'id' => $post->User()->ID,
          'avatar_url' => $post->User()->avatar_url(),
          'username' => $post->User()->Username,
          'isBusinessAccount' => $post->User()->isBusinessAccount,
        ]
      ]);

      foreach ($post->Categories() as $category) {
        array_push($resource[$i]['categories'], [
          'id' => $category->ID,
          'name' => $category->Name
        ]);
      }

      foreach ($post->Images() as $image) {
        array_push($resource[$i]['images'], [
          'id' => $image->ID,
          'caption' => $image->Caption,
          'link' => $image->Fill(614, 614)->AbsoluteLink(),
        ]);
      }
    }

    return $this->getResponse()->setBody(json_encode([
      'success' => true,
      'message' => 'success get all posts',
      'posts' => $resource
    ]));
  }

  public function getPostById($id)
  {
    var_dump($id);
    die();
  }
}
