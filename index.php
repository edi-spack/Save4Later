<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Save4Later</title>
		<link href="https://fonts.googleapis.com/css?family=Roboto:500" rel="stylesheet">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<script src="js/jquery-3.4.0.min.js"></script>
		<script src="js/api.js"></script>
		<script>
			<?php if(!isset($_SESSION['email']) || !isset($_SESSION['password'])): ?>
			var currentScreen = "login";
			<?php else: ?>
			var currentScreen = "notes";
			<?php endif; ?>
		</script>
		<script src="js/index.js"></script>
	</head>
	<body>
		<table id="container">
			<tr id = "header_row">
				<td colspan="3">
					<div id="header"></div>
				</td>
			</tr>
			<tr id="content_row">
				<td class="side"></td>
				<td>
					<div id="content"></div>
				</td>
				<td class="side"></td>
			</tr>
		</table>
	</body>
</html>