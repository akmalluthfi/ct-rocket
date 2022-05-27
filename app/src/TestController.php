<?php

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;

class TestController extends Controller
{
  /*
    Test handle http method (PUT, DELETE) success
    Test url like test/1/apa/22
  */
  private static $allowed_actions = [
    'getSingle',
    'getAll',
    'edit',
    'add',
    'delete',
    'getCobaUserById'
  ];

  private static $url_handlers = [
    'GET /' => 'getAll',
    'GET /$id!/coba' => 'getCobaUserById',
    'GET /$id!/' => 'getSingle',
    'PUT /$id!/' => 'edit',
    'POST /' => 'add',
    'DELETE /$id!/' => 'delete',
    'PUT /$id!/coba' => 'ubahCobaUserById'
  ];

  public function index(HTTPRequest $request)
  {
    var_dump('ini index');
    die();
  }

  public function getCobaUserById(HTTPRequest $request)
  {
    var_dump('get isi coba user dengan id ' . $request->param('id'));
    var_dump($request->isGET());
    var_dump($request);
    die();
  }

  public function edit(HTTPRequest $request)
  {
    var_dump('Edit data dengan id ' . $request->param('id'));
    var_dump($request->isPUT());
    var_dump($request);
    die();
  }

  public function delete(HTTPRequest $request)
  {
    var_dump('Delete data dengan id ' . $request->param('id'));
    var_dump($request->isDELETE());
    var_dump($request);
    die();
  }

  public function getSingle(HTTPRequest $request)
  {
    var_dump('Get data dengan id ' . $request->param('id'));
    var_dump($request->isGET());
    var_dump($request);
    die();
  }

  public function getAll(HTTPRequest $request)
  {
    var_dump('Get semua data' . $request->param('id'));
    var_dump($request->isGET());
    var_dump($request);
    die();
  }

  public function add(HTTPRequest $request)
  {
    var_dump('ADD data' . $request->param('id'));
    var_dump($request->isPUT());
    var_dump($request);
    die();
  }
}
