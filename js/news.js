$(function(){
// 默认是推荐栏
	refreshnews("推荐");

	$("li a").click(function(e){
		e.preventDefault();
		var type = $(this).text();
		refreshnews(type);
	})
});

function refreshnews(type){
	var $lists = $("article ul");
	$lists.empty();
	$.ajax({
		url:"php/getnews.php",
		datatype:'json',
		type:'get',
		data:{newstype:type},
		success:function(data){
			data.forEach(function(item,index,arr){
				// 最新的显示在上面所以用prependTo（）
				var $list = $("<li></li>").addClass('news-list').prependTo($lists);
				var $newsImg = $("<div></div>").addClass('newsimg').appendTo($list);
				var $img = $("<img>").attr("src",item.newsimg).appendTo($newsImg);
				var $newscontent = $("<div></div>").addClass('newscontent').appendTo($list);
				var $h1 = $("<h1></h1>").html(item.newstitle).appendTo($newscontent);
				var $p = $("<p></p>").appendTo($newscontent);
				var $newstime = $("<sapn></span>").addClass('newstime').html(item.newstime).appendTo($p);
				var $newssrc = $("<sapn></span>").addClass('newssrc').html(item.newssrc).appendTo($p);
			})
		},
		error:function(){
			alert("ajax失败");
		}
	});
}