<?php
header("Content-type:application/json;charset=utf-8");
$conn = mysqli_connect("localhost","root","","baidunews");

if($conn){
	$newstitle = $_POST['newstitle'];
	$newsimg = $_POST['newsimg'];
	$newstype = $_POST['newstype'];
	$newssrc = $_POST['newssrc'];
	$newstime = $_POST['newstime'];

	$sql = "INSERT INTO `news`( `newstype`, `newsimg`, `newstitle`, `newstime`, `newssrc`) VALUES ('{$newstype}','{$newsimg}','{$newstitle}','{$newstime}','{$newssrc}')";
	mysqli_query($conn,"set names utf8");
	$result = mysqli_query($conn,$sql);
	echo json_encode(array('success'=>'ok'));
}

mysqli_close($conn);
