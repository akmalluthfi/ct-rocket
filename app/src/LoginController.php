<?php

use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Security\IdentityStore;
use SilverStripe\Security\MemberAuthenticator\MemberAuthenticator;

class LoginController extends Controller
{
    private static $allowed_actions = [
        'index',
        'authenticate',
    ];

    private static $url_handlers = [
        'GET /' => 'index',
        'POST /' => 'authenticate',
    ];

    public function init()
    {
        parent::init();
        if (Security::getCurrentUser()) return $this->redirectBack();
        // if (\SilverStripe\Security\Security::getCurrentUser()) return $this->redirectBack();
    }

    public function authenticate(HTTPRequest $request)
    {
        // cek apakah request dikirim dari ajax
        if (!$request->isAjax()) return $this->httpError(400);

        // cek apakah ada data dikirim dari body 
        $credentials = (empty($request->postVars())) ? json_decode($request->getBody(), true) : $request->postVars();

        // cek apakah field username/email ada yang sama
        $user = User::get()->filterAny([
            'Username' => $credentials['username'],
            'Email' => $credentials['username']
        ])->first();

        if (is_null($user)) {
            $this->getResponse()->setBody(json_encode([
                'status' => 400,
                'message' => "The provided details don't seem to be correct. Please try again."
            ]));

            $this->getResponse()->addHeader('content-type', 'application/json');
            return $this->getResponse();
        }

        $auth = new MemberAuthenticator;
        $result = $auth->checkPassword($user, $credentials['password']);

        // cek apakah username dan password sama 
        if ($result->isValid()) {
            // generate token 
            $token = Token::create();
            $token->Token = strtr(base64_encode(random_bytes(64)), '+/', '-_');
            $token->UserID = $user->ID;
            $token->write();

            $identityStore = Injector::inst()->get(IdentityStore::class);
            $identityStore->logIn($user);

            $this->getResponse()->setBody(json_encode([
                'status' => 200,
                'message' => 'Login Success'
            ]));
        } else {
            $this->getResponse()->setBody(json_encode([
                'status' => 400,
                'message' => $result->getMessages()[0]['message']
            ]));
        }

        $this->getResponse()->addHeader('content-type', 'application/json');
        return $this->getResponse();
    }

    public function Link($action = null)
    {
        // Construct link with graceful handling of GET parameters
        $link = Controller::join_links('login', $action);

        // Allow Versioned and other extension to update $link by reference.
        $this->extend('updateLink', $link, $action);

        return $link;
    }
}
