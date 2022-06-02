<?php

use SilverStripe\Assets\Image;
use SilverStripe\Control\Director;
use SilverStripe\Forms\TextField;
use SilverStripe\Security\Member;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TabSet;

class User extends Member
{
    private static $db = [
        'Username' => 'Varchar',
        'Email' => 'Varchar',
        'isBusinessAccount' => 'Boolean',
        'Password' => 'Varchar',
        'Bio' => 'Varchar',
    ];

    private static $summary_fields = [
        'Username',
        'Email',
    ];

    private static $searchable_fields = [
        'Username', 'Email'
    ];

    private static $has_many = [
        'Posts' => Post::class,
        'Followers' => Follower::class,
        'UserBlock' => UserBlock::class,
        'Visitors' => Visitor::class
    ];

    private static $has_one = [
        'Picture' => Image::class,
        'Token' => Token::class
    ];

    private static $owns = [
        'Picture'
    ];

    public function getCMSFields()
    {
        $fields = FieldList::create(TabSet::create('Root'));

        $fields->addFieldsToTab('Root.Main', [
            TextField::create('Username'),
            TextField::create('Email'),
            CheckboxField::create('isBusinessAccount', 'Business Account'),
        ]);

        return $fields;
    }

    public function hasFollow($userID)
    {
        $hasfollowed = UserFollowed::get()->filter([
            'UserID' => $this->ID,
            'FollowedID' => $userID
        ]);

        if (count($hasfollowed) === 0) return false;
        return true;
    }

    public function isBlocked($userId)
    {
        // cek apakah user ini diblock oleh $userId
        foreach ($this->UserBlock() as $blocked) {
            if ($blocked->BlockedID === $userId) return true;
        }
        return false;
    }

    public function getFollowers()
    {
        return $this->Followers()->Count();
    }

    public function followers_url()
    {
        return Director::baseURL() . "api/users/$this->Username/followers";
    }

    public function getFollowing()
    {
        return Follower::get()->filter('FollowedID', $this->ID)->count();
    }

    public function following_url()
    {
        return Director::baseURL() . "api/users/$this->Username/following";
    }

    public function avatar_url()
    {
        return $this->Picture()->AbsoluteLink();
    }

    public function posts_url()
    {
        return Director::baseURL() . "api/users/$this->Username/posts";
    }
}
