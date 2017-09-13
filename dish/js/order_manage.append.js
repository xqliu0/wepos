//加菜
function append_good(good_id) {
	check_dish(good_id);
}

function do_append_good(good_id) {
	g_cart_id = 0;
    var good_name = $('#good_name_'+good_id).val();
    var good_price = $('#good_price_'+good_id).val();
    var good_new_price = $('#good_new_price_'+good_id).val();
    var good_state = $('#good_state_'+good_id).val();
    
    $('#order-good-clean').removeClass('ng-hide');
    $('#order-good-create').removeClass('ng-hide');
    $('#order-good-table').removeClass('ng-hide');
    
    var inOrderedGoodsArray_length = inOrderedGoodsArray.length;
    for (var i=0; i < inOrderedGoodsArray_length; i++) {
    	if(inOrderedGoodsArray[i]['good_id'] == good_id){
    		if(parseFloat(inOrderedGoodsArray[i]['good_new_price'])>0){
    			good_new_price = inOrderedGoodsArray[i]['good_new_price'];
        		good_price = inOrderedGoodsArray[i]['good_new_price'];
    		}
//    		alert(good_price);
    		break;
    	}
    }
  	if(good_new_price == 0) {
    	good_new_price = good_price;
    }
    var has_inserted = 0;
    var length = appendedGoodsArray.length;
    for (var i=0; i < length; i++) {
    	if(appendedGoodsArray[i]['good_id'] == good_id){
    		has_inserted = 1;
    		//修改已经选中的菜品中的菜品的数量    		
    		var good_price = parseFloat(appendedGoodsArray[i]['good_amount']) + parseFloat(appendedGoodsArray[i]['good_new_price']);
    		var edit_quantity = parseInt(appendedGoodsArray[i]['good_num']) + 1;
    		appendedGoodsArray[i]['good_num'] = edit_quantity;
    		appendedGoodsArray[i]['good_amount'] = p2f(good_price);
    		//更新添加的菜品列表区域
    		refreshAppendedGoods(good_id);
    		break;
    	}
    }
    
    if(has_inserted == 0){
    		//新增选中的菜品
    		appendedGoodsArray.push({'good_id':good_id,'good_name':good_name,'good_price':good_price,'good_new_price':good_new_price,'good_num':1,'good_amount':parseFloat(good_price),'good_state':good_state,'cart_id':111,'note':'','gift':'0'});	
    		//更新添加的菜品列表区域
    		refreshAppendedGoods(good_id);
    }
    
}

//检查库存
function check_dish(good_id) {
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=checkDish",
        dataType: "json",
        data: {"goods_id":good_id, "quantity":1},
        success: function(e) {     	 
        	if(e.error == ""){
        		do_append_good(good_id);
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


function change_note(){
	var good_id = $('#selected-appended-item-id').val();
	if(good_id == "" || good_id == "undefined") return;
	
    $('#store_dish_note_select_panel').removeClass('ng-hide');
    
    $("#note_id_0").removeClass('active').siblings().removeClass('active');
    $(".dish_note_item").each(function() {
    $(this).val('0');});
}

function dish_note_submit(){
	var good_id = $('#selected-appended-item-id').val();
	note_good(good_id);
}

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

//品注
function note_good(good_id) {
	var cart_good_note = "";
	$(".dish_note_item").each(function() {
		if($(this).val()=='1'){
			if (cart_good_note === "") {
                cart_good_note = $(this).attr('note');
            } else {
    			cart_good_note = cart_good_note + " " + $(this).attr('note');
            }
		}	    
	});
	
    var length = appendedGoodsArray.length;
    for (var i=0; i < length; i++) {
	    	if(appendedGoodsArray[i]['good_id'] == good_id){
	    		appendedGoodsArray[i]['note'] = cart_good_note;
	    		$('#store_dish_note_select_panel').addClass('ng-hide');
	    		//更新添加的菜品列表区域
	    		refreshAppendedGoods(good_id);
	    		break;
	    	}
    }
}



function refreshAppendedGoods(good_id){
	var html = template.render('appended_goods_list', {'appendedGoodsArray':appendedGoodsArray});
	$("#appended_goods_list_zone").html(html);
	

    //同步关联展示右边的已经选中的菜品列表显示状态
    //select_selected_good(good_id);
}

function change_active_append_item(good_id){
	//展示选中状态
	$('#appended_item_'+good_id).addClass('active').siblings().removeClass('active');
	$('#selected-appended-item-id').val(good_id);
    //显示append的item操作div
	$('#appeded-item-action').removeClass('ng-hide');
	
	$('#add_dish_note').removeClass('disabled');

	
}

function add_appended_item(){
	var good_id = $('#selected-appended-item-id').val();
	append_good(good_id);
	change_active_append_item(good_id);
}

function remove_appended_item(){
	var good_id = $('#selected-appended-item-id').val();
	remove_appended_good(good_id);
	change_active_append_item(good_id);
}


function remove_appended_good(good_id) {

    var length = appendedGoodsArray.length;
    for (var i=0; i < length; i++) {
	    	if(appendedGoodsArray[i]['good_id'] == good_id){
	    		if(appendedGoodsArray[i]['good_num'] > 1){
	    			//更新数据
	    			var good_price = parseFloat(appendedGoodsArray[i]['good_price']);
	    			appendedGoodsArray[i]['good_num'] = parseInt(appendedGoodsArray[i]['good_num']) - 1;
	    			appendedGoodsArray[i]['good_amount'] -= good_price;
		    		break;
		    		
	    		}else if (appendedGoodsArray[i]['good_num'] == 1){
	    			
	    			appendedGoodsArray.splice(i,1);
	    			$('#selected-appended-item-id').val('');
	    			break;
	    			
	    		}
	    	}
    }
    
    refreshAppendedGoods(good_id);
}


function confirm_append_item(){
	if(appendedGoodsArray.length > 0){
		var html = template.render('confirm_appended_item_list', {'appendedGoodsArray':appendedGoodsArray});
		$("#confirm_appended_item_list_zone").html(html);	
		$('#confirm_append_item_panel').removeClass('ng-hide');
	}
}

function submit_appended_item(){
	
if(appendedGoodsArray.length > 0){
	 var order_id = $("#oper-table-order-id").val();
	 var store_id = $("#oper-table-store-id").val();
	 var table_id = $("#oper-table-table-id").val();

	 //加菜提交
	$.ajax({
	        type: "POST",
	        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=appendDishItem",
	        dataType: "json",
	        data: {"store_id":store_id, "table_id":table_id, "order_id":order_id, "appended_item":appendedGoodsArray},
	        success: function(e) {
	            if (e) {
	            	if(e.error==''){
	            		$('#confirm_append_item_panel').addClass('ng-hide');
	            		$('#append-item-rst-confirm').removeClass('ng-hide');
	            		//更新选中需要添加的菜品列表
	            		appendedGoodsArray = [];
	            		refreshAppendedGoods();
	            		
	            		//更新订单菜品数据
	            		get_ordered_dish_list(order_id, store_id, table_id);
	            		
	            		//更新面板
	            		//纪录对应的订单id号信息
	                //$("#oper-table-order-id").val(e.data.order_id);
	                
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







