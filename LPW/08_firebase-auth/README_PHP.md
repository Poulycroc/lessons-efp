# Backend php 

> **Note:** pour plus ce simpliciter on va utiliser un petit framework php appelé [Slim PHP](https://www.slimframework.com/) ça va nous permettre d'avoir un routing assez simple et facile a mettre en place

## Étape 1: Installation de Composer et des dépendances

1. Installez Composer si vous ne l'avez pas déjà fait : [https://getcomposer.org/doc/00-intro.md](https://getcomposer.org/doc/00-intro.md)
2. Ouvrez un terminal et naviguez vers le répertoire de votre projet.
3. Exécutez les commandes suivantes pour installer les dépendances nécessaires :
```bash
composer require slim/slim
composer require slim/psr7
composer require tuupola/cors-middleware
composer require google/auth
composer require google/apiclient
```


## Étape 2: Création du fichier `index.php`

1. Créez un fichier `index.php` dans le répertoire de votre projet.
2. On commence par la configuration des différent package dont on aura besoin pour notre projet
```php
<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Tuupola\Middleware\CorsMiddleware;
```
3. on ajoute l'autoload depuis notre `vendor` et on démarre l'application
```php

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
```
4. pour prévenir les problème de `CORS` on configure les différentes options
```php
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
```
5. Pour garantir la protection de notre route on crée un middleware qui se mettra entre la route appelé et l'exécution de celle-ci
```php
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
```
5. On défini nos différente route dans ce cas si j'ai 2 routes "/" et "/secret", j'ajoute le middleware `$firebaseMiddleware` sur les routes qui auront besoin d'être protégée
```php
// Root route
$app->get('/', function (Request $request, Response $response, $args) {
  // contenu de notre réponse
  $response->getBody()->write(json_encode(['message' => 'Hello world']));
  // on garantis que la réponse contiendra un header Content-Type de type json
  // c'est toujours mieux
  return $response->withHeader('Content-Type', 'application/json');
});

// Secret route
$app->get('/secret', function (Request $request, Response $response, $args) {
  $response->getBody()->write(json_encode(['message' => 'Message super secret']));
  return $response->withHeader('Content-Type', 'application/json');
})->add(y);

// on démarre le serveur pour notre application
$app->run($firebaseMiddleware);
```

## Étape 3: Configuration de l'authentification Firebase
> Si ce nest pas déjà fait

1. Allez sur la console Firebase : [https://console.firebase.google.com/](https://console.firebase.google.com/)
Sélectionnez votre projet.
1. Cliquez sur l'icône en forme d'engrenage et choisissez "Paramètres du projet".
1. Accédez à l'onglet "Comptes de service".
1. Cliquez sur "Générer une nouvelle clé privée" et téléchargez le fichier JSON.
1. Placez le fichier JSON téléchargé dans le répertoire de votre projet (par exemple, dans un sous-répertoire config).

## Étape 4: Configuration du serveur de développement

1. Ouvrez un terminal et naviguez vers le répertoire de votre projet.
1. démarrer le server avec MAMP/WAMP/XAMP ou votre php natif
```bash
php -S localhost:9898 
```
> **Note:** vous pouvez aussi `composer require php -S` dans votre projet pour plus de facilité

Cela démarre un serveur local sur le port 9898. Vous pouvez remplacer "9898" par le numéro de port de votre choix.

## Étape 5: Test de l'API

1. Installez Postman si vous ne l'avez pas déjà fait : https://www.postman.com/downloads/
1. Ouvrez Postman et créez une nouvelle requête GET avec l'URL http://localhost:9898/. Vous devriez recevoir une réponse avec le message "Hello world".
1. Créez une nouvelle requête GET avec l'URL http://localhost:9898/secret et ajoutez un en-tête "Authorization" avec la valeur "Bearer VOTRE_JWT_ICI". Remplacez "VOTRE_JWT_ICI" par un jeton d'accès valide provenant de votre application front-end React. Vous devriez recevoir une réponse avec le message "Message super secret".

```js
console.log({ currentUser })
```

<img src=".screenshots/Screenshot 2023-03-25 at 13.39.19.png" alt="currentUser log" />

dans post man je peux donc tester mes 2 routes disponible '/' et 'secret/'

pour la route `/`:<br>
<img src=".screenshots/Screenshot 2023-03-25 at 13.36.38.png" alt="postman hello word" /><br>

pour la route `secret/`: (sans mon accessToken)<br>
<img src=".screenshots/Screenshot 2023-03-25 at 13.36.54.png" alt="postman sans accesstoken" /><br>

pour la route `secret/`: (avec accessToken)<br>
<img src=".screenshots/Screenshot 2023-03-25 at 13.39.02.png" alt="postman avec accesstoken" /><br>