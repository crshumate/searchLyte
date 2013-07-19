<?php
if($_GET['s']){
   $searchParam = $_GET['s'];
    $arr=array(0=>array(
       'text'=>'apple',
        'url'=>'http://apple.com'),
        1=>array(
            'text'=>'tacoma',
            'url'=>'http://www.cityoftacoma.org')
    );
    echo json_encode($arr);
}


?>