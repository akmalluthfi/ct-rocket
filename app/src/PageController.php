<?php

namespace {

    use SilverStripe\Core\ClassInfo;
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\Security\Security;

    class PageController extends ContentController
    {
        /**
         * An array of actions that can be accessed via a request. Each array element should be an action name, and the
         * permissions or conditions required to allow the user to access it.
         *
         * <code>
         * [
         *     'action', // anyone can access this action
         *     'action' => true, // same as above
         *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
         *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
         * ];
         * </code>
         *
         * @var array
         */
        private static $allowed_actions = [];

        protected function init()
        {
            parent::init();

            if ($this->curr()->ClassName === 'SilverStripe\ErrorPage\ErrorPage') {
                // cek apakah ada user dengan nama tersebut
                $user = User::get()->filter([
                    'Username' => $this->parseURL()
                ]);

                // jika ada user, tampilkan halaman khusus 
                if ($user->exists()) {
                    echo $this->customise([
                        'active' => 'user',
                        'Title' => '(' . $user->first()->Username . ') - Rocket',
                        'User' => $user->first()
                    ])->renderWith(['User', 'Page']);
                    exit;
                }
            }
        }

        private function parseURL()
        {
            $requestURI = rtrim($_SERVER['REQUEST_URI'], '/');
            $requestURI = explode('/', $requestURI);
            return $requestURI[count($requestURI) - 1];
        }
    }
}
