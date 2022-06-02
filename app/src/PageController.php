<?php

namespace {

    use SilverStripe\View\ArrayData;
    use SilverStripe\Security\Security;
    use SilverStripe\CMS\Controllers\ContentController;

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
                $users = User::get()->filter([
                    'Username' => $this->parseURL()
                ]);

                // jika ada user, tampilkan halaman khusus 
                if ($users->exists()) {
                    $user = $users->first();
                    $currUser = Security::getCurrentUser();
                    // cek apakah user sedang aktif 
                    if ($currUser->Username === $user->Username) {
                        // user sudah login, 
                        // user active 
                        echo $this->customise(new ArrayData([
                            'Title' => "($user->Username) - Rocket",
                            'active' => 'true',
                            'username' => $user->Username
                        ]))->renderWith(['User', 'Page']);

                        exit;
                    } else {
                        //  Tambahkan Visitor id 
                        $this->addVisitor($user->ID, $currUser->ID);

                        // user tersedia, dan tidak aktif
                        echo $this->customise(new ArrayData([
                            'Title' => "($user->Username) - Rocket",
                            'active' => 'false',
                            'username' => $user->Username,
                        ]))->renderWith(['User', 'Page']);

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

        private function addVisitor($user_id, $visitor_id)
        {
            $visitor = Visitor::create();
            $visitor->UserID = $user_id;
            $visitor->VisitorID = $visitor_id;
            $visitor->VisitedAt = date('Y-m-d');

            $visitor->write();
        }
    }
}
