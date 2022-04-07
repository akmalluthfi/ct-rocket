<?php

use SilverStripe\ORM\ValidationException;
use SilverStripe\Security\Security;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;

class RegisterController extends Controller
{
    private static $allowed_actions = [
        'index',
        'store',
    ];

    private static $url_handlers = [
        'GET /' => 'index',
        'POST /' => 'store',
    ];

    public function init()
    {
        parent::init();
        if (Security::getCurrentUser()) return $this->redirectBack();
    }

    public function store(HTTPRequest $request)
    {
        // cek apakah request dikirim dari ajax
        if (!$request->isAjax()) return $this->httpError(400);

        $credentials = $request->postVars();

        $user = User::get()->filterAny([
            'Username' => $credentials['username'],
            'Email' => $credentials['email']
        ])->first();

        // cek apakah ada username tersebut
        if (!is_null($user)) {
            $this->getResponse()->setBody(json_encode([
                'status' => 400,
                'message' => 'Registration failed'
            ]));

            $this->getResponse()->addHeader('content-type', 'application/json');
            return $this->getResponse();
        }

        // tambahkan data ke database 
        $newUser = User::create();
        $newUser->Username = $credentials['username'];
        $newUser->Email = $credentials['email'];
        $newUser->Password = $credentials['password'];
        $newUser->PictureID = 3;

        try {
            $newUser->write();
        } catch (ValidationException $e) {
            $this->getResponse()->setBody(json_encode([
                'status' => 400,
                'message' => $e->getMessage()
            ]));
            $this->getResponse()->addHeader('content-type', 'application/json');
            return $this->getResponse();
        }

        $this->getResponse()->setBody(json_encode([
            'status' => 200,
            'message' => 'Registration successful!'
        ]));
        $this->getResponse()->addHeader('content-type', 'application/json');
        return $this->getResponse();
    }

    public function Link($action = null)
    {
        // Construct link with graceful handling of GET parameters
        $link = Controller::join_links('register', $action);

        // Allow Versioned and other extension to update $link by reference.
        $this->extend('updateLink', $link, $action);

        return $link;
    }
}
