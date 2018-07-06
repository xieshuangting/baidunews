$(function(){
	// 显示新闻列表
	refreshnews();

	// 添加新闻
	$("#btnsubmit").click(addnews);

	var tbody = $("tbody");
	// 删除新闻
	var deleteId = null;
	tbody.on('click','.btn-danger',function(e){
		$("#deleteModal").modal('show');
		deleteId = $(this).parent().prevAll().eq(5).html();
	});
	$("#deleteModal #confirmDelete").click(function(){
		if(deleteId){
			$.ajax({
				url:'php/delete.php',
				type:'post',
				data:{newsid:deleteId},
				success:function(){
					$("#deleteModal").modal('hide');
					refreshnews();
				},
				error:function(){
					alert('ajax失败');
				}
			});
		}
	});


	// 编辑新闻
	var updateId = null;
	tbody.on('click','.btn-primary',function(e){
		$("#updateModal").modal('show');
		updateId = $(this).parent().prevAll().eq(5).html();
		// 表单添加数据
		$.ajax({
				url:'php/curnews.php',
				type:'get',
				datatype:'json',
				data:{newsid:updateId},
				success:function(data){
					$("#unewstitle").val(data[0].newstitle);
					$("#unewsimg").val(data[0].newsimg);
					$("#unewssrc").val(data[0].newssrc);
					$("#unewstype").val(data[0].newstype);
					var utime = data[0].newstime.split(' ')[0];
					$("#unewstime").val(utime);
					// console.log(data);
				},
				error:function(){
					alert('ajax失败');
				}
			});
	});
	// 修改新闻
	$("#updateModal #confirmUpdate").click(function(){
		$.ajax({
			url:'php/update.php',
			type:'post',
			data:{
				newstitle:$("#unewstitle").val(), 
				newsimg:$("#unewsimg").val(),
				newssrc:$("#unewssrc").val(),
				newstype:$("#unewstype").val(),
				newstime:$("#unewstime").val(),
				newsid:updateId
			},
			success:function(){
				$("#updateModal").modal('hide');
				refreshnews();
			},
			error:function(){
				alert('ajax失败');
			}
		});
	});

});


function refreshnews(){
	var tbody = $("tbody");
	tbody.empty();
	$.ajax({
		url:"php/getnews.php",
		type:"get",
		datatype:"json",
		data:{newstype:null},
		success:function(data){
			data.forEach(function(item,index,array){
				var $tdid = $('<td>').html(item.id);
				var $tdtype = $('<td>').html(item.newstype);
				var $tdtitle = $('<td>').html(item.newstitle);
				var $tdimg = $('<td>').html(item.newsimg);
				var $tdsrc = $('<td>').html(item.newssrc);
				var $tdtime = $('<td>').html(item.newstime);
				var $tdctrl = $('<td>');
				var $tdupdate = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
				var $tddelect = $('<button>').addClass('btn btn-danger btn-xs').html('删除');
				$tdctrl.append($tdupdate,$tddelect);
				var $trow = $("<tr>");
				$trow.append($tdid,$tdtype,$tdtitle,$tdimg,$tdsrc,$tdtime,$tdctrl);
				tbody.append($trow);
			});
		},
		error:function(){
			alert('刷新列表AJAX失败');
		}
	});
}

function addnews(e){
	e.preventDefault();
	if($("#newsimg").val()==='' || $("#newstime").val()==='' || $("#newssrc").val()==='' || $("#newstitle").val()===''){
		if($("#newsimg").val()===''){
			$("#newsimg").parent().addClass('has-error');
		}else{
			$("#newsimg").parent().removeClass('has-error');
		}

		if($("#newstime").val()===''){
			$("#newstime").parent().addClass('has-error');
		}else{
			$("#newstime").parent().removeClass('has-error');
		}

		if($("#newstitle").val()===''){
			$("#newstitle").parent().addClass('has-error');
		}else{
			$("#newstitle").parent().removeClass('has-error');
		}

		if($("#newssrc").val()===''){
			$("#newssrc").parent().addClass('has-error');
		}else{
			$("#newssrc").parent().removeClass('has-error');
		}
	}else{
		var jsonNews = {
			newstitle:$("#newstitle").val(),
			newsimg:$("#newsimg").val(),
			newstime:$("#newstime").val(),
			newstype:$("#newstype").val(),
			newssrc:$("#newssrc").val()
		};
		// 提交添加
		$.ajax({
			url:'php/insert.php',
			type:'post',
			data:jsonNews,
			datatype:'json',
			success:function(data){
				refreshnews();
			},
			error:function(){
				alert("添加新闻失败");
			}
		})
	}
}
