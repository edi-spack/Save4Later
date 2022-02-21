<?php
	session_start();
	session_unset();
	session_destroy();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Save4Later</title>
		<script>
			window.location.replace("index.php");
		</script>
	</head>
	<body></body>
</html>