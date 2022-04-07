<?php

use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;
use SilverStripe\Security\Security;

class User extends Member
{
    private static $db = [
        'Username' => 'Varchar',
        'Email' => 'Varchar',
        'Password' => 'Varchar',
        'Bio' => 'Varchar',
    ];

    private static $has_many = [
        'Posts' => Post::class,
        'UserFollowed' => UserFollowed::class
    ];

    private static $has_one = [
        'Picture' => Image::class
    ];

    private static $owns = [
        'Picture'
    ];

    public function hasFollow($userID)
    {
        $hasfollowed = UserFollowed::get()->filter([
            'UserID' => $this->ID,
            'FollowedID' => $userID
        ]);

        if (count($hasfollowed) === 0) return false;
        return true;
    }

    public function getFollowers()
    {
        $followers = UserFollowed::get()->filter([
            'FollowedID' => $this->ID
        ]);
        return count($followers);
    }
}
