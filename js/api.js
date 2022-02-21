function checkLogin(uid, callback)
{
	var url = "api/check-login.php";
	var params = {
		"uid": uid
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function deleteNote(noteId, callback)
{
	var url = "api/delete-note.php";
	var params = {
		"noteId": noteId
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function getAllNotes(callback)
{
	var url = "api/get-all-notes.php";
	var params = {};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function getNote(noteId, callback)
{
	var url = "api/get-note.php";
	var params = {
		"noteId": noteId
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function login(uid, callback)
{
	var url = "api/login.php";
	var params = {
		"uid": uid
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function loginCredentials(uid, email, password, callback)
{
	var url = "api/login.php";
	var params = {
		"uid": uid,
		"email": email,
		"password": password
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function modifyNote(noteId, text, callback)
{
	var url = "api/modify-note.php";
	var params = {
		"noteId": noteId,
		"text": text
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function newLogin(callback)
{
	var url = "api/new-login.php";
	var params = {};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function newNote(text, callback)
{
	var url = "api/new-note.php";
	var params = {
		"text": text
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}

function signup(email, password, callback)
{
	var url = "api/signup.php";
	var params = {
		"email": email,
		"password": password
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		dataType: "json",
		success: function(response, textStatus, jgXHR)
		{
			callback(response);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			var response = {
				"error": true,
				"error_message": textStatus + ": " + errorThrown
			};
			callback(response);
		}
	});
}