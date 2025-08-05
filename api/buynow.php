<?php
    require_once('./db.php');

    try {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $object = new stdClass();
            $amount = 0;
            $product = $_POST['product'];

            $stmt = $object->prepare('select id,price from sp_product order by desc')
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
                        if($product[$i]['id'] == $queryproduct[$k]['id']) {
                            $amount += $product[$i]['count']*$queryproduct[$k]['price']
                         }
                    }
                }
            }
             
        } else {
            http_response_code(405);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo $e->getMessage();
    }
?>