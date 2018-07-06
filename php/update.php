<?php
header("Content-type:application/json;chatset=utf-8");
$conn = mysqli_connect("localhost","root","","baidunews");
if($conn){
	$newstitle = $_POST['newstitle'];
	$newssrc = $_POST['newssrc'];
	$newsimg = $_POST['newsimg'];
	$newstime = $_POST['newstime'];
	$newstype = $_POST['newstype'];
	$newsid = $_POST['newsid'];

	$sql = "UPDATE `news` SET `newstype`='{$newstype}',`newsimg`='{$newsimg}',`newstitle`='{$newstitle}',`newstime`='{$newstime}',`newssrc`='{$newssrc}' WHERE `id`='{$newsid}'";
	mysqli_query($conn,"set names utf8");
	$result = mysqli_query($conn,$sql);
	
	echo json_encode(array('修改状态' => '成功'));
}

mysqli_close($conn);