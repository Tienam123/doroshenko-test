<?php

function getFiles($db, $page, $limit, $sortField, $sortOrder)
{
    $offset = ($page - 1) * $limit;
    $totalQuery = $db->query("SELECT COUNT(*) FROM `files`");
    $total = $totalQuery->fetchColumn();

    $totalPages = ceil($total / $limit);

    $query = $db->prepare("SELECT * FROM `files` ORDER BY $sortField $sortOrder LIMIT :offset, :limit");
    $query->bindValue(":offset", (int)$offset, PDO::PARAM_INT);
    $query->bindValue(":limit", (int)$limit, PDO::PARAM_INT);
    $query->execute();
    $data = $query->fetchAll(PDO::FETCH_ASSOC);


    $responce = [
        'current_page' => $page,
        'total_page' => $totalPages,
        'files' => $data,
    ];

    return $responce;
}

function uploadSingleFile($db, $file, $id)
{
    $fileArrNameExt = explode('.', $file['name']);
    $uploadDir = __DIR__ . '/files/';
    $fileName = $fileArrNameExt[0] . uniqid() . '.' . $fileArrNameExt[1];
    $uploadedFile = $uploadDir . $fileName;
    if (move_uploaded_file($file['tmp_name'], $uploadedFile)) {
        $stmt = $db->prepare("UPDATE files SET name = :file_path, updated_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => (int)$id, 'file_path' => $fileName]);

        return ['file' => $fileName, 'id' => $id];

    } else {
        throw new Exception("Failed to upload file.", 400);
    }
}

/**
 * @throws Exception
 */
function uploadManyFiles($db, $files)
{
    $newArr = [];
    foreach ($files as $key => $value) {
        $key = explode('_', $key);
        $id = $key[1];

        $newArr[] = uploadSingleFile($db, $value, $id);
    }
    return $newArr;
}

function deleteMany($db, $files)
{
    $message = '';
    $dirname = __DIR__ . '/files/';
    foreach ($files as $key => $value) {
        $key = explode('_', $key);
        if (file_exists($dirname . $value)) {
            if (unlink($dirname . $value)) {
                $message = "Файл '$value' был успешно удален";
                $stmt = $db->prepare("DELETE FROM `files` WHERE id = :id");
                $stmt->execute(['id' => (int)$key[1]]);
            } else {
                $message = "Не удалось удалить файл '$value'";
            }
        } else {
            $message = "Файл '$value' не найден.";
        }
    }
    return $message;
}


function downloadAllFromServer($db, $elements)
{
    $uploadDir = __DIR__ . '/files/';
    $zipFileName = 'files.zip';
    $placeholders = rtrim(str_repeat('?,', count($elements)), ',');
    $sql = "SELECT * FROM files WHERE id IN ($placeholders)";
    $stmt = $db->prepare($sql);
    $stmt->execute($elements);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $zip = new ZipArchive();
    if ($zip->open($uploadDir . $zipFileName, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== TRUE) {
        return false; // Ошибка открытия архива
    }


    foreach ($result as $key => $value) {
        $filePath = $uploadDir . $value['name'];

        if (file_exists($filePath)) {
            $zip->addFile($filePath, $value['name']);
        }
    }
    $zip->close();

    return 'http://localhost/files/' . $zipFileName;
}

function renameAll($db, $elements)
{
    $uploadDir = __DIR__ . '/files/';
    $message = '';
    foreach ($elements as $key => $value) {
        $key = explode('_', $key);
        $sql = "SELECT * FROM files WHERE id = :id";
        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $key[1]]);
        $file = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($file) {
            if (file_exists($uploadDir . $file['name'])) {
                if (rename($uploadDir . $file['name'], $uploadDir . $value)) {
                    $smt = $db->prepare("UPDATE `files` SET name = :name WHERE id = :id");
                    $smt->execute(['name' => $value, 'id' => $key[1]]);
                } else{
                    throw new Exception('Переименование не удалось');
                }
            } else {
                throw new Exception('Такой файл не существует');
            }
        }
    }

    return $message;
}