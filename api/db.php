<?php
    $db_host = 'localhost';
    $db_name = 'shopping';
    $db_user = 'root';
    $db_pass = '';

    header('Content-Type: application/json');

    try {
        $db = new PDO("mysql:host=$db_host;dbname=$db_name" , $db_user , $db_pass);
        $db->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
        echo json_encode(["message" => "Database is connected"]);
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
?>