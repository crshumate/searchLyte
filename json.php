<?php
if($_GET['s']){
   $searchParam = $_GET['s'];
    $arr=array(0=>array(
        'searchParam'=>$searchParam,
        'text'=>'apple',
        'url'=>'http://apple.com'),
        1=>array(
            'searchParam'=>$searchParam,
            'text'=>'tacoma',
            'url'=>'http://tacoma.com')
    );
    echo json_encode($arr);
}


?>