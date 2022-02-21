<?php
  session_start();
  include("mysql-login-info.php");

  // get parameters

  // uid
  if(isset($_POST['uid']))
  {
    $uid = $_POST['uid'];
  }
  else
  {
    $uid = '';
  }

  // logic

	$resp["error"] = false;

	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error)
	{
		$resp["error"] = true;
		$resp["error_message"] = "DATABASE_INACCESSIBLE";
	}
	else
	{
		$stmt = $conn->prepare("SELECT `email` FROM `login-uids` WHERE `uid` = ?");
		$stmt->bind_param("s", $uid);
		$stmt->execute();
		$stmt->store_result();
		$stmt->bind_result($email);
		if($stmt->num_rows == 1)
		{
			while ($stmt->fetch())
			{
				if($email != false)
				{
					$stmt = $conn->prepare("SELECT `password` FROM `users` WHERE `email` = ?");
					$stmt->bind_param("s", $email);
					$stmt->execute();
					$stmt->store_result();
					$stmt->bind_result($psw);
					if($stmt->num_rows == 1)
					{
						while ($stmt->fetch())
						{
							//$resp["email"] = $email;
							//$resp["password"] = $psw;

							$_SESSION['email'] = $email;
							$_SESSION['password'] = $psw;
						}
					}
				}
				else
				{
					$resp["error"] = true;
					$resp["error_message"] = "UID_NOT_SCANNED";
				}
			}
		}
		else
		{
			$resp["error"] = true;
			$resp["error_message"] = "WRONG_UID";
		}
	}

	$respJSON = json_encode($resp);
  	echo $respJSON;

	$stmt->close();
	$conn->close();
?>
