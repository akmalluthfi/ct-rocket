<?php

use SilverStripe\Assets\Image;
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
        'UserFollowed' => UserFollowed::class,
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

    public function getFollowers()
    {
        $followers = UserFollowed::get()->filter([
            'FollowedID' => $this->ID
        ]);

        return $followers->count();
    }

    public function isBlocked($userId)
    {
        // cek apakah user ini diblock oleh $userId
        foreach ($this->UserBlock() as $blocked) {
            if ($blocked->BlockedID === $userId) return true;
        }
        return false;
    }
}
