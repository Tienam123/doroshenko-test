<?php
header('Content-type: application/json');

require_once '../vendor/autoload.php';
require './connect.php';
require_once './helpers.php';

$options = explode('?', $_SERVER['REQUEST_URI']);
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        if ($options[0] === '/api/files') {
            $page = isset($_GET['page']) && $_GET['page'] > 0 ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) && $_GET['limit'] > 0 ? (int)$_GET['limit'] : 12;
            $sortField = isset($_GET['sortField']) ? $_GET['sortField'] : 'name';
            $sortOrder = isset($_GET['sortOrder']) ? $_GET['sortOrder'] : 'asc';

            echo json_encode([
                'url' => $options[0],
                'status' => true,
                'code' => 200,
                'data' => getFiles($pdo, $page, $limit, $sortField, $sortOrder)
            ]);
        }
        break;
    case 'POST':
        if ($options[0] === '/api/file/') {
            $id = isset($_POST['id']) ? (int)$_POST['id'] : null;
            $file = $_FILES['file'] ?? null;
            try {
                $data = uploadSingleFile($pdo, $file, $id);
                echo json_encode([
                    'url' => $options[0],
                    'status' => true,
                    'id' => $id,
                    'code' => 200,
                    'data' => $data
                ]);
            } catch (Exception $exception) {
                echo json_encode([
                    'status' => false,
                    'code' => $exception->getCode(),
                    'message' => $exception->getMessage()
                ]);
            }


        }
        if ($options[0] === '/api/files/') {
            $data = uploadManyFiles($pdo, $_FILES);
            try {
                echo json_encode([
                    'route' => $options[0],
                    'status' => true,
                    'file' => $data,
                    'code' => 200
                ]);
            } catch (Exception $exception) {
            }
        }
        if ($options[0] === '/api/files/delete-many') {
            $data = deleteMany($pdo, $_POST);
            echo json_encode([
                'route' => $options[0],
                'status' => true,
                'code' => 200,
                'message' => $data
            ]);
        }
        if ($options[0] === '/api/files/download-many') {
            $data = downloadAllFromServer($pdo, $_POST['elements']);
            echo json_encode([
                'message' => $data,
                'route' => $options[0],
                'status' => true,
                'code' => 200,
            ]);
        }
        if ($options[0] === '/api/files/edit-all') {
           $data=  renameAll($pdo,$_POST);
            echo json_encode([
                'message' => $data,
                'route' => $options[0],
                'status' => true,
                'code' => 200,
            ]);
        }
        break;
}
