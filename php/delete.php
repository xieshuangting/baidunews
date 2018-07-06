<?php
header("Content-type:application/json;chatset=utf-8");
$conn = mysqli_connect("localhost","root","","baidunews");
if($conn){
	$newsid = $_POST['newsid'];
	mysqli_query($conn,"set names utf8");
	$sql = "DELETE FROM `news` WHERE `id` = '{$newsid}'";
	mysqli_query($conn,$sql);
	echo json_encode(array('删除状态' => '成功'));
}else{
	echo json_encode(array('删除状态' => '失败'));
}

mysqli_close($conn);
