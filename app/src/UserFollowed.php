<?php

use SilverStripe\ORM\DataObject;

class UserFollowed extends DataObject
{
    private static $db = [
        'UserID' => 'Int', // user 
        'FollowedID' => 'Int',  // id user yang diikuti
        'FollowedAt' => 'Date' // diikuti pada 
    ];

    private static $has_one = [
        'User' => User::class
    ];
}
