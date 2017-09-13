function set_menu_active(){
	$("#active-menu-id-deliver").addClass("active").siblings().removeClass("active");
}
set_menu_active();


function getStoreDishNoteInfo() {
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreDishNoteInfo",
        dataType: "json",
        success: function(e){
            if (e) {
            	            	
            	var html = template.render('store_dish_note', e.data);
				$("#store_dish_note_zone").html(html); 
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


function change_note(){
	var good_id = $('#selected-selected-good-id').val();
	if(good_id == "" || good_id == "undefined") return;
	
    $('#store_dish_note_select_panel').removeClass('ng-hide');
    
    $("#note_id_0").removeClass('active').siblings().removeClass('active');
    $(".dish_note_item").each(function() {
    $(this).val('0');});
}

function dish_note_select(note_id) {
	var note_select_state = $('#note_state_'+note_id).val();
	if(note_select_state == '0'){
		$('#note_id_'+note_id).addClass('active');
		$('#note_state_'+note_id).val('1');
	}
	else if(note_select_state == '1'){
		$('#note_id_'+note_id).removeClass('active');
		$('#note_state_'+note_id).val('0');
	}
}

function getStoreGoodsSalesInfo(timespan) {
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreGoodsSalesInfo",
        dataType: "json",
        data: {"timespan":timespan},
        success: function(e) {
            if (e) {     
            	var html = template.render('store_goods_list', e.data);
				$("#goods_list_zone").html(html);
				
				//记录查询的菜品列表结果
				storeGoodArray = [];
				storeGoodArray = e.data.goods_list;
				filteredStoreGoodArray = [];

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


function filter_goods(){
	
	var filter_var =  $("#delivery-filter-var").val();
	if(filter_var != ""){
		filteredStoreGoodArray = [];
		 var length = storeGoodArray.length;
	     for (var i=0; i < length; i++) {
	    	 
	    	// alert(filter_var );
	    	// alert(storeGoodArray[i].goods_name );
	    	 
	    	 if(storeGoodArray[i].goods_name.indexOf(filter_var)>=0){
	    		 filteredStoreGoodArray.push(storeGoodArray[i]);
	    	 }
	     }
	     //alert(filteredStoreGoodArray.length );
	     if(filteredStoreGoodArray.length > 0){
			 var html = template.render('store_goods_list', {'goods_list':filteredStoreGoodArray});
			 $("#goods_list_zone").html(html);
	     }
	     filteredStoreGoodArray = [];
	}else{
		
		var html = template.render('store_goods_list', {'goods_list':storeGoodArray});
		 $("#goods_list_zone").html(html);
	}
	
}



//查询餐桌已经有的购物车列表
function getStoreTableCartInfo() {
	var store_id = $('#selected-store-id').val();
	var table_id = $('#selected-table-id').val();
	
	if(store_id == null || table_id == null || store_id == "" || table_id == ""){

		Zepto.sDialog({
            skin:"red",
            content: "输入店铺参数为空，请确认参数--1",
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
                			'note':e.data.cart_info[i]['note'],
                			'gift':e.data.cart_info[i]['gift'],
                			'gift_reason':e.data.cart_info[i]['gift_reason'],
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
    
    $('#order-good-delivery-info').removeClass('ng-hide');
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



function add_delivery_info(){
	$("#delivery-info-panel").removeClass('ng-hide');
}

function set_delivery_info(){
	var user_phone = $("#delivery-address-phone").val();
	var user_name = $("#delivery-address-name").val();
	var user_place = $("#delivery-address-place").val();
	var user_time = $("#deliveryDateTime").val();
	var user_note = $("#delivery-address-note").val();
	
	deliveryAddressInfo = [];
	deliveryAddressInfo.push({'user_phone':user_phone,
		 'user_name':user_name,
		 'user_place':user_place,
		 'user_time':user_time,
		 'user_note':user_note});
	
	var html = template.render('delivery-address-info', {'deliveryAddressInfo':deliveryAddressInfo});
	$("#delivery-address-info-zone").html(html);
	$("#delivery-info-panel").addClass('ng-hide');
    
	if(user_phone != "" && user_name != "" && user_place != ""){
		$("#order-good-create").removeClass('disabled');
	}
}



function refreshSelectedGoods(good_id){
	var html = template.render('selected_goods_list', {'selectedGoodsArray':selectedGoodsArray});
	$("#selected_goods_list_zone").html(html);
	
	
	$('#order-good-delivery-info').removeClass('ng-hide');
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
    
	$('#order-good-delivery-info').removeClass('ng-hide');
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
	$('#delivery-info-panel').addClass('ng-hide');
    $('#store_dish_note_select_panel').addClass('ng-hide');

}

function dish_note_submit(){
	var good_id = $('#selected-selected-good-id').val();
	add_good_note(good_id);
}


function add_good_note(good_id) {

    var length = selectedGoodsArray.length;
    for (var i=0; i < length; i++) {
	    	if(selectedGoodsArray[i]['good_id'] == good_id){
	    		//修改购物车中的数量
	    		add_cart_good_note(good_id, i, selectedGoodsArray[i]['cart_id']);
	    		break;
	    	}
    }
    
}


function add_cart_good_note(good_id, index, cart_id) {
	
	var table_id = $('#selected-table-id').val();
	var cart_good_note = "";
	$(".dish_note_item").each(function() {
		if($(this).val()=='1'){
			cart_good_note = cart_good_note + " " + $(this).attr('note');
		}	    
	});
	
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cart_edit_note",
        dataType: "json",
        data: {"table_id":table_id,"cart_id":cart_id, "note":cart_good_note},
        success: function(e) {
        	if(e.error == ""){
        		
        		//关闭选择品注浮层
        		$('#store_dish_note_select_panel').addClass('ng-hide');
        		getStoreTableCartInfo();
	    		
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



function cancel_open_table() {
	//隐藏开台操作div
	$('#open-table-panel').addClass('ng-hide');	
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
		return false;
	}
	
	if(deliveryAddressInfo.length < 1 
			||deliveryAddressInfo[0].user_phone == ""
			||deliveryAddressInfo[0].user_name == ""
				||deliveryAddressInfo[0].user_time == ""
			||deliveryAddressInfo[0].user_place == ""){
		Zepto.sDialog({
            skin:"red",
            content:'您还没有输入下单信息，请输入下单信息',
            okBtn:false,
            cancelBtn:false
          });
		return false;
	}
	
	var store_id = $('#selected-store-id').val();
	var table_id = $('#selected-table-id').val();
	
	//落单
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=createDeliveryOrder",
        dataType: "json",
        data: {"store_id":store_id, "table_id":table_id,"selectedGoods":selectedGoodsArray,"deliveryAddressInfo":deliveryAddressInfo},
        success: function(e) {
            if (e) {
            	if(e.error==''){
            	//落单成功
//            		alert(e.data.order_id);
            		window.location.href = 'http://m.xiaoweicanting.com/ttmr/shop/wepos/dish/checkout.html?sid='+store_id+'&tid='+table_id+'&oid='+e.data.order_id;
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
    
    if(parseInt(good_id)>0){
    		$('#id-change-note').removeClass('disabled');
    }
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