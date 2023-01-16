<?php
// Point d'entrée de l'application

// Définir les constantes pour les chemins des fichiers JSON
$jsonFolder = 'json-datas'
define('DATA_FILE', '');

// Lire les données JSON dans un tableau
$data = json_decode(file_get_contents(DATA_FILE), true);

// Obtenir la méthode HTTP de la requête
$method = $_SERVER['REQUEST_METHOD'];

// Gérer les différentes méthodes HTTP
switch ($method) {
    case 'GET':
        handleGet($data);
        break;
    case 'POST':
        handlePost($data);
        break;
    case 'PUT':
        handlePut($data);
        break;
    case 'DELETE':
        handleDelete($data);
        break;
    default:
        // Retourner une erreur 405 si la méthode n'est pas supportée
        http_response_code(405);
        echo json_encode(array('message' => 'Méthode non supportée'));
        break;
}

// Fonctions pour gérer les différentes méthodes HTTP
function handleGet($data) {
    // Récupérer les données demandées
    $id = $_GET['id'];
    if (isset($data[$id])) {
        // Retourner les données demandées
        http_response_code(200);
        echo json_encode($data[$id]);
    } else {
        // Retourner une erreur 404 si les données demandées n'existent pas
        http_response_code(404);
        echo json_encode(array('message' => 'Données non trouvées'));
    }
}
function handlePost($data) {
    // Ajouter les nouvelles données
    $newData = json_decode(file_get_contents('php://input'), true);
    $data[] = $newData;
    file_put_contents(DATA_FILE, json_encode($data));
    // Retourner une réponse 201 Created
    http_response_code(201);
    echo json_encode(array('message' => 'Données créées'));
}
function handlePut($data) {
    // Modifier les données existantes
    $id = $_GET['id'];
    $updatedData = json_decode(file_get_contents('php://input'), true);
    if (isset($data[$id])) {
        $data[$id] = $updatedData;
        file_put_contents(DATA_FILE, json_encode($data));
        // Retourner une réponse 204 No Content
        http_response_code(204);
    } else {
        // Retourner une erreur 404 si les données demandé es n'existent pas
        http_response_code(404);
        echo json_encode(array('message' => 'Données non trouvées'));
    }
}
function handleDelete($data) {
    // Supprimer les données existantes
    $id = $_GET['id'];
    if (isset($data[$id])) {
        unset($data[$id]);
        file_put_contents(DATA_FILE, json_encode($data));
        // Retourner une réponse 204 No Content
        http_response_code(204);
    } else {
        // Retourner une erreur 404 si les données demandées n'existent pas
        http_response_code(404);
        echo json_encode(array('message' => 'Données non trouvées'));
    }
}
