var currentScreen;
var uid = "";
var img_src = "";
var currentNoteId = "";
var all_notes;
var selected_notes = [];
var cols, lcols;

$(document).ready(function(){
	if(currentScreen == "login")
	{
		img_src = "img/loading.png";
		loadLogin();
		scale();
		newLogin(function(response){
			if(response.error == true)
			{
				error(response.error_message);
			}
			else
			{
				uid = response.uid;
				console.log(uid);
				img_src = "https://zxing.org/w/chart?cht=qr&chs=400x400&chld=H&choe=UTF-8&chl=" + uid;
				$("#qrimg").attr("src", img_src);
			}
		});
	}
	else if(currentScreen == "notes")
	{
		getNotes();
	}
});

function scale()
{
	if(currentScreen == "login")
	{
		if($(window).width() >= 1050)
		{
			$(".side").width(($(window).width() - 1000)/2);
			$("#content").width(1000);
		}
		else
		{
			$(".side").width(25);
			$("#content").width($(window).width() - 50);
		}
		$("#content_row").height($(window).height() - 80);

		loadLogin();
	}
	else if(currentScreen == "signup")
	{
		if($(window).width() >= 1050)
		{
			$(".side").width(($(window).width() - 1000)/2);
			$("#content").width(1000);
		}
		else
		{
			$(".side").width(25);
			$("#content").width($(window).width() - 50);
		}
		$("#content_row").height($(window).height() - 80);
	}
	else if(currentScreen == "notes")
	{
		if($(window).width() >= 1050)
		{
			$(".side").width(($(window).width() - 1000)/2);
			$("#content").width(1000);
			cols = 4;
		}
		else if($(window).width() >= 800)
		{
			$(".side").width(($(window).width() - 750)/2);
			$("#content").width(750);
			cols = 3;
		}
		else if($(window).width() >= 550)
		{
			$(".side").width(($(window).width() - 500)/2);
			$("#content").width(500);
			cols = 2;
		}
		else if($(window).width() >= 300)
		{
			$(".side").width(($(window).width() - 250)/2);
			$("#content").width(250);
			cols = 1;
		}
		else
		{
			$(".side").width(25);
			$("#content").width($(window).width() - 50);
			cols = 1;
		}
		$("#content_row").height($(window).height() - 80);

		if(cols != lcols)
		{
			lcols = cols;
			loadNotes();
		}
	}
	else if(currentScreen == "note")
	{
		if($(window).width() >= 1050)
		{
			$(".side").width(($(window).width() - 1000)/2);
			$("#content").width(1000);
		}
		else
		{
			$(".side").width(25);
			$("#content").width($(window).width() - 50);
		}
		$("#note_textarea").height($(window).height() - 280);
	}
}

function getNotes()
{
	getAllNotes(function(response){
		if(response.error == true)
		{
			error(response.error_message);
		}
		else
		{
			all_notes = response;
			loadNotes();
			scale();
		}
	});
}

function loadLogin()
{
	currentScreen = "login";

	var header = '<img src="img/logo.png" class="logo float_left"/>' +
				 '<button id="signup" class="header_item header_item_normal float_right">SIGN UP</button>' +
				 '<button id="login_credentials" class="header_item header_item_normal float_right">LOG IN WITH CREDENTIALS</button>';
	$("#header").html(header);

	var content = '<div id="content_wrapper">' +
						'<table width="100%">' +
							'<tr>' +
								'<td>' +
									'<ol class="text" type="1">' +
										'<li>Open Save4Later app on your smartphone</li><br/>' +
										'<li>Make sure you are logged into the app</li><br/>' +
										'<li>Scan the QR code on the right</li><br/>' +
										'<li>Click on the Login button below</li>' +
									'</ol>' +
									'<br/><br/>' +
									'<span class="text">You can get the app here:</span><br/>' +
									'<a href="http://www.amazon.com/gp/product/B07RLJ59CP/ref=mas_pm_save4later" target="_blank"><img src="https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/devportal2/res/images/amazon-appstore-badge-english-black.png" style="width: 180px;"/></a>' +
								'</td>';
	if($(window).width() < 800)
	{
		content += 				'</tr><tr>';
	}
	content +=					'<td style="text-align: center;">' +
									'<img id="qrimg" src="' + img_src + '"/>' +
								'</td>' +
							'</tr>' +
							'<tr>' +
								'<td colspan="2" style="text-align: center;">' +
									'<button id="login_button"><span style="font-size: 24px;">LOG IN</span></button>' +
								'</td>' +
							'</tr>' +
						'</table>' +
					'</div>';
	$("#content").html(content);
	$("#content").css({
		"box-shadow":"0 0 10px 0 #BBBBBBAA",
		"border-radius":"10px",
		"text-align":"left"
	});
}

function loadLoginCredentials()
{
	currentScreen = "login_credentials";

	var header = '<img src="img/logo.png" class="logo float_left"/>' +
				 '<button id="login" class="header_item header_item_normal float_right">SCAN QR</button>';
	$("#header").html(header);

	var content = '<div id="content_wrapper">' +
					  '<span class="text">Please enter your email address and password.</span><br/><br/>' +
					  '<input type="email" id="login_credentials_email" class="input" placeholder="Email"/><br/><br/>' +
					  '<input type="password" id="login_credentials_password" class="input" placeholder="Password"/><br/><br/>' +
					  '<button id="login_credentials_button"><span style="font-size: 24px;">LOG IN</span></button>' +
				  '</div>';
	$("#content").html(content);
	$("#content").css({
		"box-shadow":"0 0 10px 0 #BBBBBBAA",
		"border-radius":"10px",
		"text-align":"center"
	});
}

function loadSignup()
{
	currentScreen = "signup";

	var header = '<img src="img/logo.png" class="logo float_left"/>' +
				 '<button id="login" class="header_item header_item_normal float_right">LOG IN</button>';
	$("#header").html(header);

	var content =   '<div id="content_wrapper">' +
						'<span class="text">Please enter your email address and choose a password.</span><br/><br/>' +
						'<input type="email" id="signup_email" class="input" placeholder="Email"/><br/><br/>' +
						'<input type="password" id="signup_password" class="input" placeholder="Password"/><br/><br/>' +
						'<input type="password" id="signup_confirm" class="input" placeholder="Confirm password"/><br/><br/>' +
						'<button id="signup_button"><span style="font-size: 24px;">CREATE ACCOUNT</span></button>' +
					'</div>';
	$("#content").html(content);
	$("#content").css({
		"box-shadow":"0 0 10px 0 #BBBBBBAA",
		"border-radius":"10px",
		"text-align":"center"
	});
}

function loadNotes()
{
	currentScreen = "notes";

	var header = '<img src="img/logo.png" class="logo float_left"/>' +
				 '<button id="logout" class="header_item header_item_normal float_right logout">LOG OUT</button>' +
				 '<button id="new_note" class="header_item header_item_accent float_right">+ NEW NOTE</button>' +
				 '<button id="refresh" class="icon float_right"><i class="material-icons" style="font-size: 28px;">refresh</i></button>';
	$("#header").html(header);

	var content = '<table style="border-collapse: collapse;"><tr>';
	var i;
	i = 1;
	selected_notes = [];
	all_notes.notes.forEach(function(note){
		content += '<td class="note_td"><div class="note_cell" data-note_id="' + note.noteId + '"><button class="check_box" data-note_id="' + note.noteId + '"><i class="material-icons">check_box_outline_blank</i></button>' + note.text + '</div></td>';
		if(i == cols)
		{
			i = 1;
			content += '</tr><tr>';
		}
		else
		{
			i++;
		}
		selected_notes[note.noteId] = false;
	});
	content += '</tr></table>';
	$("#content").html(content);
	$("#content").css({
		"box-shadow":"none",
		"border-radius":"0",
		"text-align":"left"
	});
}

function loadNote(noteId)
{
	currentScreen = "note";
	currentNoteId = noteId;

	var header = '<button id="done" class="icon float_left"><i class="material-icons" style="font-size: 28px;">done</i></button>' +
				 '<button id="logout" class="header_item header_item_normal float_right">LOG OUT</button>' +
				 '<button id="delete" class="icon float_right"><i class="material-icons" style="font-size: 28px;">delete</i></button>';
	$("#header").html(header);

	var content = '<div id="content_wrapper">' +
						'<textarea id="note_textarea" spellcheck="false">';
	for (var i = 0; i < all_notes.notes.length; i++) {
		if(all_notes.notes[i].noteId == noteId)
		{
			content += all_notes.notes[i].text;
		}
	}
	content += 			'</textarea>' +
					'</div>';

	$("#content").html(content);
	$("#note_textarea").focus();
	$("#content").css({
		"box-shadow":"0 0 10px 0 #BBBBBBAA",
		"border-radius":"10px",
		"text-align":"left"
	});
}

function loadSelection()
{
	currentScreen = "selection";
	var nr = 0;

	for (var noteId in selected_notes) {
	    var selected = selected_notes[noteId];
	    if(selected == true)
	    {
	    	nr++;
	    }
	}

	var header = '<button id="back" class="icon float_left"><i class="material-icons" style="font-size: 28px;">arrow_back</i></button>' +
				 '<span class="text selected_text">' + nr + ' notes selected' + '</span>' +
				 '<button id="logout" class="header_item header_item_normal float_right">LOG OUT</button>' +
				 '<button id="delete_selected" class="icon float_right"><i class="material-icons" style="font-size: 28px;">delete</i></button>' +
				 '<button id="select_all" class="icon float_right"><i class="material-icons" style="font-size: 28px;">select_all</i></button>';
	$("#header").html(header);

	$("#content").css({
		"box-shadow":"none",
		"border-radius":"0",
		"text-align":"left"
	});

	$(".check_box").css({
		"opacity":"1"
	});
}

function openNote(noteId)
{
	loadNote(noteId);
	scale();
}

function selectNote(noteId)
{
	if(selected_notes[noteId] == false)
	{
		selected_notes[noteId] = true;
	}
	else
	{
		selected_notes[noteId] = false;
	}
	loadSelection();
}

function deleteSelected()
{
	var more = 0;
	var id;
	for (var noteId in selected_notes) {
	    var selected = selected_notes[noteId];
	    if(selected == true)
	    {
	    	if(more == 0)
	    	{
	    		id = noteId;
	    	}
	    	more = 1;
	    }
	}

	if(more == 1)
	{
		deleteNote(id, function(response){
			if(response.error == true)
			{
				error(response.error_message);
			}
			selected_notes[id] = false;
			deleteSelected();
		});
	}
	else
	{
		getNotes();
	}
}

function error(error_message)
{
	console.log("Error: " + error_message);
}

// EVENTS

$(window).on('resize', function(){
	scale();
});

$(document).on("click", "#login_button", function(){
	checkLogin(uid, function(response){
		if(response.error == true)
		{
			error(response.error_message);
		}
		else
		{
			getNotes();
		}
	});
});

$(document).on("click", "#login_credentials_button", function(){
	var login_credentials_email = $("#login_credentials_email").val();
	var login_credentials_password = $("#login_credentials_password").val();

	loginCredentials(uid, login_credentials_email, login_credentials_password, function(response){
		if(response.error == true)
		{
			error(response.error_message);
		}
		else
		{
			checkLogin(uid, function(response2){
				if(response2.error == true)
				{
					error(response2.error_message);
				}
				else
				{
					getNotes();
				}
			});
		}
	});
});

$(document).on("click", "#signup_button", function(){
	var signup_email = $("#signup_email").val();
	var signup_password = $("#signup_password").val();
	var signup_confirm = $("#signup_confirm").val();
	console.log(signup_email);
	if(signup_password != signup_confirm)
	{
		error("PASSWORDS_DONT_MATCH");
	}
	else
	{
		signup(signup_email, signup_password, function(response){
			if(response.error == true)
			{
				error(response.error_message);
			}
			else
			{
				loadLogin();
				scale();
			}
		});
	}
});

$(document).on("click", "#login", function(){
	loadLogin();
	scale();
});

$(document).on("click", "#login_credentials", function(){
	loadLoginCredentials();
	scale();
});

$(document).on("click", "#signup", function(){
	loadSignup();
	scale();
});

$(document).on("click", "#logout", function(){
	window.location.replace("logout.php");
});

$(document).on("click", "#new_note", function(){
	newNote("", function(response){
		if(response.error == true)
		{
			error(response.error_message);
		}
		else
		{
			getAllNotes(function(response2){
				if(response2.error == true)
				{
					error(response2.error_message);
				}
				else
				{
					all_notes = response2;
					loadNote(response.noteId);
					scale();
				}
			});
		}
	});
});

$(document).on("click", "#back", function(){
	loadNotes();
	scale();
});

$(document).on("click", "#done", function(){
	modifyNote(currentNoteId, $("#note_textarea").val(), function(response){
		if(response.error == true)
		{
			error(response.error_message);
		}
		else
		{
			getNotes();
		}
	});
});

$(document).on("click", "#delete", function(){
	deleteNote(currentNoteId, function(response){
		if(response.error == true)
		{
			error(response.error_message);
		}
		else
		{
			getNotes();
		}
	});
});

////

$(document).on("mouseover", ".note_cell", function(){
	$(this).find("button.check_box").css("opacity", "1");
});

$(document).on("mouseleave", ".note_cell", function(){
	if(currentScreen == "notes")
	{
		$(this).find("button.check_box").css("opacity", "0");
	}
});

$(document).on("click", ".note_cell", function(e){
	if(this === e.target)
	{
		openNote($(this).data("note_id"));
	}
});

$(document).on("click", ".note_cell > button.check_box", function(){
	var noteId;
	noteId = $(this).data("note_id");
	if(selected_notes[noteId] == false)
	{
		$(this).find("i").html("check_box");
	}
	else
	{
		$(this).find("i").html("check_box_outline_blank");
	}
	selectNote(noteId);
});

$(document).on("click", "#delete_selected", function(){
	deleteSelected();
});

$(document).on("click", "#select_all", function(){
	var all_selected = 1;
	for (var noteId in selected_notes)
	{
		if(selected_notes[noteId] == false)
		{
			all_selected = 0;
		}
	}

	if(all_selected == 0)
	{
		for (var noteId in selected_notes)
		{
		    selected_notes[noteId] = true;
		}
		$(".check_box").find("i").html("check_box");
	}
	else
	{
		for (var noteId in selected_notes)
		{
		    selected_notes[noteId] = false;
		}
		$(".check_box").find("i").html("check_box_outline_blank");
	}
	loadSelection();	
});

$(document).on("click", "#refresh", function(){
	getNotes();
});