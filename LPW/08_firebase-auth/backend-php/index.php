<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Tuupola\Middleware\CorsMiddleware;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

// CORS middleware configuration
$cors = new CorsMiddleware([
  "origin" => ["*"],
  "methods" => ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  "headers.allow" => ["Authorization", "Content-Type", "Accept"],
  "headers.expose" => [],
  "credentials" => true,
  "cache" => 0,
]);

$app->add($cors);

// Middleware for Firebase authentication
$firebaseMiddleware = function (Request $request, $handler) {
    $headers = $request->getHeaders();

    if (!isset($headers['Authorization'])) {
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(['error' => 'Unauthorized']));
        return $response->withStatus(401);
    }

    $authHeader = $headers['Authorization'][0];
    list($jwt) = sscanf($authHeader, 'Bearer %s');
    // $jwt = $au

    if ($jwt) {
      try {
        $tokenVerifier = new AccessToken();
        $decodedToken = $tokenVerifier->verify($jwt);
        $request = $request->withAttribute('userId', $decodedToken['sub']);
      } catch (Exception $e) {
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(['error' => 'Unauthorized']));
        return $response->withStatus(401);
      }
    }

    return $handler->handle($request);
};

// Root route
$app->get('/', function (Request $request, Response $response, $args) {
  $response->getBody()->write(json_encode(['message' => 'Hello world']));
  return $response->withHeader('Content-Type', 'application/json');
});

// Secret route
$app->get('/secret', function (Request $request, Response $response, $args) {
  $response->getBody()->write(json_encode(['message' => 'Message super secret']));
  return $response->withHeader('Content-Type', 'application/json');
})->add($firebaseMiddleware);

$app->run();

