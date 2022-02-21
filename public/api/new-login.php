<?php
  session_start();
  include("mysql-login-info.php");

  function generateUid()
  {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters) - 1;
      $randomString = '';
      for ($i = 0; $i < 15; $i++)
      {
          $randomString .= $characters[rand(0, $charactersLength)];
      }
      return $randomString;
  }

  $resp["error"] = false;

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error)
  {
    $resp["error"] = true;
    $resp["error_message"] = "DATABASE_INACCESSIBLE";
  }
  else
  {
  	//check if uid already exists
    $stmt = $conn->prepare("SELECT `email` FROM `login-uids` WHERE BINARY `uid` = ?");
    $stmt->bind_param("s", $uid);
    $uid = generateUid();
    $stmt->execute();
    $stmt->store_result();
    while ($stmt->num_rows > 0)
    {
    	$uid = generateUid();
	    $stmt->execute();
	    $stmt->store_result();
    }
    $stmt->close();


    //new record with new uid
    $stmt = $conn->prepare("INSERT INTO `login-uids` (`uid`, `creationDate`) VALUES (?, ?)");
    $stmt->bind_param("ss", $uid, $creationDate);

    $creationDate = date("Y-m-d h:i:s");
    $stmt->execute();

    $resp["uid"] = $uid;
  }

  $respJSON = json_encode($resp);
  echo $respJSON;

  $stmt->close();
  $conn->close();
?>
