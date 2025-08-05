<?php
    require_once('./db.php');

    try {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $object = new stdClass();
            $amount = 0;
            $product = $_POST['product'];
            $stmt = $db->prepare('select id,price from sp_product order by id desc');
            if($stmt->execute()) {
                $queryproduct = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $items = array(
                        "id" => $id,
                        "price" => $price
                    );
                    array_push($queryproduct , $items) ;
                }

                for($i=0 ; $i < count($product) ; $i++) {
                    for ($k=0; $k < count($queryproduct) ; $k++) { 
                        if(intval($product[$i]['id']) == intval($queryproduct[$k]['id'])) {
                            $amount += intval($product[$i]['count'])*intval($queryproduct[$k]['price']);
                            break;
                         }
                    }
                }
                
                $object->RespCode = 200;
                $object->Amount = $amount;
                echo json_encode($object);
                http_response_code(200);
            }
             
        } else {
            http_response_code(405);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo $e->getMessage();
    }
?>