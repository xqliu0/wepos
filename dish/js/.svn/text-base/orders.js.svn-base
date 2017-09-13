function set_menu_active(){
	$("#active-menu-id-orders").addClass("active").siblings().removeClass("active");
}
set_menu_active();

function getStoreOrderLists() {
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
				
				
				
				//$("#oper-panel").addClass("ng-hide");
				
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}
function search_by_order_type(search_type){
	reset_search_by_key();
	$order_from = 0;
	$("#"+search_type).addClass("active").siblings().removeClass("active");
	if(search_type == 'search_all'){
		$order_from = 0;
	}else if(search_type == 'search_wepos'){
		$order_from = 3;
	}else if(search_type == 'search_preorder'){
		$order_from = 6;
	}else if(search_type == 'search_delivery'){
		$order_from = 4;
	}else if(search_type == 'search_buyorder'){
		$order_from = 5;
	}else if(search_type == 'search_fastfood'){
		$order_from = 7;
	}
	$("#input-order-id").addClass("ng-hide");
	
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        data: {"order_from":$order_from},
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
				
				//$("#oper-panel").addClass("ng-hide");
				
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}


function reset_search_by_key(){
	$("#input-order-id").addClass("ng-hide");
	$("#input-table-id").addClass("ng-hide");
	$("#input-pre-order-date").addClass("ng-hide");
	$("#input-pre-delivery-date").addClass("ng-hide");
	$("#filter-order").addClass("ng-hide");
}

function search_by_key(key){
	$("#"+key).addClass("active").siblings().removeClass("active");
	reset_search_by_key();
	if(key == 'key-order-id'){
		$("#input-order-id").removeClass("ng-hide");
	}else if(key == 'key-table-id'){
		$("#input-table-id").removeClass("ng-hide");
		
	}else if(key == 'key-order-date'){
		$("#input-pre-order-date").removeClass("ng-hide");
	}else if(key == 'key-delivery-date'){
		$("#input-pre-delivery-date").removeClass("ng-hide");
	}else if(key == 'key-filter-order'){
		$("#filter-order").removeClass("ng-hide");
	}
	
	
}

function filter(){
	var order_from = $("#filter-order-order-type").val();
	var order_state = $("#filter-order-order-state").val();
	var order_pay_method = $("#filter-order-order-pay-method").val();
	var order_pay_state = $("#filter-order-order-pay-state").val();
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        data: {"order_from":order_from,"order_state":order_state,
        	"order_pay_method":order_pay_method,"order_pay_state":order_pay_state},
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
				
				//$("#oper-panel").addClass("ng-hide");
				
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}

function search(){
	$order_id = $("#inputed-order-id").val();
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        data: {"order_id":$order_id},
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
				
				//$("#oper-panel").addClass("ng-hide");
				
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}


function searchByDeliveryTime(){
	$delivery_time = $("#inputed-delivery-time").val();
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        data: {"delivery_time":$delivery_time},
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
				
				//$("#oper-panel").addClass("ng-hide");
				
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}

function choose_order(order_id,store_id,table_id,order_state,order_from){
	$("#order_item_"+order_id).addClass("active").siblings().removeClass("active");

	//查询订单信息
	getStoreOrderInfo(order_id,store_id,table_id);
}



function getStoreOrderInfo(order_id,store_id,table_id) {
	var sid = store_id;
	var tid = table_id;
	var oid = order_id;
	
	if(sid == null || tid == null || oid == null || sid == "" || tid == "" || oid == ""){

		Zepto.sDialog({
            skin:"red",
            content: "输入店铺参数为空，请确认参数",
            okBtn:false,
            cancelBtn:false
          });
		
		return false;
		
	}

	$('#selected-store-id').val(sid);
	$('#selected-table-id').val(tid);
	$('#selected-order-id').val(oid);
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getOrderInfo",
        dataType: "json",
        data: {"order_id":oid,"store_id":sid,"table_id":tid},
        success: function(e) {
            if (e) {
            	if(e.error == ""){
            		//菜品列表信息
            		var html = template.render('store_table_order_info', e.data.order_info);
    				$("#store_table_order_info_zone").html(html);
    				
    				//订单详情
    				//html = template.render('order_detail_info', e.data);
    				//$("#order-detail-info-zone").html(html);
    				
            	}         	
            	
            	
            	
            	
				
				$("#selected-order-pay-amount").val(e.data.order_info.order_amount);
				$("#selected-order-pay-remain-amount").val(e.data.order_info.order_amount);
				$("#selected-order-wepos-privilege-type").val(e.data.order_info.wepos_privilege_type);
				$("#selected-order-wepos-privilege-amount").val(e.data.order_info.wepos_privilege_amount);

				
				
				$("#order-pay-amount").text(e.data.order_info.order_amount);
				
//				//订单已经结算过
//				if(e.data.order_info.wepos_pay_state > 0){
//					var html = template.render('paid_list', {'paidArray':e.data.order_info.wepos_pay_list});
//				  	$("#pay_list_zone").html(html);
//				  	
//				  	//展示重新结算按钮
//				  	$('#submit-checkout').addClass("ng-hide disabled");
//			  		$('#submit-re-checkout').removeClass("disabled");
//			  		$('#submit-re-checkout').removeClass("ng-hide");
//				}
				
				
				
				
				/*
				//展示已经支付的信息
				if(e.data.order_info.cash_pay_amount > 0){
					$('#cash-pay-detail-amount').text(e.data.order_info.cash_pay_amount);
					$('#cash-pay-detail').removeClass("ng-hide");

					$("#cash-pay-all-detail-amount").text(e.data.order_info.cash_pay_amount);
					$('#cash-pay-all-detail').removeClass("ng-hide");
				}
				*/
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
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
				
				//$("#goods_class_"+goods_class_id).siblings().removeClass("active");
				//$("#goods_class_"+goods_class_id).addClass("active");
            }
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}

//查询餐桌已经有的购物车列表
function getStoreTableCartInfo() {
	var store_id = $('#selected-store-id').val();
	var table_id = $('#selected-table-id').val();
	
	if(store_id == null || table_id == null || store_id == "" || table_id == ""){

		Zepto.sDialog({
            skin:"red",
            content: "输入店铺参数为空，请确认参数",
            okBtn:false,
            cancelBtn:false
          });
		
		return false;
		
	}
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getTableCartInfo",
        dataType: "json",
        data: {"store_id":store_id,"table_id":table_id},
        success: function(e) {
            if (e) {
            	
            	
            	$('#table-cart-table-name').text(e.data.table_info.stc_name);
            	
            	var length = e.data.cart_info.length;
            	if(length > 0){
            		selectedGoodsArray = [];
            		selected_total_price = 0;
                	for (var i=0; i < length; i++) {
                		
                		selectedGoodsArray.push({'good_id':e.data.cart_info[i]['goods_id'],
                			'good_name':e.data.cart_info[i]['goods_name'],
                			'good_price':e.data.cart_info[i]['goods_price'],
                			'good_num':e.data.cart_info[i]['goods_num'],
                			'good_amount':parseFloat(e.data.cart_info[i]['goods_price']),
                			'good_state':1,
                			'cart_id':e.data.cart_info[i]['cart_id']});	
                		
                		selected_total_price += parseFloat(e.data.cart_info[i]['goods_price'])*parseFloat(e.data.cart_info[i]['goods_num']);
                	}
                	refreshSelectedGoods();
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





function add_good_to_cart(good_id,good_name,good_price,good_state) {
	var table_id = $('#selected-table-id').val();

	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cart_add",
        dataType: "json",
        data: {"table_id":table_id,"goods_id":good_id, "quantity":1},
        success: function(e) {     	 
        	if(e.error == ""){
        		if(e.data.cart_id != true){
        			var cart_id = e.data.cart_id;
            		selectedGoodsArray.push({'good_id':good_id,'good_name':good_name,'good_price':good_price,'good_num':1,'good_amount':parseFloat(good_price),'good_state':good_state,'cart_id':cart_id});	
                	selected_total_price += parseFloat(good_price);
                	
                	//更新选中的菜品区域
                	refreshSelectedGoods(good_id);
        		}
            	
        	}else{
        		Zepto.sDialog({
                    skin:"red",
                    content: e.msg,
                    okBtn:false,
                    cancelBtn:false
                  });
        		return false;
        	}
        },
        error: function() { 
            Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍后再试",
                okBtn:false,
                cancelBtn:false
              });
    		return false;
        }
    })
    
	return false;
}


function edit_good_cart(good_id, index, cart_id, quantity, quantity_add) {
	
	var table_id = $('#selected-table-id').val();
	
	var edit_quantity = parseInt(quantity) + 1;
	     
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cart_edit_quantity",
        dataType: "json",
        data: {"table_id":table_id,"cart_id":cart_id, "quantity":edit_quantity},
        success: function(e) {
        	if(e.error == ""){
        		var good_price = parseFloat(selectedGoodsArray[index]['good_price']);
        		selectedGoodsArray[index]['good_num'] = edit_quantity;
	    		selectedGoodsArray[index]['good_amount'] += good_price;
	    		selected_total_price += good_price;
	    		//更新选中的菜品列表区域
	    		refreshSelectedGoods(good_id);
	    		
        	}else{
        		Zepto.sDialog({
                    skin:"red",
                    content: e.msg,
                    okBtn:false,
                    cancelBtn:false
                  });
        		return false;
        	}
        },
        error: function() { 
            Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍后再试",
                okBtn:false,
                cancelBtn:false
              });
    		return false;
        }
    })
    
	return false;
}



function minus_good_cart(good_id, index, cart_id, quantity) {
	
	var table_id = $('#selected-table-id').val();
	
	var edit_quantity = parseInt(quantity) - 1;
	     
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cart_edit_quantity",
        dataType: "json",
        data: {"table_id":table_id,"cart_id":cart_id, "quantity":edit_quantity},
        success: function(e) {
        	if(e.error == ""){
        		var good_price = parseFloat(selectedGoodsArray[index]['good_price']);
        		selectedGoodsArray[index]['good_num'] = edit_quantity;
	    		selectedGoodsArray[index]['good_amount'] -= good_price;
	    		selected_total_price -= good_price;
	    		//更新选中的菜品列表区域
	    		refreshSelectedGoods(good_id);
	    		
        	}else{
        		Zepto.sDialog({
                    skin:"red",
                    content: e.msg,
                    okBtn:false,
                    cancelBtn:false
                  });
        		return false;
        	}
        },
        error: function() { 
            Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍后再试",
                okBtn:false,
                cancelBtn:false
              });
    		return false;
        }
    })
    
	return false;
}



function del_good_cart(good_id, index, cart_id, quantity) {
	
	var table_id = $('#selected-table-id').val();
	
	var edit_quantity = parseInt(quantity) - 1;
	     
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cart_edit_quantity",
        dataType: "json",
        data: {"table_id":table_id,"cart_id":cart_id, "quantity":edit_quantity},
        success: function(e) {
        	if(e.error == ""){
        		var good_price = parseFloat(selectedGoodsArray[index]['good_price']);
        		selectedGoodsArray[index]['good_num'] = edit_quantity;
	    		selectedGoodsArray[index]['good_amount'] -= good_price;
	    		selected_total_price -= good_price;
	    		//更新选中的菜品列表区域
	    		refreshSelectedGoods(good_id);
	    		
        	}else{
        		Zepto.sDialog({
                    skin:"red",
                    content: e.msg,
                    okBtn:false,
                    cancelBtn:false
                  });
        		return false;
        	}
        },
        error: function() { 
            Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍后再试",
                okBtn:false,
                cancelBtn:false
              });
    		return false;
        }
    })
    
	return false;
}


function add_good(good_id) {
	g_cart_id = 0;
    var good_name = $('#good_name_'+good_id).val();
    var good_price = $('#good_price_'+good_id).val();
    var good_state = $('#good_state_'+good_id).val();
    
    $('#order-good-clean').removeClass('ng-hide');
    $('#order-good-create').removeClass('ng-hide');
    $('#order-good-table').removeClass('ng-hide');

    var has_inserted = 0;
    var length = selectedGoodsArray.length;
    for (var i=0; i < length; i++) {
	    	if(selectedGoodsArray[i]['good_id'] == good_id){
	    		//修改购物车中的数量
	    		edit_good_cart(good_id, i, selectedGoodsArray[i]['cart_id'], selectedGoodsArray[i]['good_num'], 1);
	    		has_inserted = 1;
	    		break;
	    	}
    }
    
    if(has_inserted == 0){
    	add_good_to_cart(good_id,good_name,good_price,good_state);
    }
    
}

function refreshSelectedGoods(good_id){
	var html = template.render('selected_goods_list', {'selectedGoodsArray':selectedGoodsArray});
	$("#selected_goods_list_zone").html(html);
	
	
    $('#order-good-clean').removeClass('ng-hide');
    $('#order-good-create').removeClass('ng-hide');

	
	$('#selected_goods_total_price').text('合计: ￥'+selected_total_price);
    $('#selected_goods_total_price').removeClass('ng-hide');

    //同步关联展示右边的已经选中的菜品列表显示状态
    select_selected_good(good_id);
}

function remove_good(good_id) {
    var good_name = $('#good_name_'+good_id).val();
    var good_price = $('#good_price_'+good_id).val();
    var good_state = $('#good_state_'+good_id).val();
    
    $('#order-good-clean').removeClass('ng-hide');
    $('#order-good-create').removeClass('ng-hide');
    $('#order-good-table').removeClass('ng-hide');

    var need_remove_positon;
    var need_remove = 0;
    var length = selectedGoodsArray.length;
    for (var i=0; i < length; i++) {
	    	if(selectedGoodsArray[i]['good_id'] == good_id){
	    		if(selectedGoodsArray[i]['good_num'] > 1){
	    			//更新数据
	    			minus_good_cart(good_id, i, selectedGoodsArray[i]['cart_id'], selectedGoodsArray[i]['good_num']);
	    			
		    		break;
	    		}else if (selectedGoodsArray[i]['good_num'] == 1){
	    			
	    			clean_certain_selected_good(i, good_price, selectedGoodsArray[i]['cart_id']);
	    			break;
	    		}
	    	}
    }
}



function choose_table(store_id, parent_table_id, table_id, table_name, table_state,seat_num) {
	//对应桌台为选中样式
	$("#table_item_"+table_id).siblings().removeClass("table-active");
	$("#table_item_"+table_id).addClass("table-active");
	
	//餐桌信息初始化进操作区域
	$('#oper-table-store-id').val(store_id);
	$('#oper-table-table-id').val(table_id);
	$('#oper-table-parent-table-id').val(parent_table_id);
	$('#open-table-customer-num').val(seat_num);
	
	//展示操作列表区域
	$('#oper-table').removeClass('ng-hide');
	//空闲
	if(table_state == 0){
		$('#oper-table-open').removeClass('ng-hide');
	}
	//已开台
	if(table_state == 10){
		$('#oper-table-order').removeClass('ng-hide');
		$('#oper-table-clean').removeClass('ng-hide');
	}
	
	//展示餐桌信息和已点菜品列表区域
	$('#table-item-zone').removeClass('ng-hide');
	$('#table-item-zone-table-name').text(table_name);
	
	
	//if()
		    
		
		
}


function open_clear_table_panel() {
	//展示开台操作div
	$('#confirm-panel').removeClass('ng-hide');
	$('#confirm-panel').attr("wp-confirm-info","确定要将 大厅-T003 清台？");
	$('#confirm-panel-content').text("确定要将 大厅-T003 清台？");
	
	$('#confirm-action-yes').removeClass('ng-hide');
	$('#confirm-action-no').removeClass('ng-hide');
	
	
	
		
}

function open_table_panel() {
	//展示开台操作div
	$('#open-table-panel').removeClass('ng-hide');
		
}

function click_mask() {
	//隐藏开台操作div
	$('#open-table-panel').addClass('ng-hide');	
	$('#confirm-panel').addClass('ng-hide');
}


function cancel_open_table() {
	//隐藏开台操作div
	$('#open-table-panel').addClass('ng-hide');	
}

function get_query_condition(){
	//查询桌台列表信息
	getStoreTableInfo('all');
	getReservationDateList();
}

function getReservationDateList(){
	 $.ajax({
	        type: "GET",
	        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getReservationDateList",
	        dataType: "json",
	        success: function(e) {
	            if (e.error=="") {     
	            	var html = template.render('resvervation-date-list', e.data);
					$("#resvervation-date-list-zone").html(html);
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

function search_by_table_id(){
	$table_id = $("#table_list_zone").val();
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        data: {"table_id":$table_id},
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}

function search_by_preorder_date(){
	$pre_order_date = $("#resvervation-date-list-zone").val();
//	alert($pre_order_date);
	
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreOrderList",
        dataType: "json",
        data: {"pre_order_date":$pre_order_date},
        success: function(e) {
            if (e) {
            	//订单列表          	
            	var html = template.render('order_list', e.data);
				$("#order_list_zone").html(html);
            }
            
        },
        error: function() {
        	Zepto.sDialog({
                skin:"red",
                content: "服务器异常，请稍候再试!",
                okBtn:false,
                cancelBtn:false
              });
        }
    })
}


function getStoreTableInfo(table_class_id) {
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getTableClass",
        dataType: "json",
        data: {"table_class_id":table_class_id},
        success: function(e) {
            if (e) {  
            	var html = template.render('store_table_list', e.data);
				$("#table_list_zone").html(html);
				
				
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


function open_table_and_order() {

	$store_id = $('#oper-table-store-id').val();
	$table_id = $('#oper-table-table-id').val();

	//展示开台操作div
	$('#open-table-panel').removeClass('ng-hide');
		
}

//清空选中的菜品列表
function clean_selected_good() {
	
	//删除购物车中的数据
	if(selectedGoodsArray.length > 0){
		var store_id = $('#selected-store-id').val();
		var table_id = $('#selected-table-id').val();
		
	    $.ajax({
	        type: "GET",
	        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=delAllCartInfo",
	        dataType: "json",
	        data: {"store_id":store_id,"table_id":table_id},
	        success: function(e) {
	            if (e) {
		            	selectedGoodsArray = [];
		            	selected_total_price = 0;
		            	var html = template.render('selected_goods_list', {'selectedGoodsArray':selectedGoodsArray});
		            	$("#selected_goods_list_zone").html(html);
		            	
		            	$('#selected_goods_total_price').text('合计: ￥'+selected_total_price);
		                $('#selected_goods_total_price').addClass('ng-hide');
		                $('#selected_goods_actions').addClass('ng-hide');
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



//清空某个选中的菜品列表
function clean_certain_selected_good(need_remove_positon,good_price, cart_id) {
	
	//删除购物车中的数据
	if(selectedGoodsArray.length > 0){
		var store_id = $('#selected-store-id').val();
		var table_id = $('#selected-table-id').val();
		
	    $.ajax({
	        type: "POST",
	        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=delOneCartInfo",
	        dataType: "json",
	        data: {"cart_id":cart_id,"table_id":table_id},
	        success: function(e) {
	            if (e) {
	            	
	            		selectedGoodsArray.splice(need_remove_positon,1);
	            		selected_total_price -= parseFloat(good_price);
	            		$('#selected-selected-good-id').val("");
	            		
	            		refreshSelectedGoods();
	            		
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



function add_selected_good_to_order() {
	if(selectedGoodsArray.length < 1){
		Zepto.sDialog({
            skin:"red",
            content:'您还没有选中菜品，请选中菜品后在落单',
            okBtn:false,
            cancelBtn:false
          });
	}
	var store_id = $('#selected-store-id').val();
	var table_id = $('#selected-table-id').val();
	
	//落单
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=createOrder",
        dataType: "json",
        data: {"store_id":store_id, "table_id":table_id,"selectedGoods":selectedGoodsArray},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            	//落单成功
            	open_start_print_panel();
            	
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


function open_start_print_panel() {
	//展示开台操作div
	$('#confirm-panel').removeClass('ng-hide');
	$('#confirm-panel').attr("wp-confirm-info","落单成功，您取消打印该订单吗？");
	$('#confirm-panel-content').text("落单成功，您取消打印该订单吗？");
	
	$('#confirm-action-yes').removeClass('ng-hide');
	$('#confirm-action-no').removeClass('ng-hide');	
}




//选中已经选中的菜品列表
function select_selected_good(good_id) {

	$('#selected-selected-good-id').val(good_id);
	
	$('#selected_line_'+good_id).siblings().removeClass("active");
	$('#selected_line_'+good_id).addClass('active');
    $('#selected_goods_actions').removeClass('ng-hide');

		
}

function add_selected_good() {
	var good_id = $('#selected-selected-good-id').val();
	add_good(good_id);
	select_selected_good(good_id);
}

function remove_selected_good() {
	var good_id = $('#selected-selected-good-id').val();
	remove_good(good_id);
	select_selected_good(good_id);
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