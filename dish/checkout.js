$(function(){
    $('#cash-pay-panel-paid-amount-input').bind('input propertychange', function() {  
        var paid_money = $("#cash-pay-panel-paid-amount-input").val();
        if(isNaN(paid_money)){
		  	alert("请填写数字！");
		  	$("#cash-pay-panel-paid-amount-input").val("");
		}else{
			var total_money = $('#cash-pay-panel-total-amount').val();
			var paid_exchange = parseFloat(paid_money) - parseFloat(total_money);
			paid_exchange = p2f(paid_exchange);
			if(paid_exchange >= 0){
				$('#cash-pay-panel-paid-amount-exchange').text(paid_exchange);
				$('#cash-pay-panel-paid-amount-exchange').val(paid_exchange);
				$('#cash-pay-panel-confirm').removeClass("disabled");
			}else{
				$('#cash-pay-panel-paid-amount-exchange').text(0);
				$('#cash-pay-panel-paid-amount-exchange').val(0);
				$('#cash-pay-panel-confirm').addClass("disabled");
			}
		}
    });  
    $('#cash-pay-panel-paid-amount-input').bind('change', function() {  
        var paid_money = $("#cash-pay-panel-paid-amount-input").val();
        $('#cash-pay-panel-paid-amount-input').val(p2f(paid_money));
    });
});


function getStoreTableOrderInfo() {
	var sid = GetQueryString("sid");
	var tid = GetQueryString("tid");
	var ptid = GetQueryString("ptid");
	var oid = GetQueryString("oid");
	
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
	$('#selected-parent-table-id').val(ptid);
	
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getOrderInfo",
        dataType: "json",
        data: {"order_id":oid,"store_id":sid,"table_id":tid},
        success: function(e) {
            if (e) {
            	var html = template.render('store_table_order_info', e.data.order_info);
				$("#store_table_order_info_zone").html(html); 
				
				$("#selected-order-pay-amount").val(e.data.order_info.order_amount);
				$("#selected-order-pay-remain-amount").val(p2f(e.data.order_info.order_amount));
				$("#selected-order-pay-original-amount").val(e.data.order_info.original_order_amount);

				$("#wepos_pay_state").val(e.data.order_info.wepos_pay_state);
				
				$("#selected-order-wepos-privilege-type").val(e.data.order_info.wepos_privilege_type);
				$("#selected-order-wepos-privilege-amount").val(e.data.order_info.wepos_privilege_amount);
				
				if(e.data.order_info.wepos_privilege_type == 1
					|| e.data.order_info.wepos_privilege_type == 0){
					//权限折扣
				  	$('#privilege_discount_row').removeClass("ng-hide");
				  	$('#privilege_discount').removeClass("ng-hide");
				  	$('#privilege_discount').text(p2f(e.data.order_info.wepos_privilege_discount)/10 + ' 折');
					if(e.data.order_info.wepos_privilege_discount == 0){
						$('#privilege_discount_clear').addClass("ng-hide");
					}
					$("#pre-amount-qxdz").text(e.data.order_info.original_order_amount);
					$("#pro-amount-qxdz").text(e.data.order_info.original_order_amount);
				}else if(e.data.order_info.wepos_privilege_type == 2){
					//权限减免
				  	$('#privilege_reduction_row').removeClass("ng-hide");
				  	$('#privilege_reduction').removeClass("ng-hide");
				  	$('#privilege_reduction').text('-￥ ' + e.data.order_info.wepos_privilege_amount);
					
					//初始化左边栏
					$("#pre-amount-qxjm").text(e.data.order_info.original_order_amount);
					$("#pro-amount-qxjm").text(e.data.order_info.original_order_amount);
					$('#sp-qxjm').addClass("active").siblings().removeClass("active");
					$('#sp-content-qxjm').removeClass("ng-hide");
					$('#sp-content-qxdz').addClass("ng-hide");
				}else if(e.data.order_info.wepos_privilege_type == 3){
					//权限免单
				  	$('#privilege_freeorder_row').removeClass("ng-hide");
				  	$('#privilege_freeorder').removeClass("ng-hide");

				  	//初始化左边栏
				  	$('#sp-qxmd').addClass("active").siblings().removeClass("active");
					$('#sp-content-qxmd').removeClass("ng-hide");
					$('#sp-content-qxdz').addClass("ng-hide");

					//权限免单可以直接提交
					$('#submit-checkout').removeClass("ng-hide disabled");
					$('#submit-checkout').addClass("primary");
				}
				$("#order-pay-amount").text(p2f(e.data.order_info.order_amount));
				//抹零
				if(e.data.order_info.wepos_moling > 0){
					$('#moling').addClass("ng-hide");
				  	$('#cancel-moling').removeClass("ng-hide");
				}else{
					$('#moling').removeClass("ng-hide");
					$('#cancel-moling').addClass("ng-hide");
				}
				//订单已经结算过
				if(e.data.order_info.wepos_pay_state > 0){
					var html = template.render('paid_list', {'paidArray':e.data.order_info.wepos_pay_list});
				  	$("#pay_list_zone").html(html);
				  	
				  	//展示重新结算按钮
				  	$('#submit-checkout').addClass("ng-hide disabled");
			  		$('#submit-re-checkout').removeClass("disabled");
			  		$('#submit-re-checkout').removeClass("ng-hide");
			  		if(e.data.order_info.wepos_pay_state == 20){
			  			$('#submit-checkout').addClass("ng-hide disabled");
				  		$('#submit-re-checkout').addClass("ng-hide disabled");
			  		}
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

var scan_intervalId= '';
var wxpay_result_query_intervalId= '';

function cancel_privi_confirm(pri_type){
	var pay_state = $("#wepos_pay_state").val();
	if (pay_state != 0) {
		return;
	}
	$("#cancel-privilege-confirm-panel").removeClass("ng-hide");
	var promoteText = "";
	if(pri_type == 'qxdz'){
		promoteText = "确定取消权限打折";
	}else if(pri_type == 'qxjm'){
		promoteText = "确定取消权限减免";
	}else if(pri_type == 'qxmd'){
		promoteText = "确定取消权限免单";
	}
	if($("#wepos_pay_state").val() > 0){
		promoteText += "并重新结算？"
	}else{
		promoteText += "？"
	}
	$("#cancel-privilege-confirm-note").text(promoteText);
}

function cancel_privilege_discount(){
	var sid = $('#selected-store-id').val();
	var tid = $('#selected-table-id').val();
	var oid = $('#selected-order-id').val();
	var clearPay = false;
	if($("#wepos_pay_state").val() > 0){
		clearPay = true;
	}
    $.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=cancelPrivilege",
        dataType: "json",
        data: {"order_id":oid,"store_id":sid,"table_id":tid,"clear_pay":clearPay},
        success: function(e) {
            if (e.error == "") {
            	location.reload();
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

function toggle_menu_key(sp_name){
	var pay_state = $("#wepos_pay_state").val();
	if (pay_state != 0) {
		return;
	}
	
	var privilege_type = $("#selected-order-wepos-privilege-type").val();	
	if(privilege_type > 0){
		$("#note-panel").removeClass("ng-hide");
		return false;
	}
	
	var pay_amount = $("#selected-order-pay-original-amount").val();
	if(sp_name == "qxdz" || sp_name == "qxjm" || sp_name == "qxmd"){
		$("#pre-amount-"+sp_name).text(pay_amount);
		$("#pro-amount-"+sp_name).text(pay_amount);
	}
	
	var pre_sp_name = $('#selected-sp-id').val();
	if(pre_sp_name == sp_name){
		return;
	}
	$('#selected-sp-id').val(sp_name);
	$('#sp-'+sp_name).addClass("active").siblings().removeClass("active");
	$('#sp-content-'+sp_name).removeClass("ng-hide");
	$('#sp-content-'+pre_sp_name).addClass("ng-hide");
}

function add_privilege(pri_type){
	
	var pay_amount = $("#selected-order-pay-original-amount").val();

	if(pri_type == "qxdz"){
		if("" == $('#input-'+pri_type).val()){
			$('#confirm-'+pri_type).addClass("disabled");
			return;
		}
		var privilege_amount = $('#input-'+pri_type).val().substring(0,2);
		$('#input-'+pri_type).val(privilege_amount);
		
		var remain_amount = parseFloat(pay_amount)*(parseFloat(privilege_amount)/100);
		$("#pro-amount-"+pri_type).text(p2f(remain_amount));
		
		$('#confirm-'+pri_type).removeClass("disabled");
	}else if(pri_type == "qxjm"){
		if("" == $('#input-'+pri_type).val()){
			$('#confirm-'+pri_type).addClass("disabled");
			return;
		}
		var privilege_amount = $('#input-'+pri_type).val();
		var remain_amount = parseFloat(pay_amount) - parseFloat(privilege_amount);
		if(remain_amount < 0){
			$('#input-'+pri_type).val(pay_amount);
			remain_amount = 0;
		}
		$("#pro-amount-"+pri_type).text(p2f(remain_amount));
		
		$('#confirm-'+pri_type).removeClass("disabled");
	}
}

var molingAction = 0;
function moling(action){
	var pay_state = $("#wepos_pay_state").val();
	if (pay_state != 0) {
		return;
	}
	if(action == true){
		molingAction = 1;
	}
	if($("#wepos_pay_state").val() > 0){
		var promoteText = "确定抹零并重新结算？";
		if(!action){
			promoteText = "确定撤销抹零并重新结算？";
		}
		$("#moling-change-confirm-note").text(promoteText);
		$("#moling-change-confirm-panel").removeClass("ng-hide");
	}else{
		callMolingService(false);
	}
}

function callMolingService(clearPay){
	var sid = $('#selected-store-id').val();
	var tid = $('#selected-table-id').val();
	var oid = $('#selected-order-id').val();
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=submitMoLing",
        dataType: "json",
        data: {"order_id":oid,"store_id":sid,"table_id":tid,"moling":molingAction,"clear_pay":clearPay},
        success: function(e) {
            if (e) {
            	location.reload();
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

var pri_type;
function discount_submit(type){
	var pay_state = $("#wepos_pay_state").val();
	if (pay_state != 0) {
		return;
	}
	pri_type = type;
	$("#selected-order-wepos-privilege-type").val(pri_type);
	if($("#wepos_pay_state").val() > 0){
		var promoteText = "";
		if(pri_type == 'qxdz'){
			promoteText = "确定权限打折并重新结算？";
		}else if(pri_type == 'qxjm'){
			promoteText = "确定权限减免并重新结算？";
		}else if(pri_type == 'qxmd'){
			promoteText = "确定权限免单并重新结算？";
		}
		$("#discount-confirm-note").text(promoteText);
		$("#discount-confirm-panel").removeClass("ng-hide");
	}else{
		call_discout_submit_service(false);
	}
}

function call_discout_submit_service(clearPay){
	if(pri_type == "qxdz" || pri_type == "qxjm"){
		if("" == $('#input-'+pri_type).val().trim()){
			return;
		}
		var privilege_discount = $('#input-'+pri_type).val().substring(0,2);
		var pay_amount = $("#selected-order-pay-amount").val();
		var pri_amount = $("#pro-amount-"+pri_type).text();
	}else if (pri_type == "qxmd"){
		var privilege_discount = 100;
		var pay_amount = $("#selected-order-pay-amount").val();
		var pri_amount = 0;
	}
	
	var sid = $('#selected-store-id').val();
	var tid = $('#selected-table-id').val();
	var oid = $('#selected-order-id').val();
	
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=submitDiscount",
        dataType: "json",
        data: {"order_id":oid,"store_id":sid,"table_id":tid,
        	"pri_type":pri_type,"pri_discount":privilege_discount,"pri_amount":pri_amount,"clear_pay":clearPay},
        success: function(e) {
            if (e) {
            	location.reload();
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

function select_pay_method_name(method){
	var remain_amount = $("#selected-order-pay-remain-amount").val();
	if (remain_amount == 0) {
		return;
	}
	var pay_state = $("#wepos_pay_state").val();
	if (pay_state != 0) {
		return;
	}
	if(method == 'cash'){
		$('#selected-order-pay-method').val('cash');
		$('#pay-money-amount-panel').removeClass("ng-hide");
		$('#pay-method').text('现金');
		$('#pay-method-amount').val($("#selected-order-pay-remain-amount").val());		
	}else if(method == 'bank_card'){
		$('#selected-order-pay-method').val('bank_card');
		$('#pay-money-amount-panel').removeClass("ng-hide");
		$('#pay-method').text('银行卡');
		$('#pay-method-amount').val($("#selected-order-pay-remain-amount").val());		
	}else if(method == 'wx_pay'){
		$('#selected-order-pay-method').val('wx_pay');
		$('#pay-money-amount-panel').removeClass("ng-hide");
		$('#pay-method').text('微信刷卡支付');
		$('#pay-method-amount').val($("#selected-order-pay-remain-amount").val());		
	}else if(method == 'wx_sm_pay'){
		$('#selected-order-pay-method').val('wx_sm_pay');
		$('#pay-money-amount-panel').removeClass("ng-hide");
		$('#pay-method').text('微信扫码支付');
		$('#pay-method-amount').val($("#selected-order-pay-remain-amount").val());		
	}else if(method == '_member_card'){
		$('#selected-order-pay-method').val('member_card');
		$('#pay-money-amount-panel').removeClass("ng-hide");
		$('#pay-method').text('会员卡');
		$('#pay-method-amount').val($("#selected-order-pay-remain-amount").val());		
	}
	 
}

function removePayDetailArray(index){
	var amount = payDetailArray[index]['amount'];
	var remain_amount = $('#selected-order-pay-remain-amount').val();
	
	remain_amount = parseFloat(remain_amount) + parseFloat(amount);
	$('#selected-order-pay-remain-amount').val(p2f(remain_amount));
	
	payDetailArray.splice(index, 1);
	refreshPayDetail();
}


function get_pay_method_name(method){
	if(method == "cash") return "现金";
	if(method == "bank_card") return "银行卡";
	if(method == "member_card") return "会员卡";
	if(method == "wx_pay") return "微信刷卡支付";
	if(method == "wx_sm_pay") return "微信扫码支付";
	return "";
}

function submit_pay_amount(){
	var method = $('#selected-order-pay-method').val();
	var amount = $('#pay-method-amount').val();
		
	if(amount == 0){
		$('#pay-money-amount-panel').addClass("ng-hide");
		//return false;
	}
	
	var method_name = get_pay_method_name(method);
	
	var ramin_amount = $('#selected-order-pay-remain-amount').val();
	
	if(parseInt(amount) > parseInt(ramin_amount)){
		alert('支付金额超过了订单总金额！');
		return false;
	}
	var len = payDetailArray.length;
	if(len == 0){
		payDetailArray.push({'method':method,'method_name':method_name,'amount':amount});
	}else{
		var index = 1;
        for (var i=0; i < len; i++) {
        	if(payDetailArray[i]['method'] == method){
        		payDetailArray[i]['amount'] = parseFloat(payDetailArray[i]['amount']) + parseFloat(amount);
        		break;
        	}
        	index ++;
        }
        
        if(index > len){
        	payDetailArray.push({'method':method,'method_name':method_name,'amount':amount});
        }
	}
	
	ramin_amount = parseFloat(ramin_amount) - parseFloat(amount);
	$('#selected-order-pay-remain-amount').val(p2f(ramin_amount));
	
	//关闭panel
	$('#pay-money-amount-panel').addClass("ng-hide");

	//刷新列表区
	refreshPayDetail();
	
}

function refreshPayDetail(){
	if(payDetailArray.length > 0){
		var html = template.render('pay_list', {'payDetailArray':payDetailArray});
	  	$("#pay_list_zone").html(html);
	  	
	  	var ramin_amount = $('#selected-order-pay-remain-amount').val();
	  	var need_pay_amount = $('#selected-order-pay-amount').val();
	  	var pay_amount = p2f(parseFloat(need_pay_amount) - parseFloat(ramin_amount));

	  	$("#cash-pay-all-detail-amount").text(pay_amount);
		$('#cash-pay-all-detail').removeClass("ng-hide");
	
		var ramin_amount = $('#selected-order-pay-remain-amount').val();
		//alert(ramin_amount);
		if(ramin_amount == 0){
			$('#submit-checkout').removeClass("disabled");
			$('#submit-checkout').addClass("primary");
		}else{
			$('#submit-checkout').removeClass("primary");
			$('#submit-checkout').addClass("disabled");
		}
	}else{
		var html = template.render('pay_list', {'payDetailArray':payDetailArray});
	  	$("#pay_list_zone").html(html);
	  	
	  	var ramin_amount = $('#selected-order-pay-remain-amount').val();
	  	var need_pay_amount = $('#selected-order-pay-amount').val();
	  	
	  	var pay_amount = p2f(parseFloat(need_pay_amount) - parseFloat(ramin_amount));

	  	$("#cash-pay-all-detail-amount").text(pay_amount);
		$('#cash-pay-all-detail').addClass("ng-hide");
	
		var ramin_amount = $('#selected-order-pay-remain-amount').val();
		//alert(ramin_amount);
		
		if(ramin_amount == 0){
			$('#submit-checkout').removeClass("disabled");
			$('#submit-checkout').addClass("primary");
		}else{
			$('#submit-checkout').removeClass("primary");
			$('#submit-checkout').addClass("disabled");
		}
		
		//展示重新结算按钮
	  	$('#submit-re-checkout').addClass("ng-hide disabled");
	  	$('#submit-checkout').addClass("disabled");
  		$('#submit-checkout').removeClass("ng-hide");
	}
}

function checkout(){
	if($("#wepos_pay_state").val()==20){
		return;
	}
	
	var ramin_amount = $('#selected-order-pay-remain-amount').val();
	if(ramin_amount > 0){
		return;
	}

	//免单直接提交
	if($("#selected-order-wepos-privilege-type").val() == 3){
		$amount = $("#selected-order-pay-original-amount").val();
		$("#free-charge-confirm-panel").removeClass("ng-hide");
		$("#free-charge-confirm-note").text("当前桌台共消费￥" + $amount + "确认免单？");
		
		return;
	}
	
	if(payDetailArray.length > 0){
		var sid = $('#selected-store-id').val();
		var tid = $('#selected-table-id').val();
		var oid = $('#selected-order-id').val();
		$.ajax({
	        type: "POST",
	        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=submitCheckout",
	        dataType: "json",
	        data: {"order_id":oid,"store_id":sid,"table_id":tid, "payDetailArray":payDetailArray},
	        success: function(e) {
	            if (e) {
	            	location.reload();
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
	
}
var spinner;
function start_wait(){
	var spinnerOpts = {
		    lines: 9, // 共有几条线组成
		    length: 0, // 每条线的长度
		    width: 15, // 每条线的粗细
		    radius: 20, // 内圈的大小
		    corners: 1, // 圆角的程度
		    rotate: 0, // 整体的角度（因为是个环形的，所以角度变不变其实都差不多）
		    color: '#44b549', // 颜色 #rgb 或 #rrggbb
		    speed: 1, // 速度：每秒的圈数
		    trail: 34, // 高亮尾巴的长度
		    shadow: false, // 是否要阴影
		    hwaccel: false, // 是否用硬件加速
		    className: 'spinner', // class的名字
		    zIndex: 7, // z-index的值 2e9（默认为2000000000）
		    top: '50%', // 样式中的top的值（以像素为单位，写法同css）
		    left: '50%' // 样式中的left的值（以像素为单位，写法同css）
		};
		var target = document.getElementById('img_wait');
		spinner = new Spinner(spinnerOpts).spin(target);
}

var wx_sm_pay_spinner;
function wx_sm_pay_start_wait(){
	var spinnerOpts = {
		    lines: 9, // 共有几条线组成
		    length: 0, // 每条线的长度
		    width: 15, // 每条线的粗细
		    radius: 20, // 内圈的大小
		    corners: 1, // 圆角的程度
		    rotate: 0, // 整体的角度（因为是个环形的，所以角度变不变其实都差不多）
		    color: '#44b549', // 颜色 #rgb 或 #rrggbb
		    speed: 1, // 速度：每秒的圈数
		    trail: 34, // 高亮尾巴的长度
		    shadow: false, // 是否要阴影
		    hwaccel: false, // 是否用硬件加速
		    className: 'spinner', // class的名字
		    zIndex: 7, // z-index的值 2e9（默认为2000000000）
		    top: '50%', // 样式中的top的值（以像素为单位，写法同css）
		    left: '50%' // 样式中的left的值（以像素为单位，写法同css）
		};
		var target = document.getElementById('wx-sm-pay-panel');
		wx_sm_pay_spinner = new Spinner(spinnerOpts).spin(target);
}



function change_pay_item_to_paid(wepos_pay_id, pay_code, pay_amount){
	$('#confirm-pay-wepos-pay-id').val(wepos_pay_id);
	$('#confirm-pay-code').val(pay_code);
	
	var pay_name = "";
	if(pay_code == "bank_card"){
		pay_name = "银行卡";
		var note = "确认支付: "+ pay_name + " " + pay_amount;
		$('#confirm-pay-panel-content').text(note);
		$('#confirm-pay-panel').removeClass("ng-hide");
		
		$('#cash-pay-panel-paid-amount-input').val(pay_amount);
	}else if(pay_code == "cash"){
		pay_name = "现金";
		
		
		$('#cash-pay-panel-total-amount').val(pay_amount);
		
		$('#cash-pay-panel').removeClass("ng-hide");
		$('#cash-pay-panel-amount').text(pay_amount);
		
		
	}else if(pay_code == "wx_pay"){
		pay_name = "微信刷卡支付";
		
		
		$('#wx-pay-panel-total-amount').val(pay_amount);
		
		$('#wx-pay-panel').removeClass("ng-hide");
		
		var wepos_store_name = $('#wepos_store_name').text();
		var checkout_table_name = $('#checkout_table_name').text();
		var good_name = wepos_store_name+'-'+checkout_table_name;
		$('#wx-pay-panel-good-name').text(good_name);	
		$('#wx-should-pay-panel-amount').text(pay_amount);
		$('#wx-pay-panel-amount').text(pay_amount);
		$('#wx-pay-panel-paid-code').val('');
//		$('#wx_scan_pay_note').text('');
		$('#wx-pay-panel-paid-code').focus();
		//启动timer	
		
//		i.match(/^\d{7,18}$/) 
		scan_intervalId=setInterval(function(){
			
			var wx_pay_scan_code = $('#wx-pay-panel-paid-code').val();
			if(wx_pay_scan_code.match(/^\d{7,18}$/)){
				clearInterval(scan_intervalId);
				start_wait();
				//发送微信支付刷卡请求
				wxScancardPay(good_name, pay_amount, wx_pay_scan_code);
			}
			},1000);

	}else if(pay_code == "wx_sm_pay"){
		pay_name = "微信扫码支付";
		
		$('#wx-sm-pay-panel-total-amount').val(pay_amount);
		//启动timer	
		wxSMPay();
		
	}
	
}

function wxScancardPay(good_name,pay_amount,scan_code){
	
	var wepos_pay_id = $('#confirm-pay-wepos-pay-id').val();
	var pay_code = $('#confirm-pay-code').val();
	var order_id = $('#selected-order-id').val();
	
	var paid_money = $('#cash-pay-panel-paid-amount-input').val();
	var exchange_money = $('#cash-pay-panel-paid-amount-exchange').val();
	
	var tid = $('#selected-table-id').val();  
        
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=wxpayScancard",
        dataType: "json",
        data: {"auth_code":scan_code,"good_name":good_name, "pay_amount":pay_amount,"order_id":order_id,"table_id":tid, "wepos_pay_id":wepos_pay_id,"pay_code":pay_code, "paid_money":paid_money, "exchange_money":exchange_money},
        success: function(e) {
        	spinner.stop();
        	
        		if(e.result == true){
        			$('#wx_scan_pay_note').text('支付成功！');
        			var sid = $('#selected-store-id').val();
            		var tid = $('#selected-table-id').val();
            		var ptid = $('#selected-parent-table-id').val();
            		var oid = $('#selected-order-id').val();
            		
            		window.location.href= "checkout.html?sid=" + sid + "&tid=" + tid 
            		+ "&ptid=" + ptid + "&oid=" + oid;

        		}else{
        			$('#wx_scan_pay_note').text(e.error);
        		}
        },
        error: function() {
        	spinner.stop();
            $("#tip").show().html("服务器异常，请稍后再试");
        }
    })
}




function wxSMPay(){
	
	var pay_amount = $('#wx-sm-pay-panel-total-amount').val();
	var wepos_store_name = $('#wepos_store_name').text();
	var checkout_table_name = $('#checkout_table_name').text();
	var good_name = wepos_store_name+'-'+checkout_table_name;
	
	var wepos_pay_id = $('#confirm-pay-wepos-pay-id').val();
	var pay_code = $('#confirm-pay-code').val();
	var order_id = $('#selected-order-id').val();
	
	var paid_money = $('#cash-pay-panel-paid-amount-input').val();
	var exchange_money = $('#cash-pay-panel-paid-amount-exchange').val();
	
	var tid = $('#selected-table-id').val();
	$('#wx-sm-pay-panel').removeClass("ng-hide");
	wx_sm_pay_start_wait();
    
	$('#wx-sm-pay-result').text('微信扫码支付结果：');

	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=wxSMPay",
        dataType: "json",
        data: {"good_name":good_name, "pay_amount":pay_amount,"order_id":order_id,"table_id":tid, "wepos_pay_id":wepos_pay_id,"pay_code":pay_code, "paid_money":paid_money, "exchange_money":exchange_money},
        success: function(e) {
//        	spinner.stop();
        	
        		if(e.result == true){        			
        			$('#wx-sm-pay-qcode').attr("src",e.data.url2);
        			wx_sm_pay_spinner.stop();
        			
        		}else{
        			alert(e.error);
        			wx_sm_pay_spinner.stop();
        		}
        },
        error: function() {
        		alert(e.error);
        		wx_sm_pay_spinner.stop();
        }
    })
}



function wxSMPayQueryResult(){
	
	var pay_amount = $('#wx-sm-pay-panel-total-amount').val();
	var wepos_store_name = $('#wepos_store_name').text();
	var checkout_table_name = $('#checkout_table_name').text();
	var good_name = wepos_store_name+'-'+checkout_table_name;
	
	var wepos_pay_id = $('#confirm-pay-wepos-pay-id').val();
	var pay_code = $('#confirm-pay-code').val();
	var order_id = $('#selected-order-id').val();
	
	var paid_money = $('#cash-pay-panel-paid-amount-input').val();
	var exchange_money = $('#cash-pay-panel-paid-amount-exchange').val();
	wx_sm_pay_start_wait();
	
	var tid = $('#selected-table-id').val();  
        
	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=wxSMPayQueryResult",
        dataType: "json",
        data: {"good_name":good_name, "pay_amount":pay_amount,"order_id":order_id,"table_id":tid, "wepos_pay_id":wepos_pay_id,"pay_code":pay_code, "paid_money":paid_money, "exchange_money":exchange_money},
        success: function(e) {
//        	spinner.stop();
        	
        		if(e.result == true){
        			var sid = $('#selected-store-id').val();
            		var tid = $('#selected-table-id').val();
            		var ptid = $('#selected-parent-table-id').val();
            		var oid = $('#selected-order-id').val();
            		
            		window.location.href= "checkout.html?sid=" + sid + "&tid=" + tid 
            		+ "&ptid=" + ptid + "&oid=" + oid;
            		
        			
        		}else{
   