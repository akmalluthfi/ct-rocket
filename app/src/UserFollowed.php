<?php

use SilverStripe\ORM\DataObject;

class UserFollowed extends DataObject
{
    private static $db = [
        'FollowedID' => 'Int',  // id user yang mengikuti
        'FollowedAt' => 'Date' // diikuti pada 
    ];

    private static $has_one = [
        'User' => User::class
    ];
}
