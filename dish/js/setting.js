
function set_menu_active(){
	$("#active-menu-id-dashboard").addClass("active").siblings().removeClass("active");
}
set_menu_active();


function change_setting(type) {
	$('#setting_'+type).addClass('active').siblings().removeClass('active');
	if(type == 1){
		$('#module-setting-div-1').removeClass('ng-hide');
		$('#module-setting-div-3').addClass('ng-hide');
		$('#module-setting-div-4').addClass('ng-hide');
	}else if(type == 3){
		$('#module-setting-div-3').removeClass('ng-hide');
		$('#module-setting-div-1').addClass('ng-hide');
		$('#module-setting-div-4').addClass('ng-hide');
	}else if(type == 4){
		$('#module-setting-div-4').removeClass('ng-hide');
		$('#module-setting-div-3').addClass('ng-hide');
		$('#module-setting-div-1').addClass('ng-hide');
		get_shift_list('today');
	}
}

function module_set(module_id, close) {
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=edit_store_setting",
        dataType: "json",
        data: {"module_id":module_id,"close":close},
        success: function(e) {
        	if(e.error == ""){
        		get_store_setting();
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

function get_shift_list(timespan) {
	$('#shift-timespan-'+timespan).addClass('active').siblings().removeClass('active');
	$.ajax({
        type: "POST",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=getStoreShiftList",
        dataType: "json",
        data: {"timespan":timespan},
        success: function(e) {
        	if(e.error == ""){
        		//get_store_setting();
        		var html = template.render('store_shift_list', e.data);
				$("#store_shift_list_zone").html(html);
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

function updateSetting(key, value, callback) {
    $.ajax({
        type: "GET",
        url:"http://m.xiaoweicanting.com/ttmr/shop/index.php?act=store_dish_wepos&op=updateParam&param_key="+key+"&param_value="+value,
        dataType: "json",
        success: function(e) {
            if(e.error == ""){
                callback(e.data);
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

function changeMolingType(type) {
    updateSetting('moling_type', type, updateParamView);
}

function changeMolingScale(scale) {
    updateSetting('moling_scale', scale, updateParamView);
}


function updateParamView(data) {
    if (data.param_key == 'moling_type') {
        if (data.param_value == '0') {
            $('#moling-type-erase').removeClass('active');
            $('#moling-type-round').addClass('active');
        } else {
            $('#moling-type-erase').addClass('active');
            $('#moling-type-round').removeClass('active');
        }
    } else if (data.param_key == 'moling_scale') {
        if (data.param_value == '0') {
            $('#moling-scale-jiao').removeClass('active');
            $('#moling-scale-yuan').addClass('active');
        } else {
            $('#moling-scale-jiao').addClass('active');
            $('#moling-scale-yuan').removeClass('active');
        }
    }
}