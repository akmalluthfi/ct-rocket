<?php

use SilverStripe\ORM\DataObject;

class Category extends DataObject
{
    private static $db = [
        'Title' => 'Varchar'
    ];

    private static $belongs_many_many = [
        'Posts' => Post::class
    ];

    public function Link()
    {
        return 'explore/tags/' . substr($this->Title, 1);
    }
}
