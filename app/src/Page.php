<?php

namespace {

    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\Forms\TextField;

    class Page extends SiteTree
    {
        private static $db = [
            'Icon' => 'Varchar'
        ];

        private static $has_one = [];

        public function getCMSFields()
        {
            $fields = parent::getCMSFields();
            $fields->addFieldToTab('Root.Main', TextField::create('Icon'), 'Content');

            return $fields;
        }
    }
}
