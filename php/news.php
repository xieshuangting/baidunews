<?php
header("Content-type:application/json;chatset=utf-8");

// $arr = array(
// 	'newsimg' => 'img/2.jpg', 
// 	'newstitle' => '标题占位符', 
// 	'newstime' =>'时间占位符',
// 	'newssrc' => '来源占位符',
// 	'newstype' => '类型');
// echo json_encode($arr);

$conn = mysqli_connect("localhost","root","","baidunews");
if(!$conn){
	echo json_encode(array('连接信息' =>'连接失败'));
}else{
	echo json_encode(array('连接信息' =>'连接成功'));
}

mysqli_close($conn);


?>