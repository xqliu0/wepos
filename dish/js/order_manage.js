

function set_menu_active(){
	$("#active-menu-id-tangdian").addClass("active").siblings().removeClass("active");
}
set_menu_active();


//function getStoreTableInfo1(table_class_id) {
//    $.ajax({
//        type: "GET",
//        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getTableClass",
//        dataType: "json",
//        data: {"table_class_id":table_class_id},
//        success: function(e) {
//            if (e) {  
//            	
//            	alert('9999');
//            	
//            	var html = template.render('store_table_list', e.data);
//				$("#table_list_zone").html(html);
//				$("#table_class_"+table_class_id).siblings().removeClass("active");
//				$("#table_class_"+table_class_id).addClass("active");
//				
//				$("#selected-parent-table-class-name").val(e.data.table_class[0].stc_parent_name);
//				
//				//记录查询的餐桌列表结果
//				storeTableArray = [];
//				storeTableArray = e.data.table_class;
//				filteredStoreTableArray = [];
//				
//				
//				var table_id = $('#oper-table-table-id').val();
//				if(table_id!=""){
//					$("#table_item_"+table_id).siblings().removeClass("table-active");
//	        		$("#table_item_"+table_id).addClass("table-active");
//				}
//				
//				var ptid = GetQueryString("ptid");
//				var tid = GetQueryString("tid");
//				var sid = GetQueryString("sid");
//				if(tid>0 && sid>0){
//					var length = storeTableArray.length;
//				     for (var i=0; i < length; i++) {
//				    	 if(storeTableArray[i].stc_id == tid){
//				    		 var table_name = storeTableArray[i].stc_name;
//				    	     var stc_seat_num = storeTableArray[i].stc_seat_num;
//				    	    	 var stc_table_state = storeTableArray[i].stc_table_state;
//				    	    	 var order_id = storeTableArray[i].order_id;
//
//				    	    	 choose_table(sid,ptid,tid,table_name,stc_table_state,stc_seat_num,order_id);
//				    	    	 break;
//				    	 }
//				    	 }
//				}
//				
//            }
//        },
//        error: function() {
//            $("#tip").show().html("服务器异常，请稍后再试"),
//            $("html, body").animate({
//                scrollTop: 0
//            },
//            "fast"),
//            timeOut()
//        }
//    })
//}


function getStoreGoodsClassInfo() {
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getGoodsClass",
        dataType: "json",
        data: {"table_class_id":0},
        success: function(e) {
            if (e) {
            	            	
            	var html = template.render('store_goods_class', e.data);
				$("#store_goods_class_zone").html(html); 
				
				
				getStoreGoodsInfo(e.data.goods_class[0].stc_id);
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

function getStoreGoodsInfo(goods_class_id) {
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreGoodsInfo",
        dataType: "json",
        data: {"goods_class_id":goods_class_id},
        success: function(e) {
            if (e) {     
            	
            	//alert('123');
            	var html = template.render('store_goods_list', e.data);
				$("#goods_list_zone").html(html);
				
				$("#orderListCell").addClass("ng-hide");
				
				$("#goods_class_"+goods_class_id).siblings().removeClass("active");
				$("#goods_class_"+goods_class_id).addClass("active");
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

//动态控制过滤餐桌功能
function clear_table_filter_key(){
	$("#filter-var").val("");
	var html = template.render('store_table_list', {'table_class':storeTableArray});
	$("#table_list_zone").html(html);
}

function cancel_order(){
	
	$("#cancel-order-panel").removeClass("ng-hide");

}

function cancel_order_submit(){
	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var order_id = $('#oper-table-order-id').val();
	var reason = $('#oper-order-cancel-reason').val();
	var reason_qt = $('#cancel-reson-qt-input-content').val();

	
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cancelTableOrder",
        dataType: "json",
        data: {"store_id":store_id,"table_id":table_id,
        	"order_id":order_id,"reason":reason,"reason_qt":reason_qt},
        success: function(e) {
            if (e.error=='') {     
            	location.reload();
            }else{
            	Zepto.sDialog({
                    skin:"red",
                    content: e.msg,
                    okBtn:false,
                    cancelBtn:false
                  });
            }
        },
        error: function() {
            
            Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍后再试",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
    
}

function cancel_change_reason(reson){
	if(reson != 'qt'){
		$("#cancel-reson-"+reson).addClass("active").siblings().removeClass("active");
	}else{
		$("#cancel-reson-qt-input").removeClass("ng-hide");
	}
	$('#oper-order-cancel-reason').val(reson);
}


function filter_table(){
	var filter_var =  $("#filter-var").val();
	if(filter_var != ""){
		filteredStoreTableArray = [];
		 var length = storeTableArray.length;
	     for (var i=0; i < length; i++) {
	    	 if(storeTableArray[i].stc_name.indexOf(filter_var)>=0){
	    		 filteredStoreTableArray.push(storeTableArray[i]);
	    	 }
	     }
	     if(filteredStoreTableArray.length > 0){
	    	 alert('1111222');
	    	 var html = template.render('store_table_list', {'table_class':filteredStoreTableArray});
				$("#table_list_zone").html(html);
	     }
	     filteredStoreTableArray = [];
	}else{
		var html = template.render('store_table_list', {'table_class':storeTableArray});
		$("#table_list_zone").html(html);
	}
	
}
   




function get_filtered_tables(state) {
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getFilteredTables",
        dataType: "json",
        data: {"state":state},
        success: function(e) {
            if (e) {     
            	alert('wwwww');
            	var html = template.render('store_table_list', e.data);
				$("#table_list_zone").html(html);
				$("#table_filter").siblings().removeClass("active");
				$("#table_filter").addClass("active");
				
				//记录查询的餐桌列表结果
				storeTableArray = [];
				storeTableArray = e.data.table_class;
				filteredStoreTableArray = [];
				
				open_table_filter_panel(false);
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

function toggle_action(action) {
	if(action == "") return false;
	//记录当前操作
	$('#oper-table-oper-type').val(action);
	
	//换台
	if(action == 'change_table'){
		//展示空闲的桌台
		get_filtered_tables('idle');
		//展示提示信息
		show_action_note(action);

		$(".toggle_change_table").siblings().removeClass("active");
		$('.toggle_change_table').addClass("active");
		 		
		$("#navigation-toolbar-note").text("请选择您要换到的目标桌台");		
		$("#navigation-toolbar-note").toggle();
	}else if(action == 'merge_table'){//并台
		//展示空闲的桌台
		get_filtered_tables('ordered');
		//展示提示信息
		show_action_note(action);
		
		$(".toggle_merge_table").siblings().removeClass("active");
		$('.toggle_merge_table').addClass("active");
		
		$("#navigation-toolbar-note").text("请选择您要并到的目标桌台");
		$("#navigation-toolbar-note").toggle();
	}else if(action == 'append_itemable'){//加菜
		//切换cell实图
		$("#tableChooseCell").addClass("ng-hide");
		$("#returnProductChooseCell").addClass("ng-hide");
		$("#orderListCell").addClass("ng-hide");

		$("#productChooseCell").removeClass("ng-hide");
		$("#append_itemable_table").removeClass("ng-hide");
		
		$("#ordered-table-action-append-item").siblings().removeClass("active");
		$('#ordered-table-action-append-item').addClass("active");
		
		$("#navigation-toolbar-note").text("请选择要添加的菜品");
		$("#navigation-toolbar-note").hide();
		$("#navigation-toolbar-note").show();
		
		getStoreGoodsClassInfo();
	}else if(action == 'delete_itemable' || action == 'refund_itemable'){//退菜
		//切换cell实图
		$("#tableChooseCell").addClass("ng-hide");
		$("#productChooseCell").addClass("ng-hide");
		$("#orderListCell").addClass("ng-hide");
		
		$("#returnProductChooseCell").removeClass("ng-hide");
		$("#append_itemable_table").removeClass("ng-hide");

		$("#ordered-table-action-delete-item").siblings().removeClass("active");
		$('#ordered-table-action-delete-item').addClass("active");
		
		$("#navigation-toolbar-note").text("请选择要删减的菜品");
		$("#navigation-toolbar-note").hide();
		$("#navigation-toolbar-note").show();
		
		refreshInOrderedGoodsArray();
		//getStoreGoodsClassInfo();
	}else if(action == 'clean_table'){//清台
		//展示开台操作div
		var table_name = $('#oper-table-table-name').val();
		var note = "确定要将 "+table_name+" 清台？"
		
		$('#confirm-panel').removeClass('ng-hide');
		$('#confirm-panel').attr("wp-confirm-info", note);
		$('#confirm-panel-content').text(note);
		
		$('#confirm-action-yes').removeClass('ng-hide');
		$('#confirm-action-no').removeClass('ng-hide');	
	}
}

function backToOrderDesktop() {
	//恢复桌面展示
	$("#returnProductChooseCell").addClass("ng-hide");
	$("#productChooseCell").addClass("ng-hide");
	$("#orderListCell").removeClass("ng-hide");
	$("#navigation-toolbar-note").hide();

	//清空操作
	$("#oper-table-oper-type").val("");
	$("#ordered-table-action-append-item").siblings().removeClass("active");
	$("#ordered-table-action-append-item").removeClass("active");
}

function show_action_note(action){
	
	if(action == 'change_table'){
		$("#table_change_note").siblings().addClass("ng-hide");
		$("#table_change_note").removeClass("ng-hide");
		
		var current_table_name = $('#oper-table-table-name').val();
		$("#table_change_current_table").text(current_table_name);
		
	}else if(action == 'merge_table'){
		$("#table_merge_note").siblings().addClass("ng-hide");
		$("#table_merge_note").removeClass("ng-hide");
		
		var current_table_name = $('#oper-table-table-name').val();
		$("#table_merge_current_table").text(current_table_name);
		
		
	}else{
		$("#table_choose_note").siblings().addClass("ng-hide");
		$("#table_choose_note").removeClass("ng-hide");
	}
	
}


function choose_order(order_id,store_id,table_id,order_state,order_from,buyer_name){
	$("#selected_order_status").val(order_state);
	$("#order_item_"+order_id).addClass("active").siblings().removeClass("active");
	//查询订单信息
//	getStoreOrderInfo(order_id,store_id,table_id);
	top_level_choose_table(store_id, table_id,order_id, order_state,order_from,buyer_name);
}


//首次选择餐桌的操作
function top_level_choose_table(store_id, table_id,order_id, order_state,order_from,buyer_name) {
	$("#table-item-zone-ordered-item-list-zone").addClass("ng-hide");

	//对应桌台为选中样式
	$("#table_item_"+table_id).siblings().removeClass("table-active");
	$("#table_item_"+table_id).addClass("table-active");
	
	//餐桌信息初始化进操作区域
	$('#oper-table-store-id').val(store_id);
	$('#oper-table-table-id').val(table_id);
	$('#oper-table-table-name').val(buyer_name);
	$('#oper-table-order-id').val(order_id);
	
	
	//展示操作列表区域
	set_oper_button_state_4_orders(order_from,order_state);
	
	
	$('#table-item-zone-ordered-item-list-zone').addClass('ng-hide');
	$('#store_table_order_info_zone').addClass('ng-hide');

	
	if(order_state <= 10){
		//查询该餐桌已经选择的菜品数据，并且渲染展示
//		$('#table-item-zone-ordered-item-list-zone').removeClass('ng-hide');
		//get_ordered_dish_list(order_id, store_id, table_id);
	}else if(order_state == 20){
		//查询该餐桌已经选择的菜品数据，并且渲染展示
		//$('#store_table_order_info_zone').removeClass('ng-hide');
//		getPaidStoreTableOrderInfo(order_id,store_id, table_id);
	}
	$('#store_table_order_info_zone').removeClass('ng-hide');
	getPaidStoreTableOrderInfo(order_id, store_id, table_id);
	
   //展示餐桌信息和已点菜品列表区域
	$('#table-item-zone').removeClass('ng-hide');
	//$('#table-item-zone-table-name').text(buyer_name);

}


function set_oper_button_state_4_orders(order_from,order_state){
	
	/*
	if($order_from==self::ORDER_FROM_PC){
        return "电脑";
    }else if($order_from==self::ORDER_FROM_MOBILE){
        return "手机";
    }else if($order_from==self::ORDER_FROM_WEPOS){
        return "堂食";
    }else if($order_from==self::ORDER_FROM_WEPOS_DELIVERY){
        return "外卖";
    }else if($order_from==self::ORDER_FROM_WEPOS_BUYORDER){
        return "买单";
    }else if($order_from==self::ORDER_FROM_WEPOS_PREORDER){
        return "预约";
    }else if($order_from==self::ORDER_FROM_WEPOS_FASTFOODORDER){
        return "快餐";
    }
	*/
	
	$('#oper-table').removeClass('ng-hide');
	if(order_from == 3){
		//堂食
		set_oper_state_tangshi(order_state);
	}else if(order_from == 4){
		//外卖
		set_oper_state_deliver(order_state);
	}else if(order_from == 5){
		//买单订单
		set_oper_state_buyorder(order_state);
	}else if(order_from == 6){
		//预约
		set_oper_state_perorder(order_state);
	}else if(order_from == 7){
		//快餐订单
		set_oper_state_fastfood(order_state);
	}
}

function deliver_order_good(){
	$('#choose-deliver-man').removeClass('ng-hide');
}


function set_oper_state_tangshi(order_state){
	//操作区1
	$('#ordered-table-action').removeClass('ng-hide');
	//堂点不需要指派配送
	$('#ordered-table-action-deliver').addClass('ng-hide');
	if(order_state == 0){
		//已取消
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').addClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 10){
		//未付款
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').removeClass('ng-hide');
		$('#ordered-table-action-append-item').removeClass('disabled');
        //退菜
		$('#ordered-table-action-delete-item').removeClass('ng-hide');
		$('#ordered-table-action-delete-item').removeClass('disabled');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').removeClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').removeClass('ng-hide');
		$('#ordered-table-action-free-order').addClass('disabled');
		//单品改价
		$('#ordered-table-action-change-price').removeClass('ng-hide');
		$('#ordered-table-action-change-price').addClass('disabled');

		//补打小票
		$('#ordered-table-action-print').removeClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').removeClass('ng-hide');
		$('#settle-btn').removeClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 20){
		//已付款 
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
  
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').removeClass('ng-hide');
		
		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}
}


function set_oper_state_deliver(order_state){
	//操作区1
	$('#ordered-table-action').removeClass('ng-hide');
	$('#ordered-table-action-confirm-order').addClass('ng-hide').siblings().addClass('ng-hide');
	$('#ordered-table-action-free-order').addClass('ng-hide').siblings().addClass('ng-hide');

	if(order_state == 0){
		//已取消
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').addClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");

		//配送
		$("#ordered-table-action-deliver").addClass("ng-hide");
	}else if(order_state == 10){
		//未付款
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').removeClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').removeClass('ng-hide');
		$('#ordered-table-action-free-order').addClass('disabled');
		//单品改价
		$('#ordered-table-action-change-price').removeClass('ng-hide');
		$('#ordered-table-action-change-price').addClass('disabled');

		//补打小票
		$('#ordered-table-action-print').removeClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').removeClass('ng-hide');
		$('#settle-btn').removeClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");

		//配送
		$("#ordered-table-action-deliver").addClass("ng-hide");
	}else if(order_state == 20){
		//已付款 
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
		
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').removeClass('ng-hide');
		
		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");

		//配送
		$("#ordered-table-action-deliver").removeClass("ng-hide");
	}else if(order_state == 30){
		//已配送
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
		
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').removeClass('ng-hide');
		
		//结算
		$('#check-out').removeClass('ng-hide');
		$('#settle-btn').removeClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").addClass("ng-hide");

		//配送
		$("#ordered-table-action-deliver").addClass("ng-hide");
	}	
}


function set_oper_state_buyorder(order_state){
	$('#ordered-table-action').removeClass('ng-hide');
	$('#ordered-table-action-confirm-order').addClass('ng-hide').siblings().addClass('ng-hide');
	$('#ordered-table-action-free-order').addClass('ng-hide').siblings().addClass('ng-hide');
	$("#table-item-zone-ordered-item-list-zone").addClass("ng-hide");
	//直接买单不需要指派配送
	$('#ordered-table-action-deliver').addClass('ng-hide');
	if(order_state == 0){
		//已取消
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').addClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
		$("#table-item-zone-ordered-item-list-zone").addClass("ng-hide");
	}else if(order_state == 10){
		//未付款
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').removeClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');
		
		//结算
		$('#check-out').removeClass('ng-hide');
		$('#settle-btn').removeClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
		$("#table-item-zone-ordered-item-list-zone").addClass("ng-hide");
	}else if(order_state == 20){
		//已付款 
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
  
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').removeClass('ng-hide');
		
		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
		$("#table-item-zone-ordered-item-list-zone").addClass("ng-hide");
	}
}


function set_oper_state_perorder(order_state){
	$('#ordered-table-action').removeClass('ng-hide');
	$('#ordered-table-action-confirm-order').addClass('ng-hide').siblings().addClass('ng-hide');
	$('#ordered-table-action-free-order').addClass('ng-hide').siblings().addClass('ng-hide');
	
	if(order_state == 0){
		//已取消
		//操作区1
		$('#ordered-table-action').removeClass('ng-hide');
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').addClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 10){
		//未付款
		//操作区1
		$('#ordered-table-action').removeClass('ng-hide');
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').removeClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 20){
		//已付款 
		//操作区1
		$('#ordered-table-action').removeClass('ng-hide');
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
  
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');
		
		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 30){
		//已配送
		//操作区1
		$('#ordered-table-action').removeClass('ng-hide');
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
		
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');
		
		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").addClass("ng-hide");
	}	
}

function set_oper_state_fastfood(order_state){
	$('#ordered-table-action').removeClass('ng-hide');
	$('#ordered-table-action-confirm-order').addClass('ng-hide').siblings().addClass('ng-hide');
	$('#ordered-table-action-free-order').addClass('ng-hide').siblings().addClass('ng-hide');
	//快餐不需要指派配送
	$('#ordered-table-action-deliver').addClass('ng-hide');		
	if(order_state == 0){
		//已取消
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');
		
		//操作区2
		$('#ordered-table-action-2').addClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');

		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');

		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');
		
		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 10){
		//未付款
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').removeClass('ng-hide');
		$('#ordered-table-action-free-order').addClass('disabled');
		//反结单
		$('#ordered-table-action-refund-order').addClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').removeClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').removeClass('ng-hide');
		$('#ordered-table-action-change-price').addClass('disabled');

		//补打小票
		$('#ordered-table-action-print').removeClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').addClass('ng-hide');
		
		//结算
		$('#check-out').removeClass('ng-hide');
		$('#settle-btn').removeClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}else if(order_state == 20){
		//已付款 
		//操作区1
		//确认
		$('#ordered-table-action-confirm-order').addClass('ng-hide');
		//加菜
		$('#ordered-table-action-append-item').addClass('ng-hide');
        //退菜
		$('#ordered-table-action-delete-item').addClass('ng-hide');
		//赠菜
		$('#ordered-table-action-free-order').addClass('ng-hide');
		//反结单
		$('#ordered-table-action-refund-order').removeClass('ng-hide');

		//操作区2
		$('#ordered-table-action-2').removeClass('ng-hide');
		//取消订单
		$('#ordered-table-action-cancle-order').addClass('ng-hide');
		//单品改价
		$('#ordered-table-action-change-price').addClass('ng-hide');
		
		//补打小票
		$('#ordered-table-action-print').addClass('ng-hide');
		//打印结单
		$('#ordered-table-action-print-paid').removeClass('ng-hide');
		
		//结算
		$('#check-out').addClass('ng-hide');
		$('#settle-btn').addClass('ng-hide');

		//订单支付详情和支付展示区
		$("#store_table_order_info_zone").removeClass("ng-hide");
		//餐桌名
		$("#table-item-zone-table-name").removeClass("ng-hide");
	}
}


//首次选择餐桌的操作
function secend_level_choose_table(action, store_id, parent_table_id, table_id, table_name, table_state,seat_num) {
	
	$('#oper-table-2nd-table-id').val(table_id);
	$('#oper-table-2nd-table-name').val(table_name);
	
	if(action == "change_table"){
		//展示开台操作div
		var current_table_name = $('#oper-table-table-name').val();
		
		$('#confirm-panel').removeClass('ng-hide');
		var note = "确定要将 "+current_table_name+" 换到 " + table_name + " 吗？";
		$('#confirm-panel').attr("wp-confirm-info",note);
		$('#confirm-panel-content').text(note);
		
		$('#confirm-action-yes').removeClass('ng-hide');
		$('#confirm-action-no').removeClass('ng-hide');	
		
	}else if(action == "merge_table"){
		
		var current_table_name = $('#oper-table-table-name').val();
		
		//展示开台操作div
		$('#confirm-panel').removeClass('ng-hide');
		var note = "确定要将 "+current_table_name+" 并台到 " + table_name + " 吗？";
		
		$('#confirm-panel').attr("wp-confirm-info",note);
		$('#confirm-panel-content').text(note);
		
		$('#confirm-action-yes').removeClass('ng-hide');
		$('#confirm-action-no').removeClass('ng-hide');	
	}
}

//选中已经选中的菜品列表
function select_selected_good(good_id,good_name,good_price,good_num) {
	$('#selected-selected-good-id').val(good_id);
	$('#selected-selected-good-name').val(good_name);
	$('#selected-selected-good-price').val(good_price);
	$('#selected-selected-good-num').val(good_num);
	
	$('#selected_line_'+good_id).siblings().removeClass("active");
	$('#selected_line_'+good_id).addClass('active');
    $('#selected_goods_actions').removeClass('ng-hide');
    
    //展示单品改价状态
    if ($("#selected_order_status").val() == 10) {
		$('#ordered-table-action-change-price').removeClass('ng-hide');
		$('#ordered-table-action-change-price').removeClass('disabled');
		$('#ordered-table-action-free-order').removeClass('ng-hide');
		$('#ordered-table-action-free-order').removeClass('disabled');
    }
}

function change_price_submit(){
	 
	var store_id = $("#oper-table-store-id").val();
	var order_id = $('#oper-table-order-id').val();
	var table_id = $("#oper-table-table-id").val();

	var good_id = $('#selected-selected-good-id').val();
	var good_price = $('#selected-selected-good-price').val();
	var good_num = $('#selected-selected-good-num').val();
	var new_price = $('#good-change-price-new-price').val();
	
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=changeOrderGoodPrice",
        dataType: "json",
        data: {"store_id":store_id, "table_id":table_id,
        	"order_id":order_id, "good_id":good_id,
        	"good_price":good_price, "good_num":good_num,"good_new_price":new_price},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            		get_ordered_dish_list(order_id, store_id, table_id);
            		click_mask();
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

function change_order_good_price_free(){
	
	var good_id = $('#selected-selected-good-id').val();
	if(good_id == "" || good_id == "undefined") return;
	
	$('#good-change-price-name').text($('#selected-selected-good-name').val());
	$('#good-change-price-price').text($('#selected-selected-good-price').val());
	
	$('#good-change-price-panel').removeClass('ng-hide');
	$('#good-change-price-new-price').val(0);
}

function change_order_good_price(){
	var good_id = $('#selected-selected-good-id').val();
	if(good_id == "" || good_id == "undefined") return;
	
	$('#good-change-price-name').text($('#selected-selected-good-name').val());
	$('#good-change-price-price').text($('#selected-selected-good-price').val());
	
	$('#good-change-price-panel').removeClass('ng-hide');

}


function getPaidStoreTableOrderInfo(order_id, store_id, table_id) {
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getOrderInfo",
        dataType: "json",
        data: {"order_id":order_id,"store_id":store_id,"table_id":table_id},
        success: function(e) {
            if (e) {
            	
            	var html = template.render('store_table_order_info', e.data.order_info);
				$("#store_table_order_info_zone").html(html); 
				

        		//纪录对应的订单id号信息
            $("#oper-table-order-id").val(e.data.order_id);

        		var html = template.render('table-item-zone-ordered-item-list', e.data);
           	  	$("#table-item-zone-ordered-item-list-zone").html(html);
           		$("#table-item-zone-ordered-item-list-zone").removeClass("ng-hide");
           	  	$("#table-item-zone-ordered-item-total-price").removeClass('ng-hide');
        	
           	 var length = e.data.order_info.extend_order_goods.length;
           	 
           	inOrderedGoodsArray = [];
             for (var i=0; i < length; i++) {
            	 inOrderedGoodsArray.push({'good_id':e.data.order_info.extend_order_goods[i].goods_id,
            		 'good_name':e.data.order_info.extend_order_goods[i].goods_name,
            		 'good_price':e.data.order_info.extend_order_goods[i].goods_price,
            		 'good_new_price':e.data.order_info.extend_order_goods[i].goods_new_price,
            		 'good_num':e.data.order_info.extend_order_goods[i].goods_num,
            		 'has_ordered_good_num':e.data.order_info.extend_order_goods[i].goods_num,
            		 'note':e.data.order_info.extend_order_goods[i].note,
            		 'gift':e.data.order_info.extend_order_goods[i].gift,
            		 'order_id':e.data.order_info.extend_order_goods[i].order_id});
             }
             refreshInOrderedGoodsArray();
             
             
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


function get_ordered_dish_list(order_id, store_id, table_id){
	//开台
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getOrderInfo",
        dataType: "json",
        data: {"order_id":order_id,"store_id":store_id, "table_id":table_id},
        success: function(e) {
            if (e) {
            	if(e.error==''){
	            	//纪录对应的订单id号信息
	                $("#oper-table-order-id").val(e.data.order_id);
	        		
	        		var html = template.render('table-item-zone-ordered-item-list', e.data);
	           	  	$("#table-item-zone-ordered-item-list-zone").html(html);
	           		$("#table-item-zone-ordered-item-list-zone").removeClass("ng-hide");
	           	  	$("#table-item-zone-ordered-item-total-price").removeClass('ng-hide');
            	
            		var html = template.render('store_table_order_info', e.data.order_info);
					$("#store_table_order_info_zone").html(html); 

               	 	var length = e.data.order_info.extend_order_goods.length;
               	 
	               	inOrderedGoodsArray = [];
	                for (var i=0; i < length; i++) {
	                	 inOrderedGoodsArray.push({'good_id':e.data.order_info.extend_order_goods[i].goods_id,
	                		 'good_name':e.data.order_info.extend_order_goods[i].goods_name,
	                		 'good_price':e.data.order_info.extend_order_goods[i].goods_price,
	                		 'good_new_price':e.data.order_info.extend_order_goods[i].goods_new_price,
	                		 'good_num':e.data.order_info.extend_order_goods[i].goods_num,
	                		 'has_ordered_good_num':e.data.order_info.extend_order_goods[i].goods_num,
	                		 'note':e.data.order_info.extend_order_goods[i].note,
	                		 'gift':e.data.order_info.extend_order_goods[i].gift,
	                		 'order_id':e.data.order_info.extend_order_goods[i].order_id});
	                 }

	                $('#delete-item-selected-good-id').val("");
					$('#delete-item-selected-good-index').val("");

	                refreshInOrderedGoodsArray();
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

function selecte_delete_item(index, good_id){
	$('#delete_good_id_'+good_id).addClass("active").siblings().removeClass("active");
	$('#delete-item-selected-good-id').val(good_id);
	$('#delete-item-selected-good-index').val(index);

	$('#delete-item-action-remove').removeClass('ng-hide');
	$('#delete-item-action-add').removeClass('ng-hide');
	
	if(inOrderedGoodsArray[index].good_num > 0){
		$('#delete-item-action-remove-tag').addClass('red').removeClass('gray');
	}else{
		$('#delete-item-action-remove-tag').addClass('gray').removeClass('red');
	}
	
	if(inOrderedGoodsArray[index].good_num < inOrderedGoodsArray[index].has_ordered_good_num){
		
		$('#delete-item-action-add-tag').addClass('red').removeClass('gray');
		
	}else{
		$('#delete-item-action-add-tag').addClass('gray').removeClass('red');
	}
	
}

  
function add_ordered_itemable(){
	var good_id = $('#delete-item-selected-good-id').val();
	var good_index = $('#delete-item-selected-good-index').val();
	if(inOrderedGoodsArray[good_index].good_num >= inOrderedGoodsArray[good_index].has_ordered_good_num) return false;
	inOrderedGoodsArray[good_index].good_num = inOrderedGoodsArray[good_index].good_num + 1;
	
	refreshInOrderedGoodsArray();
	selecte_delete_item(good_index, good_id);
}


function remove_ordered_itemable(){
	var good_id = $('#delete-item-selected-good-id').val();
	var good_index = $('#delete-item-selected-good-index').val();
	
	if(inOrderedGoodsArray[good_index].good_num <= 0) return false;
	
	inOrderedGoodsArray[good_index].good_num = inOrderedGoodsArray[good_index].good_num - 1;
	
	refreshInOrderedGoodsArray();
	selecte_delete_item(good_index, good_id);
}

function refreshInOrderedGoodsArray(){
	if(inOrderedGoodsArray.length > 0){
		var html = template.render('in_ordered_goods_list', {'inOrderedGoodsArray':inOrderedGoodsArray});
	  	$("#in_ordered_goods_list_zone").html(html);
	}
}

function submit_deleted_item(){
	var isRefund = $('#oper-table-oper-type').val() == "refund_itemable";
	if(inOrderedGoodsArray.length > 0){
		 var order_id = $("#oper-table-order-id").val();
		 var store_id = $("#oper-table-store-id").val();
		 var table_id = $("#oper-table-table-id").val();
		 //加菜提交
		$.ajax({
		        type: "POST",
		        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=deleteDishItem",
		        dataType: "json",
		        data: {"store_id":store_id, "table_id":table_id, "order_id":order_id, "is_refund":isRefund, "deleted_item":inOrderedGoodsArray},
		        success: function(e) {
		            if (e) {
		            	if(e.error==''){
		            		$("#delete-item-rst-confirm").removeClass('ng-hide');
		            		get_ordered_dish_list(order_id, store_id, table_id);
		            		//var html = template.render('table-item-zone-ordered-item-list', e.data);
		               	  //	$("#table-item-zone-ordered-item-list-zone").html(html);
		               	  //	$("#table-item-zone-ordered-item-total-price").removeClass('ng-hide');
		            	}else{
		            		Zepto.sDialog({
		                        skin:"red",
		                        content: e.msg,
		                        okBtn:false,
		                        cancelBtn:false
		                      });
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
}

//function show_all(){
//	//拉取所有
//	getStoreTableInfo('all');
//	
//	$('#table_show_all').addClass('active').siblings().removeClass('active');
//}


function open_table_filter_panel(show) {
	//展示过滤操作pnel
	if(show){
		$('#table_filter_oper_panel').removeClass('ng-hide');
	}else{
		$('#table_filter_oper_panel').addClass('ng-hide');
	}
}


function open_table_panel() {
	//展示开台操作div
	$('#open-table-panel').removeClass('ng-hide');
		
}

function click_mask() {
	//隐藏开台操作div
	$('#open-table-panel').addClass('ng-hide');	
	$('#confirm-panel').addClass('ng-hide');
	$('#confirm_append_item_panel').addClass('ng-hide');
	$('#append-item-rst-confirm').addClass('ng-hide');
	$('#delete-item-rst-confirm').addClass('ng-hide');
	$('#cancel-order-panel').addClass('ng-hide');
	$('#good-change-price-panel').addClass('ng-hide');
	$('#store_dish_note_select_panel').addClass('ng-hide');
	$('#choose-deliver-man').addClass('ng-hide');
}


function delivery_man_submit(){
	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var order_id = $('#oper-table-order-id').val();
	var deliver_id = 10;

	
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=deliverTableOrder",
        dataType: "json",
        data: {"store_id":store_id,"table_id":table_id,
        	"order_id":order_id,"deliver_id":deliver_id},
        success: function(e) {
            if (e.error=='') {     
            	location.reload();
            }else{
            	Zepto.sDialog({
                    skin:"red",
                    content: e.msg,
                    okBtn:false,
                    cancelBtn:false
                  });
            }
        },
        error: function() {
            
            Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍后再试",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
    
}


function cancel_open_table() {
	//隐藏开台操作div
	$('#open-table-panel').addClass('ng-hide');	
}



function wpOk(){
	
}

function open_table() {

	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var parent_table_id = $('#oper-table-parent-table-id').val();
	var customer_number = $('#open-table-customer-num').val();
	//开台
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=openTable",
        dataType: "json",
        data: {"store_id":store_id,"parent_table_id":parent_table_id, "table_id":table_id,"customer_number":customer_number},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            		getStoreTableInfo(e.data.parent_table_id);
                       		
            		click_mask();
            		
            		$('#oper-table-open').addClass('ng-hide');
        			$('#oper-table-order').removeClass('ng-hide');
        			$('#oper-table-clean').removeClass('ng-hide');
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


function open_table_and_order() {

	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var parent_table_id = $('#oper-table-parent-table-id').val();
	var customer_number = $('#open-table-customer-num').val();
	//开台
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=openTable",
        dataType: "json",
        data: {"store_id":store_id,"parent_table_id":parent_table_id, "table_id":table_id,"customer_number":customer_number},
        success: function(e) {
            if (e) {
            		if(e.error==''){
            			go_cart();
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

function confirm_action(){
	var action = $('#oper-table-oper-type').val();
	if(action == "change_table"){
		change_table();
		$('#oper-table-oper-type').val('');
		clear_action_note();
	}else if(action == "merge_table"){
		merge_table();
		$('#oper-table-oper-type').val('');
		clear_action_note();
	}else if(action == "clean_table"){
		clean_table();
		$('#oper-table-oper-type').val('');
		clear_action_note();
	}
}

function clear_action_note(){
	$("#table_choose_note").siblings().addClass("ng-hide");
	$("#table_choose_note").removeClass("ng-hide");
	$('#navigation-toolbar-note').addClass('ng-hide');
}

function guest_num_select_pre_page(){
	var page_val = $('#guest_num_select_page').val();
	if(page_val <= 1){
		$("#guest_num_pre_page").addClass('disabled');
		return;
	}
	
	var seat_num = $('#open-table-customer-num').val();
	page_val = parseInt(page_val) - 1;
	$("#guest_num_val_1").text((page_val-1)*5+1);
	if($("#guest_num_val_1").text()==seat_num){
		$('#guest_num_1').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_1').removeClass("active");
	}
	
	$("#guest_num_val_2").text((page_val-1)*5+2);
	if($("#guest_num_val_2").text()==seat_num){
		$('#guest_num_2').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_2').removeClass("active");
	}
	
	$("#guest_num_val_3").text((page_val-1)*5+3);
	if($("#guest_num_val_3").text()==seat_num){
		$('#guest_num_3').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_3').removeClass("active");
	}
	
	$("#guest_num_val_4").text((page_val-1)*5+4);
	if($("#guest_num_val_4").text()==seat_num){
		$('#guest_num_4').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_4').removeClass("active");
	}
	
	$("#guest_num_val_5").text((page_val-1)*5+5);
	if($("#guest_num_val_5").text()==seat_num){
		$('#guest_num_5').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_5').removeClass("active");
	}
	
	if(page_val > 0){
		$('#guest_num_select_page').val(page_val);
	}
	
}


function guest_num_select_next_page(){
	$("#guest_num_pre_page").removeClass('disabled');
	var seat_num = $('#open-table-customer-num').val();
	var page_val = $('#guest_num_select_page').val();
	page_val = parseInt(page_val) + 1;	
	$("#guest_num_val_1").text((page_val-1)*5+1);
	if($("#guest_num_val_1").text()==seat_num){
		$('#guest_num_1').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_1').removeClass("active");
	}
	$("#guest_num_val_2").text((page_val-1)*5+2);
	if($("#guest_num_val_2").text()==seat_num){
		$('#guest_num_2').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_2').removeClass("active");
	}
	$("#guest_num_val_3").text((page_val-1)*5+3);
	if($("#guest_num_val_3").text()==seat_num){
		$('#guest_num_3').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_3').removeClass("active");
	}
	$("#guest_num_val_4").text((page_val-1)*5+4);
	if($("#guest_num_val_4").text()==seat_num){
		$('#guest_num_4').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_4').removeClass("active");
	}
	$("#guest_num_val_5").text((page_val-1)*5+5);
	if($("#guest_num_val_5").text()==seat_num){
		$('#guest_num_5').addClass('active').siblings().removeClass("active");
	}else{
		$('#guest_num_5').removeClass("active");
	}
	$('#guest_num_select_page').val(page_val);
}

function set_guest_num(idvar){

	$('#guest_num_'+idvar).addClass('active').siblings().removeClass("active");
	var seat_num = $('#guest_num_val_'+idvar).text();
	$('#open-table-customer-num').val(seat_num);
	
}


//换台
function change_table() {

	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	
	var secend_table_id = $('#oper-table-2nd-table-id').val();     
	
	var parent_table_id = $('#oper-table-parent-table-id').val();
	var customer_number = $('#open-table-customer-num').val();
	//开台
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=changeTable", 
        dataType: "json",
        data: {"store_id":store_id,"parent_table_id":parent_table_id, "table_id":table_id, "dest_table_id":secend_table_id, "customer_number":customer_number},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            		$('#confirm-panel-change_table_rst_content').text('换台成功');
            		$('#confirm-panel-change-table').removeClass('ng-hide');
            		$('#change_table_rst_confirm').removeClass('ng-hide');
            		
            		//清除2nd选择信息       
            		$('#oper-table-table-id').val($('#oper-table-2nd-table-id').val());
            		$('#oper-table-table-name').val($('#oper-table-2nd-table-name').val());
            		
            		$('#oper-table-2nd-table-id').val('');
            		$('#oper-table-2nd-table-name').val('');
            		
            	}else{
            		$('#confirm-panel-change_table_rst_content').text(e.msg);
            		$('#confirm-panel-change-table').removeClass('ng-hide');
            		$('#change_table_rst_confirm').removeClass('ng-hide');	
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


//并台
function merge_table() {

	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	
	var secend_table_id = $('#oper-table-2nd-table-id').val();     
	
	var parent_table_id = $('#oper-table-parent-table-id').val();
	var customer_number = $('#open-table-customer-num').val();
	
	//开台
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=mergeTable", 
        dataType: "json",
        data: {"store_id":store_id,"parent_table_id":parent_table_id, "table_id":table_id, "dest_table_id":secend_table_id, "customer_number":customer_number},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            		$('#confirm-panel-change_table_rst_content').text('并台成功');
            		$('#confirm-panel-change-table').removeClass('ng-hide');
            		$('#change_table_rst_confirm').removeClass('ng-hide');
            		
            		//清除2nd选择信息       
            		$('#oper-table-table-id').val($('#oper-table-2nd-table-id').val());
            		$('#oper-table-table-name').val($('#oper-table-2nd-table-name').val());
            		
            		$('#oper-table-2nd-table-id').val('');
            		$('#oper-table-2nd-table-name').val('');
            		
            	}else{
            		$('#confirm-panel-change_table_rst_content').text(e.msg);
            		$('#confirm-panel-change-table').removeClass('ng-hide');
            		$('#change_table_rst_confirm').removeClass('ng-hide');	
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


function change_table_rst_confirm(){
	click_mask();
	$('#confirm-panel-change-table').addClass('ng-hide');
}

//清台
function clean_table() {

	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var parent_table_id = $('#oper-table-parent-table-id').val();
	var customer_number = $('#open-table-customer-num').val();
	//开台
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cleanTable",
        dataType: "json",
        data: {"store_id":store_id,"parent_table_id":parent_table_id, "table_id":table_id,"customer_number":customer_number},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            		getStoreTableInfo(e.data.parent_table_id);
            		$('#oper-table-oper-type').val('');
            		
            		click_mask();
            		
            		$('#oper-table-open').removeClass('ng-hide');
        			$('#oper-table-order').addClass('ng-hide');
        			$('#oper-table-clean').addClass('ng-hide');
            		
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


function open_table_and_order1() {

	$store_id = $('#oper-table-store-id').val();
	$table_id = $('#oper-table-table-id').val();

	//展示开台操作div
	$('#open-table-panel').removeClass('ng-hide');
		
}


function stringToJson(stringValue)
{
   eval("var theJsonValue = "+stringValue);
   return theJsonValue;
}

function dishList(shopid,stc_id) {
	
	 var key = getcookie('key');
	 
    $(document).ajaxStart(function() {
        showLayer(),
        $("#doc_mask").css("opacity", 0),
        loadingElement()
    }),    
    $.ajax({
        type: "GET",
        url: ApiUrl+"/index.php?act=store&op=goods_list&key=4&page=100&curpage=1&pre_order_cart=1",
        cache: !1,
        data: "store_id=" + shopid + "&stc_id=" + stc_id + "&userkey=" + key,
        success: function(result) {
        	
        	result = stringToJson(result);
        	var html = template.render('store_class_dishes', result.datas);
       	  	$("#DishesCon").html(html);
       	  	
       	  	//alert(result.datas);
            //$("#DishesCon").html(o),
       	  	 
            $("#DishesCon").scrollTop(0),
            $("#showfood").hide(),
            $("#DishesCon ul li img").each(function() {
                $(this).on("click",
                function() {
                    var e = $(this).parent(),
                    o = e.find("h3").text(),
                    t = e.find(".dishe_describe").text(),
                    i = $(this).attr("data-url"),
                    a = parseFloat(e.attr("data-half-price")),
                    r = parseFloat(e.attr("data-market-price")),
                    s = parseFloat(e.attr("data-vip-price"));
                    showLayer(),
                    $("#showfood h3").text(o),
                    $("#showfood p").text(t),
                    $("#showfood .food-price-cash").show().find("em").html(a),
                    r >= 0 ? $("#showfood .food-price-original").show().find("em").html(r) : $("#showfood .food-price-original").hide(),
                    s >= 0 ? $("#showfood .food-price-vip").show().find("em").html(s) : $("#showfood .food-price-vip").hide();
                    var d = e.attr("data-specialty");
                    0 == d ? ($("#showfood .recommended").show(), $("#showfood h3").css("padding-left", "45px")) : ($("#showfood .recommended").hide(), $("#showfood h3").css("padding-left", "10px")),
                    $("#showfood img").attr("src", i),
                    $("#showfood").show()
                })
            }),
            $("#showfood .closed").click(function() {
                hideLayer(),
                $("#showfood").hide()
            });
            if(stc_id==null){
                $("#store_all_class_" + shopid).is(".current") || $("#store_all_class_" + shopid).addClass("current").siblings().removeClass("current");
            }else{
                $("#store_sub_class_" + stc_id).is(".current") || $("#store_sub_class_" + stc_id).addClass("current").siblings().removeClass("current");
            }
            
            
            new addFood
        },
        error: function() {
            $("#tip").show().html("服务器异常，请稍后再试"),
            $("html, body").animate({
                scrollTop: 0
            },
            "fast"),
            timeOut()
        }
    }),
    $(document).ajaxStop(function() {
        hideLayer(),
        $("#doc_mask").css("opacity", .6),
        $("#loading").hide()
    })
}


function go_cart(){
	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var parent_table_id = $('#oper-table-parent-table-id').val();

	if(store_id == null || table_id == null || store_id == "" || table_id == ""){

		Zepto.sDialog({
            skin:"red",
            content: "输入店铺参数为空，请确认参数",
            okBtn:false,
            cancelBtn:false
          });
		
		return false;
		
	}
	
	window.location.href= "order.html?sid=" + store_id + "&tid=" + table_id + "&ptid=" + parent_table_id;
}

function go_checkout(){
	var store_id = $('#oper-table-store-id').val();
	var table_id = $('#oper-table-table-id').val();
	var parent_table_id = $('#oper-table-parent-table-id').val();
	var order_id = $('#oper-table-order-id').val();
	
	if(store_id == null || table_id == null || order_id == null ||
			store_id == "" || table_id == "" || order_id == ""){

		Zepto.sDialog({
            skin:"red",
            content: "输入店铺参数为空，请确认参数",
            okBtn:false,
            cancelBtn:false
          });
		return false;
		
	}
	window.location.href= "http://m.xiaoweicanting.com/ttmr/shop/wepos/dish/checkout.html?sid=" + store_id
	+ "&tid=" + table_id + "&oid=" + order_id + "&ptid=" + parent_table_id + "&type=order";
}

function add2cart(key, good_id, good_num){
    $.ajax({
       url:ApiUrl+"/index.php?act=member_pre_order_cart&op=cart_add",
       data:{key:key,goods_id:good_id,quantity:good_num},
       type:"post",
       success:function (result){
          var rData = $.parseJSON(result);
          if(checklogin(rData.login)){
            if(!rData.datas.error){
            	return true;
            }else{
              Zepto.sDialog({
                skin:"red",
                content:rData.datas.error,
                okBtn:false,
                cancelBtn:false
              });
              return false;
            }
          }
       }
    })
}

function dishBox() {

	var key = getcookie('key');//登录标记
	var add2cart_success = true;
    if(key==''){
       window.location.href = WapSiteUrl+'/tmpl/member/login.html';
    }
    

    for (var flag = $("#flag").val(), orderId = $("#orderId").val(), orderType = $("#orderType").val(), openType = $("#openType").val(), totalCount = 0, totalPrice = parseFloat($(".price1 em").html()), cookieArray = document.cookie.split("; "), i = 0; i < cookieArray.length; i++) {
        var arr = cookieArray[i].split("="),
        rege = eval("/^" + selType + "_" + SHOPID + "_.*?_.*$/");
        rege.test(arr[0]) && (totalCount += parseInt(arr[1]));
        if(rege.test(arr[0])){
        	//删除cookie
        	delCookie(arr[0]);
        }
        
    }
    
    var table_id=GetQueryString('table_id')==null?"":GetQueryString('table_id'); 
    
	window.location.href = WapSiteUrl+'/tmpl/pre_order_list.html?diancan=1'+'&table_id='+table_id;

	
    return;
}
      
function timeOut() {
    setTimeout(function() {
        $(".tip").fadeOut("slow")
    },
    2e3)
}
var EventUtil = {
    addHandler: function(e, o, t) {
        e.addEventListener ? e.addEventListener(o, t, !1) : e.attachEvent ? e.attachEvent("on" + o, t) : e["on" + o] = t
    }
}; 
   
!function() {
    EventUtil.addHandler(window, "pageshow",
    function(e) {
    })
} ();