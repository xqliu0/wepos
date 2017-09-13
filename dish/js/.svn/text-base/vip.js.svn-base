function set_menu_active(){
	$("#active-menu-id-vip").addClass("active").siblings().removeClass("active");
}
set_menu_active();

function query_vip(){
	var query_var = $("#vip-filter-input").val();
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getVipList",
        dataType: "json",
        data: {"query_var":query_var},
        success: function(e) {
            if (e.error == "") {  
            	
            		var html = template.render('vip-list', e.data);
				$("#vip-list-zone").html(html);
				
				vipArray = e.data.vip_list;
				
				if(e.data.vip_list.length > 0){
					$("#vip-list-title").removeClass("ng-hide");
				}else{
					$("#vip-list-title").addClass("ng-hide");
				}
            }
        },
        error: function() {
            $("#tip").show().html("服务器异常，请稍后再试"),
            $("html, body").animate({
                scrollTop: 0
            },
            "fast"),
            timeOut()
        }
    })
}


function choose_vip_info(member_id){
	var length = vipArray.length;
	for (var i=0; i < length; i++) {
   	 if(vipArray[i].member_id == member_id){
   		var selectedVipArray = [];
   		selectedVipArray.push(vipArray[i]);
   		var html = template.render('vip-info', {'vip_info':selectedVipArray});
		$("#vip-info-zone").html(html);
		
		$("#vip-oper-zone").removeClass("ng-hide");
   	 }
	}
}