<?php

use SilverStripe\CMS\Model\RedirectorPageController;
use SilverStripe\Security\Security;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\Middleware\HTTPMiddleware;
use SilverStripe\Control\Middleware\RequestHandlerMiddlewareAdapter;
use SilverStripe\Control\RequestHandler;

class AuthMiddleware implements HTTPMiddleware
{
    public function process(HTTPRequest $request, callable $delegate)
    {
        // if (!Security::getCurrentUser()) {
        //     return RequestHandler::create()->redirect('akmalluthfi');
        // }

        // $response = $delegate($request);
        // return $response;

        // RequestHandler::create()->redirect('akmalluthfi');
        var_dump('yay');
        die();
    }
}
