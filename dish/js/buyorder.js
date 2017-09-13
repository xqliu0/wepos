
function set_menu_active(){
	$("#active-menu-id-buyorder").addClass("active").siblings().removeClass("active");
}
set_menu_active();

function input_buyorder_amount(){
	var buyorder_amount = $("#buy-order-amount-input").val();
	if(parseFloat(buyorder_amount) > 0){
		$("#buy-order-amount-submit").removeClass("disabled");
	}
}

function submit_buyorder() {
	
	var buyorder_amount = $("#buy-order-amount-input").val();
	if(parseFloat(buyorder_amount) <= 0){
		$("#buy-order-amount-submit").addClass("disabled");
		 Zepto.sDialog({
             skin:"red",
             content: "请输入金额",
             okBtn:false,
             cancelBtn:false
           });
		 
		return false;
	}
	
	var buyorder_note = $("#buy-order-amount-note").val();
	var table_id = $('#selected-table-id').val();
	
    $.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=createBuyOrder",
        dataType: "json",
        data: {"table_id":table_id, "buyorder_amount":buyorder_amount,"buyorder_note":buyorder_note},
        success: function(e) {
            if (e.error == "") {
        		window.location.href = 'http://m.xiaoweicanting.com/ttmr/shop/wepos/dish/checkout.html?sid='+e.data.store_id+'&tid='+table_id+'&oid='+e.data.order_id+"&type=buy";
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
