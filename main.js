
	$(document).ready(function(){
	//---------- multiple-select start. ----------
		var optValue;
		var select_id;
		var url = location.href;
		if(url.indexOf('index') != -1){					// 一般查詢
			select_id = "#hsn_cd";						// 物品地點
			optValue = "null";
		}
		else if(url.indexOf('advancedQuery') != -1){	// 進階查詢
			select_id = "#q_county"; 					// 物品地點
			optValue = "null"; 
		}
		
		// 物品地點：step1-1.塞回select複選值(桌機版)
		$(select_id + " > option").each(function(){
			if(optValue.indexOf($(this).val() + '') != -1){
				$(this).attr('selected', 'selected');
			}else{
				$(this).removeAttr('selected');
			}
		});
		
		// 物品地點：step1-2.塞回select複選值(手機版)
		$("#q_county_phone > option").each(function(){
			if(optValue.indexOf($(this).val() + '') != -1){
				$(this).attr('selected', 'selected');
			}else{
				$(this).removeAttr('selected');
			}
		});

		// 物品分類：step1-3.塞回select複選值(手機版)
		$("#item1_phone > option").each(function(){
			var value = "null";
			if(value.indexOf($(this).val() + '') != -1){
				$(this).attr('selected', 'selected');
			}else{
				$(this).removeAttr('selected');
			}
		});
		
		// multiSelectRender方法說明：
		// 將[#hsn_cd]渲染成新的「下拉式選單(checkbox可複選)」，並將勾選結果儲存到[#hsn_cd_query]參數(click事件)
		
		// 物品地點：step2-1.物品地點，複選下拉式選單(重新渲染，電腦版)
		multiSelectRender("#hsn_cd", "#hsn_cd_query");
		multiSelectRender("#q_county", "#q_county_query");
		
		// 物品地點：step2-2.物品地點，複選下拉式選單(重新渲染，手機板)
		multiSelectRender("#q_county_phone", "#q_county_query_phone");
		// 物品分類：step2-3.物品分類，複選下拉式選單(重新渲染，手機板)
		multiSelectRender("#item1_phone", "#item1_query_phone");
		
		
		// 物品地點：step3-1.補「全部」選項點擊事件(一般查詢，物品地點)
		$("input[data-name='selectAllhsn_cd']").click(function(){
			if($(this).prop("checked")){
				$("#hsn_cd_query").val("");
			}
		});	
		// 物品地點：step3-2.補「全部」選項點擊事件(進階查詢，物品地點)
		$("input[data-name='selectAllq_county']").click(function(){
			if($(this).prop("checked")){
				$("#q_county_query").val("");
				$("#q_county_query_phone").val("");
			}
		});
		// 物品分類：step3-3.補「全部」選項點擊事件(進階查詢，物品分類)
		$("input[data-name='selectAllitem1']").click(function(){
			if($(this).prop("checked")){
				$("#item1_query_phone").val("");
			}
		});
		
		// 手機版-進階查詢:修改【全部】選項的 placeholder
		$("#item1_div_phone").find(".placeholder").html('&ensp;物品分類');
		$("#q_county_div_phone").find(".placeholder").html('&ensp;物品地點');
		
	//---------- multiple-select end. ----------
		
		// 物品列表顯示方式
		var showType = 'List';
		if(showType == "Block" || showType == 'null'){
			$(".typeBlock").show();
		}
		else if(showType =="List"){
			$(".typeList").show();
		}
		
		// 由[瀏覽出價]連結進入 → 基本搜尋
		if(window.location.search.includes("isRecyclerLink")){
			sessionStorage.removeItem('isShowSearchBox');
		}
		// 由[今日開標]連結進入 → 進接搜尋
		if(window.location.search.includes("onlyTodayChecked")){
			window.sessionStorage.setItem('isShowSearchBox', true);
		}
		
		// 前次查詢是否有開啟「進階查詢」條件窗
		if(window.sessionStorage.getItem('isShowSearchBox') == 'true'){
			showOrHideSearchBox();
		}
		
		// 手機板隱藏「注意事項」、「麵包屑」
		if(document.body.clientWidth > 1000){
			$("#breadcrumbDiv").show();
		}
		
		// 判斷「限定廢汽機車回收商專區」或「不限資格區」
		var obj = {};
		obj.value = "N";
		$("#isRecyclerRadio" + obj.value).prop("checked",true);
		if(obj.value == 'Y'){
			alert('提醒：需具有「應回收廢棄物回收業登記證」之「廢機動車輛回收業者」才可以投標。')
		}
		
		isRecycler(obj);
		
		// 同步indexQuery和advancedQuery的「只顯示今日開標案」
		if($("#onlyTodayChecked").prop("checked") || $("#onlyTodayChecked2").prop("checked")){
			$("#today").prop("checked", true);
		}
		
		// 「已追蹤」案件要改成「移除追蹤」按鈕
		
	});
		
	// 顯示或隱藏「進階查詢」區塊
	var isShowSearchBox = true;
	function showOrHideSearchBox(){
		if(isShowSearchBox){
			$(".searchBox").hide(); // 進階
			$("#commonSearchDiv").show();	// 一般
		}else{
			$(".searchBox").show(); // 進階
			$("#commonSearchDiv").hide(); // 一般
		}
		isShowSearchBox = !isShowSearchBox;
		window.sessionStorage.setItem('isShowSearchBox', isShowSearchBox);
	}
	
	// 只顯示今日開標案
	function onlyToday() {
		var flag = document.getElementById('onlyTodayChecked').checked;
		
		if(flag) {
			$('#q_bidbegindate').val('1140113');
			$('#q_bidenddate').val('1140113');						
		} else {
			$("#q_bidbegindate > option:selected").attr("selected", false);
			$("#q_bidbegindate > option:first-child").attr("selected", true);	
			$("#q_bidenddate > option:selected").attr("selected", false);
			$("#q_bidenddate > option:first-child").attr("selected", true);	
		}
	}
	
	// 只顯示今日開標案
	function onlyToday2() {
		var flag = document.getElementById('onlyTodayChecked2').checked;
		
		if(flag) {
			$('#q_bidbegindate_phone').val('1140113');
			$('#q_bidenddate_phone').val('1140113');						
		} else {
			$("#q_bidbegindate_phone > option:selected").attr("selected", false);
			$("#q_bidbegindate_phone > option:first-child").attr("selected", true);	
			$("#q_bidenddate_phone > option:selected").attr("selected", false);
			$("#q_bidenddate_phone > option:first-child").attr("selected", true);	
		}
	}
	
	// 重置查詢條件
	function resetForm(formId) {
		// 重置一般標籤
		$('#'+formId+' input:checkbox').prop('checked', false);
		$('#'+formId+' input:text:not([readonly]):not([id="showPage"]):not([id="showPage2"])').val('');
		$("option:selected").attr("selected", false);
		$("option:first-child").attr("selected", true);
		
		// 重置複選框(渲染出來的)
		$(".ms-choice > span").text("全部");
		$("#item1_div_phone").find(".ms-choice > span").html("&ensp;物品分類");
		$("#q_county_div_phone").find(".ms-choice > span").html("&ensp;物品地點");
		$("#hsn_cd_query").val("");
		$("#q_county_query").val("");
		$("#q_county_query_phone").val("");
		$("#item1_query_phone").val("");
		
		var selects = $('#'+formId+' select');
		for(var i = 0 ; i < selects.length ; i++) {
			var parent = selects[i].parentNode;
			
			if(parent.className == 'ffSelectWrapper') {	
				$(parent.parentNode).fancyfields("clean");
			}
			
		}
	}
		
	// 分頁
	function goToPage(index){
		if(index > 101){
			index = 101;	
		}
		else if(index < 1){
			index = 1;
		}
		else{
			$("#tempPage").val(index);	
			$("#tempPage2").val(index);	
			$("input[name='showPage']").each(function(){
				$(this).val(index);
			});

			var url = location.href;		
			if(url.indexOf('index') != -1){
				$('#autionSearch').submit();
			}
			else if(url.indexOf('advancedQuery') != -1){
				$('#autionId').submit();
			}
		}
	}
	
	// 切換物品列表顯示方式(方塊/條列)
	function showType(type){
		$("input[name='showType']").each(function(){
			$(this).val(type);
		});
		
		goToPage($("#tempPage").val());		
	}
	
	// 複選下拉式選單(重新渲染)
	function multiSelectRender(select_id, input_name){
		$(select_id).multipleSelect({
            placeholder: "全部",
            width: '100%',
            selectAll: true,
            multiple: true,
            multipleWidth: 300,
            onClick: function (v) {
                var queryStr = "";
                var array = $(select_id).val();
                if(array != null){
                	for(var i=0 ; i<array.length ; i++){
                		if(array[i] != ""){
                			queryStr += ",'" + array[i] + "'";
                		}
                    }
                }
                else{
                	queryStr = "";
                }
                
                queryStr = (queryStr != "") ? queryStr.substring(1) : "";
                $(input_name).val(queryStr);
                
                //console.log($(select_id).val());
                //console.log($(input_name).val());
                //console.log(v);
                //console.log(v.value);
            }
        });
        $(".ms-choice").css("border","none");
        $(".ms-choice > span").css("margin-top","3px").css("color","#555");
	}
	
	function checkAndroid(){
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		//var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		//alert('是否是Android：'+isAndroid);
		//alert('是否是iOS：'+isiOS);
		return isAndroid;
	}

	function seeMoreObject(){
	/*
		 1. 指定頁數：name="showPage" id="showPage3"
       	 2. 查關鍵字：name="q_keyword" id="q_keyword_iphone"
       	 3. 查詢案號：name="q_autioncode"
       	 4. 開標起日：name="q_bidbegindate" id="q_bidbegindate_phone"
       	 5. 開標迄日：name="q_bidenddate" id="q_bidenddate_phone"
       	 6. 物品分類：name="q_item1_query" id="item1_query_phone" (格式：複數值，組成逗點隔開字串)
       	 7. 物品地點：name="q_county_query" id="q_county_query_phone" (格式：複數值，組成逗點隔開字串)
       	 8. 顯示順序：name="q_order" id="order3" 
       	 9. 今日開標：name="onlyTodayChecked" id="onlyTodayChecked2"
    */
    	// 當前頁數
    	var tempPage = parseInt($('#tempPage').val());
		var page = tempPage + 1;
		if(page <= 101){		
			$.ajax({
		    	  crossDomain: true,
		    	  cache: false,
		          url : '/shwoo/browse/browse00/seeMoreObject',
		          data: {
		        	  showPage: page,
		        	  q_keyword: $("#q_keyword_iphone").val(),
		        	  q_autioncode: $("#q_autioncode_phone").val(),
		        	  q_bidbegindate: $("#q_bidbegindate_phone").val(),
		        	  q_bidenddate: $("#q_bidenddate_phone").val(),
		        	  q_item1_query: $("#item1_query_phone").val(),
		        	  q_county_query: $("#q_county_query_phone").val(),
		        	  q_order: $("#order3").val(),
		        	  //20231004 牌照異動登記搜尋條件
		        	  q_unit1value4C:$("#UNIT1VALUE_4_C").val(),
		        	  onlyTodayChecked: document.getElementById('onlyTodayChecked2').checked ? "Y" : ""
		          },
				  type: "POST",
				  dataType: 'json',
		          success : function(response) {
				  	//console.log(response);
				  	var jsonObj = JSON.parse(response);
				  	var array = jsonObj.ReturnData;
				  	var today = getToday();
				  	var isAndroid = checkAndroid();
				  	for(var i=0 ; i<array.length ; i++){
				  		var obj = '<div class="col-xs-6 col-md-3  padding10a"><div class="thumbnail">';
					  	obj += '<img style="width: 100%; height: 100%; max-height: 135px; min-height: 135px; cursor: pointer;" ';
						obj += 'src="/shwoo/image?piccode=' + array[i].PICCODE + '&attach=' + array[i].PIC1 + '&width=203&height=135&smallPic=true" ';
						obj += 'alt="' + array[i].TITLE;
						
						if(isAndroid){
							obj += '" onclick="window.open(\'/shwoo/newproduct/newproduct00/product?AUID=' + array[i].AUID + '\',\'mozillaTab\')">';
						}else{							
							obj += '" onclick="window.location.href=\'/shwoo/newproduct/newproduct00/product?AUID=' + array[i].AUID + '\'">';
						}
						
						obj += '<div class="caption">' + array[i].CODE_TEXT + array[i].TOWN_NM + '<br>';
						obj += '<p style="white-space:nowrap;overflow:hidden;margin:0px;">' + array[i].TITLE + '</p>';
						obj += '底價<span class="text-danger">' + array[i].UPSETPRICE + '</span>元<br>';
						
						if(array[i].TOPPRICE != null){
							obj += '出價<span class="text-danger">' + array[i].TOPPRICE + '</span>元<br>'
						}else{							
							obj += '尚未出價<br>';
						}
						
						if(array[i].IS_TRACE == "Y") {
							obj += "<div><a href=\"javascript:setTraceList('" + array[i].AUID + "', 'N');\" id=\"traceLink" + array[i].AUID + "\"><span size=\"3\" color=\"#FFD306\">★</span><span style=\"color:green;font-weight:bold;\" id=\"traceTxt" + array[i].AUID + "\">移除追蹤</span></a></div>";
						} else {
							obj += "<div><a href=\"javascript:setTraceList('" + array[i].AUID + "', 'Y');\" id=\"traceLink" + array[i].AUID + "\"><span size=\"3\" color=\"#FFD306\">★</span><span style=\"color:green;font-weight:bold;\" id=\"traceTxt" + array[i].AUID + "\">加入追蹤</span></a></div>";
						}
						
						if(today == array[i].NEWBIDENDDATE) {
							obj += '<div class="cut_off"><span class="text-danger"><b>' + array[i].NEWBIDENDDATE.substring(0, 3) + '/' + array[i].NEWBIDENDDATE.substring(3, 5) + '/' + array[i].NEWBIDENDDATE.substring(5, 7) + '截止</b></span></div>';
						} else {
							obj += '<div class="cut_off">' + array[i].NEWBIDENDDATE.substring(0, 3) + '/' + array[i].NEWBIDENDDATE.substring(3, 5) + '/' + array[i].NEWBIDENDDATE.substring(5, 7) + '截止</div>';
						}
						
				  		obj += '</div></div></div>';
				  		$("#showPhoneBlock").append(obj);
				  	}
				  	$('#tempPage').val(page);
		          }
		    });
		
		}else{
			alert("到底囉！");
		}

	}
	
	function getToday() {
		var d = new Date();
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = '' + (d.getFullYear() - 1911);

    	if (month.length < 2) {
    		month = '0' + month;
    	}
        
    	if (day.length < 2) {
    		day = '0' + day;
    	}
        	
    	return year + month + day;
	}
	
	// 左列物品分類查詢
	function addItem1AndSubmit(item1){
		if(window.location.pathname.includes('advancedQuery')){
			// 進階查詢
			$('input[name="q_item1"]').removeAttr('checked');
			$('input[name="q_item1"]').each(function(){
				if($(this).val() == item1){
					$(this).prop("checked", true);
				}
			});
			$('#autionId').submit()
		}
		else{
			// 一般查詢
			$('#item1').val(item1);
			$('#autionSearch').submit();
		}
	}
	
	// 回收專區(沒有key值，只能先寫死)
	function isRecycler(obj){
		$("#UNIT1VALUE_4_C > option").each(function(){
			if(obj.value == 'N'){
				if($(this).val() == '報廢無法再領牌(得標人需具應回收廢棄物回收業登記證)'){
					$(this).prop("selected",false);
					$(this).hide();
				}
				else{
					$(this).show();
				}
			}
			
			if(obj.value == 'Y'){
				if($(this).val() == '報廢無法再領牌(得標人需具應回收廢棄物回收業登記證)'){
					$(this).prop("selected",true);
					$(this).show();
				}
				else{
					$(this).prop("selected",false);
					$(this).hide();
				}
			}
		});
	}
	
	// 加入追蹤
	function setTraceList(auid, add) {	
		$.ajax({
	    	  crossDomain: true,
	    	  cache: false,
	          url : '../../home/home00/setTraceList',
	          data: {
	        	  AUID: auid, 
	        	  ISADD: add, 
	        	  TIME:  new Date().getTime()},
			  type: "POST",
			  dataType: 'json',
	          success : function(response) {
	        	  var jsonObj = JSON.parse(response);							 
				  if(jsonObj.ReturnCode == '00'){
					  if(add == 'Y') { //改成移除	
						  $("#traceLink" + auid).attr("href", "javascript:setTraceList('" + auid + "', 'N')");
						  $("#traceTxt" + auid).text("移除追蹤");
					  } else {
						  $("#traceLink" + auid).attr("href", "javascript:setTraceList('" + auid + "', 'Y')");
						  $("#traceTxt" + auid).text("加入追蹤");
					  }			 
				  } else {
					  alert("請先登入會員");			 
				  }
	          }
	    });							
	}
	
	// 使用Android瀏覽標案內容時，開新分頁
	function openOrRedirect(target){
		if(checkAndroid()){
			window.open(target);
		}else{
			window.location.href = target;
		}
	}

