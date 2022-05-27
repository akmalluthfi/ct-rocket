<?php

use phpDocumentor\Reflection\Types\This;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\View\ArrayData;

class Post extends DataObject
{
    private static $db = [
        'Caption' => 'Varchar',
        'isAds' => 'Boolean'
    ];

    private static $defaults = [
        'isAds' => false,
    ];

    private static $many_many = [
        'Categories' => Category::class
    ];

    private static $has_many = [
        'Images' => CustomImage::class
    ];

    private static $has_one = [
        'User' => User::class
    ];

    public function imagesList()
    {
        $imagesList = new ArrayList();
        foreach ($this->Images() as $image) {
            $imagesObject = new DataObject();
            $imagesObject->Link = $image->Link();
            $imagesObject->Caption = $image->Caption;
            $imagesList->push($imagesObject);
        }

        return $imagesList;
    }

    public function isImageCaptionNull()
    {
        $count = 0;
        foreach ($this->Images() as $image) {
            if (is_null($image->Caption)) {
                $count++;
            }
        }

        if ($count === $this->Images()->Count()) return true;

        return false;
    }

    public function author()
    {
        return new ArrayData([
            'username' => $this->User()->Username,
            'pictureLink' => $this->User()->Picture()->Link(),
        ]);
    }
}
