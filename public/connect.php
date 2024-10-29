<?php
require_once './constants.php';
$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT;
try {
    // Создание подключения
    $pdo = new PDO($dsn, DB_USER, DB_PASS);
} catch (\PDOException $e) {
    $data = json_encode([
        'status' => false,
        'error' => $e->getMessage(),
        'code' => $e->getCode()
    ]);
    echo $data;
}