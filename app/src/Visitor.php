<?php

use SilverStripe\ORM\DataObject;

class Visitor extends DataObject
{
  private static $db = [
    'VisitorID' => 'Int',
    'VisitedAt' => 'Date'
  ];

  // default nilai diisi pada saat aplikasi pertama kali dibuat 
  private static $defaults = [
    'VisitedAt' => '2022-04-07',
  ];

  private static $has_one = [
    'User' => User::class
  ];
}
