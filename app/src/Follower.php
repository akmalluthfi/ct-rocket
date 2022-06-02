<?php

use SilverStripe\ORM\DataObject;

class Follower extends DataObject
{
  // user id followed by followedID
  private static $db = [
    'FollowedID' => 'Int',
    'FollowedAt' => 'Date'
  ];

  private static $has_one = [
    'User' => User::class
  ];
}
