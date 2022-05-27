<?php

namespace {

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

                $currUser = Security::getCurrentUser();

                // jika ada user, tampilkan halaman khusus 
                if ($user->exists()) {
                    // cek apakah user sedang aktif 
                    if ($currUser->Username === $user->first()->Username) {
                        // user sudah login, 
                        // user active 
                        echo $this->customise([
                            'active' => 'user',
                            'Title' => '(' . $user->first()->Username . ') - Rocket',
                            'User' => $user->first(),
                            'Followers' => $user->first()->getFollowers(),
                            'Following' => $user->first()->UserFollowed()->Count(),
                            'hasFollow' => $currUser->hasFollow($user->first()->ID) ? 'true' : 'false'
                        ])->renderWith(['User', 'Page']);

                        exit;
                    } else {
                        //  Tambahkan Visitor id 
                        $visitor = Visitor::create();
                        $visitor->UserID = $user->first()->ID;
                        $visitor->VisitorID = $currUser->ID;
                        $visitor->VisitedAt = date('Y-m-d');

                        $visitor->write();

                        // user nonactive
                        echo $this->customise([
                            'active' => 'user',
                            'Title' => '(' . $user->first()->Username . ') - Rocket',
                            'User' => $user->first(),
                            'Followers' => $user->first()->getFollowers(),
                            'Following' => $user->first()->UserFollowed()->Count(),
                            'hasFollow' => $currUser->hasFollow($user->first()->ID) ? 'true' : 'false',
                            'isBlocked' => ($user->first()->isBlocked($currUser->ID)) ? 'true' : 'false',
                        ])->renderWith(['User', 'Page']);
                        exit;
                    }
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
