<?php

namespace {

    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\Forms\TextField;
    use SilverStripe\Security\Security;

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

        public function getAccTk()
        {
            $hasLogin = Token::get()->filter('UserID', Security::getCurrentUser()->ID)->first();
            // $hasLogin = Token::get()->filter('UserID', 23)->first();

            if (is_null($hasLogin)) return;

            return $hasLogin->Token;
        }
    }
}
