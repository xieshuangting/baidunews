<?php
header("Content-type:application/json;chatset=utf-8");
$conn = mysqli_connect("localhost","root","","baidunews");
mysqli_query($conn,"set names 'utf8'");
if(!$conn){
	echo json_encode(array('连接信息' =>'连接失败'));
}else{
	if($_GET['newstype'] != null){
		$newstype = $_GET['newstype'];
		$sql = "SELECT * FROM `news` WHERE `newstype`= '{$newstype}'";
		$result = mysqli_query($conn,$sql);
		$senddata = array();
		while($row = mysqli_fetch_assoc($result)){
			array_push($senddata,array(
						'id'=>$row['id'],
						'newsimg'=>$row['newsimg'],
						'newssrc'=>$row['newssrc'],
						'newstype'=>$row['newstype'],
						'newstime'=>$row['newstime'],
						'newstitle'=>$row['newstitle']
				));
		}
		echo json_encode($senddata);
	}else{
		$sql = "SELECT * FROM `news`";
		$result = mysqli_query($conn,$sql);
		$senddata = array();
		while($row = mysqli_fetch_assoc($result)){
			array_push($senddata,array(
						'id'=>$row['id'],
						'newsimg'=>$row['newsimg'],
						'newssrc'=>$row['newssrc'],
						'newstype'=>$row['newstype'],
						'newstime'=>$row['newstime'],
						'newstitle'=>$row['newstitle']
				));
		}
		echo json_encode($senddata);
	}
}

mysqli_close($conn);