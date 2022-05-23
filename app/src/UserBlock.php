<?php

use SilverStripe\ORM\DataObject;

class UserBlock extends DataObject
{
    // user id diblokir oleh blocked id
    private static $db = [
        'UserID' => 'Int', // id user yang diblock
        'BlockedID' => 'Int' // id user yang memblock
    ];

    private static $has_one = [
        'User' => User::class
    ];
}
