<?php
  session_start();
  include("mysql-login-info.php");

  // get parameters

  // email
  if(isset($_POST['email']))
  {
    $email = $_POST['email'];
  }
  else if(isset($_SESSION['email']))
  {
    $email = $_SESSION['email'];
  }
  else
  {
    $email = '';
  }

  // password
  if(isset($_POST['password']))
  {
    $psw = $_POST['password'];
  }
  else if(isset($_SESSION['password']))
  {
    $psw = $_SESSION['password'];
  }
  else
  {
    $psw = '';
  }

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
    $stmt = $conn->prepare("SELECT `email` FROM `users` WHERE BINARY `email` = ? AND BINARY `password` = ?");
    $stmt->bind_param("ss", $email, $psw);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows == 1)
    {
      $stmt = $conn->prepare("SELECT `uid` FROM `login-uids` WHERE BINARY `uid` = ?");
      $stmt->bind_param("s", $uid);
      $stmt->execute();
      $stmt->store_result();
      if($stmt->num_rows == 1)
      {
  	  	$stmt = $conn->prepare("SELECT `uid` FROM `login-uids` WHERE BINARY `uid` = ? AND `email` IS NULL AND ? <= ADDTIME(`creationDate`, '00:05:00')");
  	    $stmt->bind_param("ss", $uid, $td);
  	    $td = date('Y-m-d h:i:s');
  	    $stmt->execute();
  	    $stmt->store_result();
  	    if($stmt->num_rows == 1)
  	    {
  	    	$stmt = $conn->prepare("UPDATE `login-uids` SET `email` = ? WHERE BINARY `uid` = ?");
          $stmt->bind_param("ss", $email, $uid);
          $stmt->execute();
  	    }
  	    else
  	    {
  	    	$resp["error"] = true;
          $resp["error_message"] = "UID_EXPIRED";
  	    }
      }
      else
      {
        $resp["error"] = true;
        $resp["error_message"] = "WRONG_UID";
      }      
    }
    else
    {
      $resp["error"] = true;
      $resp["error_message"] = "WRONG_CREDENTIALS";
    }
  }

  $respJSON = json_encode($resp);
  echo $respJSON;

  $stmt->close();
  $conn->close();
?>
