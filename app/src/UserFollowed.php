<?php

use SilverStripe\ORM\DataObject;

class UserFollowed extends DataObject
{
    private static $db = [
        'UserID' => 'Int',
        'FollowedID' => 'Int'
    ];

    private static $has_one = [
        'User' => User::class
    ];
}
