<?php

use SilverStripe\Assets\Image;

class CustomImage extends Image
{
    private static $db = [
        'Caption' => 'Varchar'
    ];

    private static $has_one = [
        'Post' => Post::class
    ];
}
