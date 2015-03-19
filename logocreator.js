var app_base_url = "http://www.text2logo.info/";
var google_font_url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAAFADHG834PM5JbZKf2b34gjW3gOxV9sk";
var google_googl_url = "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAAFADHG834PM5JbZKf2b34gjW3gOxV9sk";
var logo_4_share_url = "http://www.text2logo.it/img/logo/logo48.png";
var share_message = "Do you like this logo?";
var app_name = "Logo Creator";
var app_slogan = "Your logo in 4 minutes";
var app_description = "ooo";
var defaultFont = "Montserrat Alternates";

var box_imgs_selected = new Array();
var z_indexs = new Array(1,2,3,4,5);

var selected_textinput;

function init(){
	setLight();
	$("#toolbar_dark").click(function() { setDark();});
	$("#toolbar_light").click(function() { setLight();});
	$("#toolbar_t1_color").change(function() { changeColor(); });
	$("#toolbar_t2_color").change(function() { changeColor(); });
	$("#toolbar_t3_color").change(function() { changeColor(); });
	$("#toolbar_t4_color").change(function() { changeColor(); });
	$("#toolbar_t5_color").change(function() { changeColor(); });
	$("#toolbar_t1_text").change(function() { changeText(); });
	$("#toolbar_t2_text").change(function() { changeText(); });
	$("#toolbar_t3_text").change(function() { changeText(); });
	$("#toolbar_t4_text").change(function() { changeText(); });
	$("#toolbar_t5_text").change(function() { changeText(); });
	
	$("#insert_symbol_t1_link").click(function() {chooseSymbol("toolbar_t1_text"); });
	$("#insert_symbol_t2_link").click(function() {chooseSymbol("toolbar_t2_text"); });
	$("#insert_symbol_t3_link").click(function() {chooseSymbol("toolbar_t3_text"); });
	$("#insert_symbol_t4_link").click(function() {chooseSymbol("toolbar_t4_text"); });
	$("#insert_symbol_t5_link").click(function() {chooseSymbol("toolbar_t5_text"); });
	
	$("#background_canvas_color").change(function() { changeCanvasColor(); });

	$("#font_select").change(function() { changeFont();});
	$("#toolbar_bold").change(function() { changeBold();});
	$("#toolbar_italic").change(function() { changeItalic();});

	$("#toolbar_t1_size").change(function() { changeSize(); });
	$("#toolbar_t2_size").change(function() { changeSize(); });
	$("#toolbar_t3_size").change(function() { changeSize(); });
	$("#toolbar_t4_size").change(function() { changeSize(); });	
	$("#toolbar_t5_size").change(function() { changeSize(); });
	$("#toolbar_t1_rotation").change(function() { changeRotation(); });
	$("#toolbar_t2_rotation").change(function() { changeRotation(); });
	$("#toolbar_t3_rotation").change(function() { changeRotation(); });
	$("#toolbar_t4_rotation").change(function() { changeRotation(); });
	$("#toolbar_t5_rotation").change(function() { changeRotation(); });
	
	$("#show_canvas_info_checkbox").change(function() { showCanvasInfo();});
	$("#toolbar_canvas_width").change(function() { changeCanvasWidth(); });
	$("#toolbar_canvas_height").change(function() { changeCanvasHeight(); });

	$("#logo_container").mousemove(function(evt) { updateMousePosition(evt);});

	$("#toolbar_yellow").click(function() {setColor("FDE910", "A49705", "9EABB0", "BDCDD4", "BDCDD4"); });
	$("#toolbar_green").click(function() {setColor("9ade00", "009100", "9EABB0", "BDCDD4", "BDCDD4"); });
	$("#toolbar_orange").click(function() {setColor("ff6600", "ff9900", "9EABB0", "BDCDD4", "BDCDD4"); });
	$("#toolbar_red").click(function() {setColor("dc0000", "b50000", "9EABB0", "BDCDD4", "BDCDD4"); });
	$("#toolbar_blue").click(function() {setColor("19aeff", "0084c8", "9EABB0", "BDCDD4", "BDCDD4"); });
	$("#toolbar_purple").click(function() {setColor("DD379C", "90125E", "9EABB0", "BDCDD4", "BDCDD4"); });
	$("#toolbar_maroon").click(function() {setColor("804D00", "D49725", "ECCD84", "ECCD84", "BDCDD4"); });
	$("#toolbar_violet").click(function() {setColor("6D28A6", "C47BFF", "9EABB0", "BDCDD4", "BDCDD4"); });
	
	setColor("9ade00", "37B098", "C47BFF", "C47BFF", "BDCDD4"); 
	
	$( "#t1_img" ).draggable();
	$( "#t2_img" ).draggable();
	$( "#t3_img" ).draggable();
	$( "#t4_img" ).draggable();
	$("#t5_img").draggable();
	
	$( "#t1_img" ).click(function() {toggleSelectBoxImg("t1_img"); });
	$( "#t2_img" ).click(function() {toggleSelectBoxImg("t2_img"); });
	$( "#t3_img" ).click(function() {toggleSelectBoxImg("t3_img"); });
	$( "#t4_img" ).click(function() {toggleSelectBoxImg("t4_img"); });
	$( "#t5_img" ).click(function() {toggleSelectBoxImg("t5_img"); });
	loadFonts();
	
	
	$("#toolbar_align_top").click(function() {alignTop(); });
	$("#toolbar_align_bottom").click(function() {alignBottom(); });
	$("#toolbar_align_left").click(function() {alignLeft(); });
	$("#toolbar_align_right").click(function() {alignRight(); });
	$("#toolbar_align_center").click(function() {alignCenter(); });
	$("#toolbar_align_middle").click(function() {alignMiddle(); });
	
	$("#toolbar_arrange_back").click(function() {bringBottom(); });
	$("#toolbar_arrange_foward").click(function() {bringTop(); });

	refreshZIndexs();
	
	$("#toolbar_share_url_generator").click(function() {createShortUrl(); });
	$("#toolbar_copy_url").click(function() {copyShortUrlToClipboard(); });
	
	$("#toolbar_share_facebook").click(function() {postToFacebookWall(); });
	$("#toolbar_share_googleplus").click(function() {postOnGooglePlus(); });

	$("#help_button").click(function() {introJs().start(); });
	$("#toolbar-share_help").click(function() {introJs("#toolbar-share"); });

	processParameter();
	
    $(window).resize(function () {
        //only do it if the dialog box is not hidden
        if (!$('#dialog-box').is(':hidden')) popup();      
    });
	$("#toolbar_save_image").click(function() { createImage(); });

    $("#about_button").click(function() {popup("");});
    $('#close-about-link').click(function () { closeAbouDialog();});   
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
    		closeAbouDialog();
    		closeSymbolDialog();
    		closeIntroDialog();
        }
    });
    
    $('#close-symbol-link').click(function () { closeSymbolDialog();});   
    $("#intro_button").click(function() {showIntro();});
    $('#close-intro-link').click(function () { closeIntroDialog();});   
    $('#intro_start_design_link').click(function () { closeIntroDialog();});   
    
    $('#footer_logo').click(function () { reload();}); 
    $('#reset_button').click(function () { clearAll();}); 
    
    var firstAccess = getCookie("firstAccess");
    if (firstAccess==null || firstAccess==""){
    	showIntro();
    	setCookie("firstAccess", "Ok", 365);
    }
 }

 function setDark(){
	 $("body").css("background-color", "#0e232e"); 
	 $(".toolbar").css("background-color", "#364e59");
	 $(".toolbar").css("color", "#bdcdd4");
	 $(".toolbar a").css("color", "#19aeff");
	 $("#about_toolbar").css("background-color", "#2d3c43");
	 $("#about_toolbar a").css("color", "#bdcdd4");
	 $("#footer").css("color", "#bdcdd4");

 } 
 
 function setLight(){
	 $("body").css("background-color", "#d7e4ea"); 
	 $(".logo_text").css("color", "#0e232e");
	 $(".toolbar").css("background-color", "#bdcdd4");
	 $(".toolbar").css("color", "#0e232e");
	 $(".toolbar a").css("color", "#0084c8");
	 $("#about_toolbar").css("background-color", "#E6F0F4");
	 $("#about_toolbar a").css("color", "#0e232e");
	 $("#footer").css("color", "#0e232e");
 }

 function setColor(t1_color, t2_color, t3_color, t4_color, slogan_color){
	$("#toolbar_t1_color").val(t1_color);
	$("#toolbar_t2_color").val(t2_color);
	$("#toolbar_t3_color").val(t3_color);
	$("#toolbar_t4_color").val(t4_color);
	$("#toolbar_t5_color").val(slogan_color);
	$("#toolbar_t1_color").css("background-color", t1_color);
	$("#toolbar_t2_color").css("background-color", t2_color);
	$("#toolbar_t3_color").css("background-color", t3_color);
	$("#toolbar_t4_color").css("background-color", t4_color);
	$("#toolbar_t5_color").css("background-color", slogan_color);
	changeColor();
 }
 
 function changeCanvasColor(){
	clearShortUrl();
	 $("#logo_container").css("background-color", $("#background_canvas_color").val()); 
 }

 function changeColor(){
		clearShortUrl();
		$("#t1_img").css("color", $("#toolbar_t1_color").val());
		$("#t2_img").css("color", $("#toolbar_t2_color").val());
		$("#t3_img").css("color", $("#toolbar_t3_color").val());
		$("#t4_img").css("color", $("#toolbar_t4_color").val());
		$("#t5_img").css("color", $("#toolbar_t5_color").val());
	 }

 
 function changeText(){
	clearShortUrl();
	$("#t1_img").text($("#toolbar_t1_text").val());
	$("#t2_img").text($("#toolbar_t2_text").val());
	$("#t3_img").text($("#toolbar_t3_text").val());
	$("#t4_img").text($("#toolbar_t4_text").val());
	$("#t5_img").text($("#toolbar_t5_text").val());
	
	verifySelection(1);
	verifySelection(2);
	verifySelection(3);
	verifySelection(4);
	verifySelection(5);
 }
 
 function verifySelection(index){
	 if($("#toolbar_t"+index+"_text").val() == "")
		 toggleSelectBoxImg("t"+index+"_img");
 }
 


function changeFont(){
	clearShortUrl();
	var selectedFont = $('#font_select').find(":selected").text();
	if ($('#toolbar_change_on_all').is(':checked')) {
		changeSingleFont(selectedFont, "#t1_img");
		changeSingleFont(selectedFont, "#t2_img");
		changeSingleFont(selectedFont, "#t3_img");
		changeSingleFont(selectedFont, "#t4_img");
		changeSingleFont(selectedFont, "#t5_img");
	}
	else{
		if(box_imgs_selected.length==0)
			alert("Select an item or check 'On all text'");
		else
			changeSingleFont(selectedFont, box_imgs_selected[0]);
	}
}

function changeSingleFont(font, element){
	WebFont.load({ google: { families: [font] } });
	$(element).css("font-family", font);
}

function changeBold(){
	clearShortUrl();
	var style = "normal";
	if ($('#toolbar_bold').is(':checked')) {
		style = "bold";
	}
	if ($('#toolbar_change_on_all').is(':checked')) {
		changeSingleBold(style, "#t1_img");
		changeSingleBold(style, "#t2_img");
		changeSingleBold(style, "#t3_img");
		changeSingleBold(style, "#t4_img");
		changeSingleBold(style, "#t5_img");
	}
	else{
		if(box_imgs_selected.length==0)
			alert("Select an item or check 'On all text'");
		else
			changeSingleBold(style, box_imgs_selected[0]);
	}
}

function changeSingleBold(style,element){
	$(element).css("font-weight",style);
}

function changeItalic(){
	clearShortUrl();
	var style = "normal";
	if ($('#toolbar_italic').is(':checked')) {
		style = "italic";
	}
	if ($('#toolbar_change_on_all').is(':checked')) {
		changeSingleItalic(style, "#t1_img");
		changeSingleItalic(style, "#t2_img");
		changeSingleItalic(style, "#t3_img");
		changeSingleItalic(style, "#t4_img");
		changeSingleItalic(style, "#t5_img");
	}
	else{
		if(box_imgs_selected.length==0)
			alert("Select an item or check 'On all text'");
		else
			changeSingleItalic(style, box_imgs_selected[0]);
	}
}

function changeSingleItalic(style,element){
	$(element).css("font-style",style);
}

function changeSize(){
	clearShortUrl();
	$("#t1_img").css("font-size",$("#toolbar_t1_size").val() + "pt");
	$("#t2_img").css("font-size",$("#toolbar_t2_size").val() + "pt");
	$("#t3_img").css("font-size",$("#toolbar_t3_size").val() + "pt");
	$("#t4_img").css("font-size",$("#toolbar_t4_size").val() + "pt");
	$("#t5_img").css("font-size",$("#toolbar_t5_size").val() + "pt");
}




function changeRotation(){
	clearShortUrl();
	changeSingleRotationCss("t1_img", $("#toolbar_t1_rotation").val());
	changeSingleRotationCss("t2_img", $("#toolbar_t2_rotation").val());
	changeSingleRotationCss("t3_img", $("#toolbar_t3_rotation").val());
	changeSingleRotationCss("t4_img", $("#toolbar_t4_rotation").val());
	changeSingleRotationCss("t5_img", $("#toolbar_t5_rotation").val());
 }

function changeSingleRotationCss(tag, deg){
	$("#" + tag ).css("-webkit-transform","rotate("+deg+"deg)");
	$("#" + tag ).css("-moz-transform","rotate("+deg+"deg)");
	$("#" + tag ).css("-o-transform","rotate("+deg+"deg)");
	$("#" + tag ).css("-ms-transform","rotate("+deg+"deg)");

	
//	return"-webkit-transform: rotate("+deg+"deg);-moz-transform: rotate("+deg+"deg);-o-transform: rotate("+deg+"deg);-ms-transform: rotate(-"+deg+"deg);";
}

 
function loadFonts(){
	$.get(google_font_url, function(data) {
		var sel = $("#font_select");
		sel.empty();
		for (var i=0; i<data.items.length; i++) {
		  sel.append('<option value="' + data.items[i].family + '">' + data.items[i].family + '</option>');
		}
		
		if(QueryString.f){
			sel.val(decodeURI(QueryString.f));
		}
		else
			sel.val(defaultFont);
		//changeFont();
	}, "json");
}

function showCanvasInfo(){
	var canvasColor= $("#logo_container").css("background-color");
	var newColor = invertColor(canvasColor);
	if ($('#show_canvas_info_checkbox').is(':checked')) {
		$("#t1_img").addClass("canvas_info_img_border");
		$("#t2_img").addClass("canvas_info_img_border");
		$("#t3_img").addClass("canvas_info_img_border");
		$("#t4_img").addClass("canvas_info_img_border");
		$("#t5_img").addClass("canvas_info_img_border");
		$("#canvas_coordinates").show();
		$("#t1_img").css("border-color", newColor );
		$("#t2_img").css("border-color", newColor );
		$("#t3_img").css("border-color", newColor );
		$("#t4_img").css("border-color", newColor );
		$("#t5_img").css("border-color", newColor );
		$("#canvas_coordinates").css("color", newColor );

	} else {
		$("#t1_img").removeClass("canvas_info_img_border");
		$("#t2_img").removeClass("canvas_info_img_border");
		$("#t3_img").removeClass("canvas_info_img_border");
		$("#t4_img").removeClass("canvas_info_img_border");
		$("#t5_img").removeClass("canvas_info_img_border");
		$("#canvas_coordinates").hide();
	}
}

function invertColor(rgbColor) {
  var color = rgbColor;
  var colors = color.substring(4,color.length-1).split(",");
  var r  = parseInt(colors[0]);
  var g  = parseInt(colors[1]);
  var b  = parseInt(colors[2]);
  if(r+g+b<382)
	  return "#ffffff";
  else
	  return "#000000";
	
//    var color = rgbColor;
//    var colors = color.substring(4,color.length-1).split(",");
//    var r  = 255-parseInt(colors[0]);
//    var g  = 255-parseInt(colors[1]);
//    var b  = 255-parseInt(colors[2]);
//    return "rgb(" + r + "," + b + "," + g + ")";
}

function updateMousePosition(evt){
	var x = evt.pageX - $('#logo_container').offset().left;
	var y = evt.pageY - $('#logo_container').offset().top;
	$("#canvas_coordinates").html("x: " + x + " y: " + y);
}

function changeCanvasWidth(){
	if($("#toolbar_canvas_width").val()!=""){
		$("#logo_container").css("width",$("#toolbar_canvas_width").val());
	}
}

function changeCanvasHeight(){
	if($("#toolbar_canvas_height").val()!=""){
		$("#logo_container").css("height",$("#toolbar_canvas_height").val());
	}
}

function toggleSelectBoxImg(boxImg){
	if($.inArray("#"+boxImg, box_imgs_selected)==-1){
		$("#"+boxImg).addClass("logo_img_selected");
		box_imgs_selected[box_imgs_selected.length]= "#"+boxImg;
	}
	else{
		$("#"+boxImg).removeClass("logo_img_selected");
		$("#"+boxImg).removeClass("logo_img_selected_first");
		$.each(box_imgs_selected, function(i){
		    if(box_imgs_selected[i] === '#'+boxImg) box_imgs_selected.splice(i,1);
		});
	}
	refreshFirstSelected();

}

function refreshFirstSelected(){
	if(box_imgs_selected.length>0){
		$(box_imgs_selected[0]).removeClass("logo_img_selected");
		$(box_imgs_selected[0]).removeClass("logo_img_selected_first");
		$(box_imgs_selected[0]).addClass("logo_img_selected_first");
		var font = $(box_imgs_selected[0]).css("font-family");
		if(font!=null && font!=""){
			var lastQuote = font.substring(1).indexOf("'");
			if(lastQuote>0){
				$("#font_select").val(font.substring(1,lastQuote+1));
			}
			else
				$("#font_select").val(font);
		}
		else
			$("#font_select").val(defaultFont);

			
		
		var bold = $(box_imgs_selected[0]).css("font-weight");
		$("#toolbar_bold").prop('checked', ("bold" == bold || "700" == bold));
		var italic = $(box_imgs_selected[0]).css("font-style");
		$("#toolbar_italic").prop('checked', ("italic" == italic));

	}
}

function selectBoxImg(boxImg){
	$("#"+boxImg).addClass("logo_img_selected");
	if(!$.inArray("#"+boxImg, box_imgs_selected)){
		box_imgs_selected.push("#"+boxImg);
	}
}

function deselectBoxImg(boxImg){
	$("#"+boxImg).removeClass("logo_img_selected");
	$.each(box_imgs_selected, function(i){
	    if(box_imgs_selected[i].name === '#'+boxImg) box_imgs_selected.splice(i,1);
	});
}

function alignTop(){
	clearShortUrl();
	if(box_imgs_selected.length>1){
		var y = $(box_imgs_selected[0]).offset().top-$('#logo_container').offset().top;
		$.each(box_imgs_selected, function(i){
			$(box_imgs_selected[i]).css("top",y);
		});
	}
	else
		alert("Select at least two items");
}

function alignBottom(){
	clearShortUrl();
	if(box_imgs_selected.length>1){
		var y = $(box_imgs_selected[0]).offset().top-$('#logo_container').offset().top+$(box_imgs_selected[0]).height();
		$.each(box_imgs_selected, function(i){
			$(box_imgs_selected[i]).css("top", (y-$(box_imgs_selected[i]).height()));
		});
	}
	else
		alert("Select at least two items");
}

function alignLeft(){
	clearShortUrl();
	if(box_imgs_selected.length>1){
		var x = $(box_imgs_selected[0]).offset().left-$('#logo_container').offset().left;
		$.each(box_imgs_selected, function(i){
			$(box_imgs_selected[i]).css("left",x);
		});
	}
	else
		alert("Select at least two items");
}


function alignRight(){
	clearShortUrl();
	if(box_imgs_selected.length>1){
		var x = $(box_imgs_selected[0]).offset().left-$('#logo_container').offset().left +$(box_imgs_selected[0]).width();
		$.each(box_imgs_selected, function(i){
			$(box_imgs_selected[i]).css("left",x-$(box_imgs_selected[i]).width());
		});
	}
	else
		alert("Select at least two items");
}

function alignCenter(){
	clearShortUrl();
	if(box_imgs_selected.length>1){
		var x = $(box_imgs_selected[0]).offset().left-$('#logo_container').offset().left +$(box_imgs_selected[0]).width()/2;
		$.each(box_imgs_selected, function(i){
			$(box_imgs_selected[i]).css("left",x-$(box_imgs_selected[i]).width()/2);
		});
	}
}

function alignMiddle(){
	clearShortUrl();
	if(box_imgs_selected.length>1){
		var y = $(box_imgs_selected[0]).offset().top-$('#logo_container').offset().top+$(box_imgs_selected[0]).height()/2;
		$.each(box_imgs_selected, function(i){
			$(box_imgs_selected[i]).css("top", (y-$(box_imgs_selected[i]).height()/2));
		});
	}
	else
		alert("Select at least two items");
}

function getSelectedIndex(){
	if(box_imgs_selected.length>0){
		if(box_imgs_selected[0] == "#t1_img"){
			return 0;
		}
		else if(box_imgs_selected[0] == "#t2_img"){
			return 1;
		}
		else if(box_imgs_selected[0] == "#t3_img"){
			return 2;
		}
		else if(box_imgs_selected[0] == "#t4_img"){
			return 3;
		}
		else if(box_imgs_selected[0] == "#t5_img"){
			return 4;
		}
	}
	return -1;
}

function bringTop(){
	var index = getSelectedIndex();
	if(index>-1){
		if(z_indexs[index]<5){
			z_indexs[index]++;
		}	
		for ( var i = 0; i < z_indexs.length; i++) {
			if(i!=index && z_indexs[index]==z_indexs[i])
				z_indexs[i]--;
		}
		refreshZIndexs();
	}
	else
		alert("Select one item");
}

function bringBottom(){
	var index = getSelectedIndex();
	if(index>-1){
		if(z_indexs[index]>1){
			z_indexs[index]--;
		}	
		for ( var i = 0; i < z_indexs.length; i++) {
			if(i!=index && z_indexs[index]==z_indexs[i])
				z_indexs[i]++;
		}
		refreshZIndexs();
	}
	else
		alert("Select one item");
}
function refreshZIndexs(){
	clearShortUrl();
	$("#t1_img").css("z-index", z_indexs[0]);
	$("#t2_img").css("z-index", z_indexs[1]);
	$("#t3_img").css("z-index", z_indexs[2]);
	$("#t4_img").css("z-index", z_indexs[3]);
	$("#t5_img").css("z-index", z_indexs[4]);
}
 
function processParameter(){
	if(QueryString.t1){ $("#toolbar_t1_text").val(decodeURI(QueryString.t1)); }
	if(QueryString.t2){ $("#toolbar_t2_text").val(decodeURI(QueryString.t2)); }
	if(QueryString.t3){ $("#toolbar_t3_text").val(decodeURI(QueryString.t3)); }
	if(QueryString.t4){ $("#toolbar_t4_text").val(decodeURI(QueryString.t4)); }
	if(QueryString.t5){ $("#toolbar_t5_text").val(decodeURI(QueryString.t5)); }
	changeText();
	
	if(QueryString.c1){ $("#toolbar_t1_color").val(QueryString.c1); }
	if(QueryString.c2){ $("#toolbar_t2_color").val(QueryString.c2); }
	if(QueryString.c3){ $("#toolbar_t3_color").val(QueryString.c3); }
	if(QueryString.c4){ $("#toolbar_t4_color").val(QueryString.c4); }
	if(QueryString.c5){ $("#toolbar_t5_color").val(QueryString.c5); }
	changeColor();
	
	if(QueryString.bg){ $("#background_canvas_color").val(QueryString.bg); }
	changeCanvasColor();
	
	if(QueryString.top1){ $("#t1_img").css("top",QueryString.top1); }			
	if(QueryString.top2){ $("#t2_img").css("top",QueryString.top2); }			
	if(QueryString.top3){ $("#t3_img").css("top",QueryString.top3); }			
	if(QueryString.top4){ $("#t4_img").css("top",QueryString.top4); }			
	if(QueryString.top5){ $("#t5_img").css("top",QueryString.top5); }			

	if(QueryString.left1){ $("#t1_img").css("left",QueryString.left1); }			
	if(QueryString.left2){ $("#t2_img").css("left",QueryString.left2); }			
	if(QueryString.left3){ $("#t3_img").css("left",QueryString.left3); }			
	if(QueryString.left4){ $("#t4_img").css("left",QueryString.left4); }			
	if(QueryString.left5){ $("#t5_img").css("left",QueryString.left5); }			

	if(QueryString.c1){ $("#toolbar_t1_size").val(QueryString.s1); }
	if(QueryString.c2){ $("#toolbar_t2_size").val(QueryString.s2); }
	if(QueryString.c3){ $("#toolbar_t3_size").val(QueryString.s3); }
	if(QueryString.c4){ $("#toolbar_t4_size").val(QueryString.s4); }
	if(QueryString.c5){ $("#toolbar_t5_size").val(QueryString.s5); }
	changeSize();

	if(QueryString.c1){ $("#toolbar_t1_rotation").val(QueryString.r1); }
	if(QueryString.c2){ $("#toolbar_t2_rotation").val(QueryString.r2); }
	if(QueryString.c3){ $("#toolbar_t3_rotation").val(QueryString.r3); }
	if(QueryString.c4){ $("#toolbar_t4_rotation").val(QueryString.r4); }
	if(QueryString.c5){ $("#toolbar_t5_rotation").val(QueryString.r5); }
	changeRotation();

	if(QueryString.f){$('#font_select').val(QueryString.f);}

	if(QueryString.f1){ changeSingleFont(decodeURI(QueryString.f1), "#t1_img"); }
	if(QueryString.f2){ changeSingleFont(decodeURI(QueryString.f2), "#t2_img"); }
	if(QueryString.f3){ changeSingleFont(decodeURI(QueryString.f3), "#t3_img"); }
	if(QueryString.f4){ changeSingleFont(decodeURI(QueryString.f4), "#t4_img"); }
	if(QueryString.f5){ changeSingleFont(decodeURI(QueryString.f5), "#t5_img"); }

	
	if(QueryString.b1){ changeSingleBold(decodeURI(QueryString.b1), "#t1_img"); }
	if(QueryString.b2){ changeSingleBold(decodeURI(QueryString.b2), "#t2_img"); }
	if(QueryString.b3){ changeSingleBold(decodeURI(QueryString.b3), "#t3_img"); }
	if(QueryString.b4){ changeSingleBold(decodeURI(QueryString.b4), "#t4_img"); }
	if(QueryString.b5){ changeSingleBold(decodeURI(QueryString.b5), "#t5_img"); }
	
	if(QueryString.i1){ changeSingleItalic(decodeURI(QueryString.i1), "#t1_img"); }
	if(QueryString.i2){ changeSingleItalic(decodeURI(QueryString.i2), "#t2_img"); }
	if(QueryString.i3){ changeSingleItalic(decodeURI(QueryString.i3), "#t3_img"); }
	if(QueryString.i4){ changeSingleItalic(decodeURI(QueryString.i4), "#t4_img"); }
	if(QueryString.i5){ changeSingleItalic(decodeURI(QueryString.i5), "#t5_img"); }
	
	if(QueryString.cw){$('#toolbar_canvas_width').val(QueryString.cw);}
	changeCanvasWidth();
	if(QueryString.ch){$('#toolbar_canvas_height').val(QueryString.ch);}
	changeCanvasHeight();
	
	if(QueryString.z){
		z_indexs = QueryString.z.split(",");
	}
	refreshZIndexs();
}

function createUrl(){
	var url = app_base_url + "?";
	url = url + getBoxProperties4Url("t1_img", 1);
	url = url + getBoxProperties4Url("t2_img", 2);
	url = url + getBoxProperties4Url("t3_img", 3);
	url = url + getBoxProperties4Url("t4_img", 4);
	url = url + getBoxProperties4Url("t5_img", 5);
	url = url + "bg="+$("#background_canvas_color").val();
	//url = url + "&f=" +$('#font_select').find(":selected").text();
	url = url + "&cw="+$("#logo_container").css("width");
	url = url + "&ch="+$("#logo_container").css("height");
	url  = url + "&z=";
	for ( var i = 0; i < z_indexs.length; i++) {
		url  = url + z_indexs[i] + ",";
	}
	return url;
}

function getBoxProperties4Url(boxId, index){
	var text = encodeURI($("#toolbar_t"+index+"_text").val());
	var color = $("#toolbar_t"+index+"_color").val();
	var top = $("#"+boxId).offset().top - $('#logo_container').offset().top;;
	var left  = $("#"+boxId).offset().left -$('#logo_container').offset().left;
	var size = $("#toolbar_t"+index+"_size").val();
	var rotation = $("#toolbar_t"+index+"_rotation").val();
	var font = $("#t"+index+"_img").css("font-family");
	var bold = $("#t"+index+"_img").css("font-weight");
	var italic = $("#t"+index+"_img").css("font-style");
	return "t"+index+"="+text+"&c"+index+"="+color+"&top"+index+"="+top+"&left"+index+"="+left+"&s"+index+"="+size+"&r"+index+"="+rotation+"&f"+index+"="+font+"&b"+index+"="+bold+"&i"+index+"="+italic+"&";
}

function createShortUrl(){
	//alert(createUrl());
	$.ajax({
		url: google_googl_url,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: '{ longUrl: "'+createUrl()+'"}',
        dataType: 'json',
        success: function(response) {
        	showShortUrl(response.id);
        }
     }, "json");
}

function getUrlToShare(){
	if($("#toolbar_share_url").text()!="")
		return $("#toolbar_share_url").text();
	return createUrl();
}

function copyShortUrlToClipboard(){
	CopyToClipboard($("#toolbar_share_url").text());
}


function showShortUrl(url){
	$("#toolbar_share_url").text(url);
	$("#toolbar_share_url").attr("href", url);
	$("#toolbar_share_url_generator").hide();	
	$("#toolbar_share_url").show();	
	$("#toolbar_copy_url").show();	
}

function clearShortUrl(){
	$("#toolbar_share_url").text("");
	$("#toolbar_share_url").attr("href", "#");
	$("#toolbar_share_url").attr("target", "");
	$("#toolbar_share_url").hide();	
	$("#toolbar_copy_url").hide();	
	$("#toolbar_share_url_generator").show();	
}


function postToFacebookWall() {
    var obj = {
      method: 'feed',
      link: getUrlToShare(),
      picture: logo_4_share_url,
      name: app_name,
      caption: app_slogan,
      description: app_description
    };
    function callback(response) {
      document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
    }

    FB.ui(obj, callback);
  }

function postOnGooglePlus(){
	//var urlComplete = "https://m.google.com/app/plus/x/?v=compose&content="+escape(share_message)+"%20"+escape(getUrlToShare())+"&image="+escape(logo_4_share_url);
	var urlComplete = "https://plus.google.com/share?url=" +getUrlToShare();
	
	window.open(urlComplete, "_blank","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
}

function createImage(){
	 $("#logo_container").html2canvas({
		   onrendered: function( canvas ) {
			   var img = canvas.toDataURL();
			   var height = $("#logo_container").height()+210;
			   var width = $("#logo_container").width()+40;
			   var saveWin = window.open("Preview.html", "Save Logo...","height="+height+",width="+width);
			   var imgDownload = img.replace("image/png", "image/octet-stream");
			   saveWin.document.write("<style> body{ font-family: sans-serif; margin: 0px; } div{ padding: 20px; } .hint{ font-size: 8pt; color: gray; } ");
			   saveWin.document.write(" a{display: block; font-weight: bold; text-decoration: none;} .footer{background-color: #ddd; border-top: solid 1px #aaa; text-align: right;}</style>");
			   saveWin.document.write("<link rel=\"shortcut icon\" href=\"favicon.ico\">");
			   saveWin.document.write("<div><img id='imageFullView' class='normal' src='" + img + "' alt='img'/></div>");
			   saveWin.document.write("<div class='footer'><a href='"+imgDownload+"'  download='"+$("#toolbar_t5_text").val()+".png'><input type=\"button\" value=\"Save\" /></a><span class='hint'>On firefox choose a filename with .png extension</a></div>");
			   saveWin.document.write("<a href=\"http://www.000webhost.com/\" onClick=\"this.href='http://www.000webhost.com/684279.html'\" target=\"_blank\"><img src=\"http://www.000webhost.com/images/banners/728x90/banner1.gif\" alt=\"Web Hosting\" width=\"728\" height=\"90\" border=\"0\" /></a></body>");
		}
	 });
	 
	 
	
	 
//	html2canvas( [ document.body ], {
//        onrendered: function(canvas) {
//          document.body.appendChild(canvas);
//        }
//    });
}

var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    	// If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = pair[1];
	    	// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]], pair[1] ];
	      query_string[pair[0]] = arr;
	    	// If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(pair[1]);
	    }
	  } 
	    return query_string;
} ();

function CopyToClipboard(text) {
    Copied = text.createTextRange();
    Copied.execCommand("Copy");
}

function chooseSymbol(inputId){
	selected_textinput = inputId;
    var maskHeight = $(document).height(); 
    var maskWidth = $(window).width();
     
    // calculate the values for center alignment
    var dialogTop =  50;/*(maskHeight/4) - ($('#dialog-box').height());  */
    var dialogLeft = (maskWidth/2) - ($('#symbol-dialog-box').width()/2);
     
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#symbol-dialog-box').css({top:dialogTop, left:dialogLeft}).show();
}

function insertSymbol(textSymbol){
	if(selected_textinput){
		var newText = $("#"+selected_textinput).val() + $("<div>").html(textSymbol).text();
		// $("#toolbar_t5_text").val($("<div>").html("&pi;").text());
		 $("#"+selected_textinput).val(newText);
		 changeText();
		 closeSymbolDialog();
	}
	else
		closeSymbolDialog();
}

function popup(message) {
    // get the screen height and width 
    var maskHeight = $(document).height(); 
    var maskWidth = $(window).width();
     
    // calculate the values for center alignment
    var dialogTop =  50;/*(maskHeight/4) - ($('#dialog-box').height());  */
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
     
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
     
    // display the message
    $('#dialog-message').html(message);
             
}

function showIntro(){
    var maskHeight = $(document).height(); 
    var maskWidth = $(window).width();
     
    // calculate the values for center alignment
    var dialogTop =  50;/*(maskHeight/4) - ($('#dialog-box').height());  */
    var dialogLeft = (maskWidth/2) - ($('#intro-dialog-box').width()/2);
     
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#intro-dialog-box').css({top:dialogTop, left:dialogLeft}).show();
}


function closeAbouDialog(){
    $('#dialog-overlay, #dialog-box').hide();      
    return false;
}

function closeSymbolDialog(){
    $('#dialog-overlay, #symbol-dialog-box').hide();      
    return false;
}


function closeIntroDialog(){
    $('#dialog-overlay, #intro-dialog-box').hide();      
    return false;
}

function reload(){
	if (confirm('Are you sure you wanna do this? you will lose all the changes ...')) { 
		 window.location = app_base_url;
	}
}

function clearAll(){
	if (confirm('Are you sure you wanna do this? you will lose all the changes ...')) { 
		$("#toolbar_t1_text").val("t1");
		$("#toolbar_t2_text").val("t2");
		$("#toolbar_t3_text").val("t3");
		$("#toolbar_t4_text").val("t4");
		$("#toolbar_t5_text").val("t5");
		changeText();
		
		$("#toolbar_t1_color").val("#000000");
		$("#toolbar_t2_color").val("#000000");
		$("#toolbar_t3_color").val("#000000");
		$("#toolbar_t4_color").val("#000000");
		$("#toolbar_t5_color").val("#000000");
		changeColor();
		
		$("#background_canvas_color").val("#ffffff"); 
		changeCanvasColor();
		
		 $("#t1_img").css("top","100");	
		 $("#t2_img").css("top","100");	
		 $("#t3_img").css("top","100");	
		 $("#t4_img").css("top","100");	
		 $("#t5_img").css("top","100");	
		 
		 $("#t1_img").css("left","100");	
		 $("#t2_img").css("left","200");	
		 $("#t3_img").css("left","300");	
		 $("#t4_img").css("left","400");	
		 $("#t5_img").css("left","500");	

		 $("#toolbar_t1_size").val("64");
		 $("#toolbar_t2_size").val("64");
		 $("#toolbar_t3_size").val("64");
		 $("#toolbar_t4_size").val("64");
		 $("#toolbar_t5_size").val("64");
		changeSize();

		 $("#toolbar_t1_rotation").val("0"); 
		 $("#toolbar_t2_rotation").val("0"); 
		 $("#toolbar_t3_rotation").val("0"); 
		 $("#toolbar_t4_rotation").val("0"); 
		 $("#toolbar_t5_rotation").val("0"); 
		changeRotation();

		changeSingleFont("Arial", "#t1_img");
		changeSingleFont("Arial", "#t2_img");
		changeSingleFont("Arial", "#t3_img");
		changeSingleFont("Arial", "#t4_img");
		changeSingleFont("Arial", "#t5_img");
		
		changeSingleBold("normal", "#t1_img");
		changeSingleBold("normal", "#t2_img");
		changeSingleBold("normal", "#t3_img");
		changeSingleBold("normal", "#t4_img");
		changeSingleBold("normal", "#t5_img");
		
		changeSingleItalic("normal", "#t1_img");
		changeSingleItalic("normal", "#t2_img");
		changeSingleItalic("normal", "#t3_img");
		changeSingleItalic("normal", "#t4_img");
		changeSingleItalic("normal", "#t5_img");
	
		$('#toolbar_canvas_width').val("700");
		changeCanvasWidth();
		$('#toolbar_canvas_height').val("300");
		changeCanvasHeight();
		
		z_indexs = new Array(1,2,3,4,5);
		refreshZIndexs();
	}
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
	    {
	    return unescape(y);
	    }
	  }
}
