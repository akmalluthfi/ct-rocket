<?php

use SilverStripe\ORM\DataObject;

class Token extends DataObject
{
    private static $db = [
        'Token' => 'Varchar',
    ];

    private static $has_one = [
        'User' => User::class
    ];
}
