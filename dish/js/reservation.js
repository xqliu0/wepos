function set_menu_active(){
	$("#active-menu-id-preorder").addClass("active").siblings().removeClass("active");
}
set_menu_active();


function getReservationTimePoint(today,date_string) {
	
	$("#today").val(today);
	$("#date_string").val(date_string);
	$("#date-id-"+today).addClass("active").siblings().removeClass("active");
	
	$("#resvervation-table-list-zone").addClass("ng-hide");
	
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getReservationTimePoint",
        dataType: "json",
        data: {"today":today},
        success: function(e) {
            if (e) {     
            	var html = template.render('resvervation-time-list', e.data);
				$("#resvervation-time-list-zone").html(html); 
				
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



function getReservationDateList(){
	 $.ajax({
	        type: "GET",
	        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getReservationDateList",
	        dataType: "json",
	        success: function(e) {
	            if (e.error=="") {     
	            	var html = template.render('resvervation-date-list', e.data);
					$("#resvervation-date-list-zone").html(html);
					
					$("#date_string").val(e.data.date_list[0].date_day);
					getReservationTimePoint(0, e.data.date_list[0].date_day);
	            	
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


function getTimePointTableList(store_id, table_zone_id,table_zone_name, time_id, time_point){
	
	$("#time-id").val(time_id);
	$("#time-id-value").val(time_point);
	$("#time-zone-id").val(table_zone_id);
	$("#time-zone-name").val(table_zone_name);
	
	
//	$("#time-id-"+time_id).addClass("active").removeClass("disabled");
	$("#time-id-"+time_id).addClass("active").siblings().removeClass("active");
	
	$("#resvervation-table-list-zone").removeClass("ng-hide");

	var today = $("#today").val();

	$.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getTimePointTableList",
        dataType: "json",
        data: {"today":today,"store_id":store_id,"table_zone_id":table_zone_id,"time_id":time_id},
        success: function(e) {
            if (e) {     
            	var html = template.render('resvervation-table-list', e.data);
				$("#resvervation-table-list-zone").html(html); 
				storeTableArray = e.data.table_list;
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


function select_table(stc_id,stc_name,reserved){
	
	$("#table-id").val(stc_id);
	$("#table-name").val(stc_name);
	
	var date_string = $("#date_string").val();
	$("#reserv-time").text(date_string);
	
	$("#table-id-"+stc_id).addClass("active").siblings().removeClass("active");
	$("#reserv-info").removeClass("ng-hide");

	var length = storeTableArray.length;
    for (var i=0; i < length; i++) {
    	
    	if(storeTableArray[i].stc_id == stc_id){
    		$("#reserv-table").text(storeTableArray[i].stc_name);
    		
    		if(reserved == 1){
    			$("#reserv-name").val(storeTableArray[i].reserv_info.name);
        		$("#reserv-phone").val(storeTableArray[i].reserv_info.phone);
        		$("#reserv-note").val(storeTableArray[i].reserv_info.note);
        		setgender(storeTableArray[i].reserv_info.gender);
    		}else{
    			$("#reserv-name").val("");
        		$("#reserv-phone").val("");
        		$("#reserv-note").val("");
        		setgender('0');
    		}
    	}
    }
}

function input_reserv_info(input_id){
	var name = $("#reserv-name").val();
	var phone = $("#reserv-phone").val();
	var note = $("#reserv-note").val();
	if(name!="" && phone!=""){
		$("#pre-order").removeClass("disabled");
	}
}

function setgender(gender){
	$("#gender").val(gender);
	if(gender == "0"){
		$("#gender-man").addClass("active").siblings().removeClass("active");
	}else{
		$("#gender-woman").addClass("active").siblings().removeClass("active");
	}
}

function submit_preorder(){
	
	var today = $("#today").val();
	var time_id = $("#time-id").val();
	var time_id_value = $("#time-id-value").val();
	var time_zone_id = $("#time-zone-id").val();
	var time_zone_name = $("#time-zone-name").val();
	var table_id = $("#table-id").val();
	var table_name = $("#table-name").val();
	var reserv_name = $("#reserv-name").val();
	var reserv_phone = $("#reserv-phone").val();
	var reserv_note = $("#reserv-note").val();
	var gender = $("#gender").val();

	if(!(/^1[34578]\d{9}$/.test(reserv_phone))){ 
        Zepto.sDialog({
             skin:"red",
             content: "手机号码有误，请重新填写",
             okBtn:false,
             cancelBtn:false
           }); 
        return false; 
    } 

	if(reserv_name=="" || reserv_phone == ""){
		 Zepto.sDialog({
             skin:"red",
             content: "联系人信息",
             okBtn:false,
             cancelBtn:false
           });
		return false;
	}
	
    $.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=createPreOrder",
        dataType: "json",
        data: {"today":today, "time_id":time_id,"time_id_value":time_id_value,
        	"time_zone_id":time_zone_id,"time_zone_name":time_zone_name,
        	"table_id":table_id,"table_name":table_name,
        	"reserv_name":reserv_name,
        	"reserv_phone":reserv_phone,
        	"reserv_note":reserv_note,
        	"gender":gender},
        success: function(e) {
            if (e.error == "") {
        		window.location.reload() ;
            }else{
            	alert(e.msg);
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