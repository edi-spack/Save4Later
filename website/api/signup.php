<?php
  session_start();
  include("mysql-login-info.php");

  // get parameters

  // email
  if(isset($_POST['email']))
  {
    $email = $_POST['email'];
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
  else
  {
    $psw = '';
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
    $stmt = $conn->prepare("SELECT `email` FROM `users` WHERE `email` = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows > 0)
    {
      $resp["error"] = true;
      $resp["error_message"] = "ALREADY_EXISTS";
    }
    else
    {
      if (filter_var($email, FILTER_VALIDATE_EMAIL))
      {
        if(strlen($psw) >= 8)
        {
          $stmt = $conn->prepare("INSERT INTO `users` VALUES (?, ?)");
          $stmt->bind_param("ss", $email, $psw);
          $stmt->execute();
        }
        else
        {
          $resp["error"] = true;
          $resp["error_message"] = "PASSWORD_TOO_SHORT";
        }
      }
      else
      {
        $resp["error"] = true;
        $resp["error_message"] = "EMAIL_INVALID";
      }
    }
  }

  $respJSON = json_encode($resp);
  echo $respJSON;

  $stmt->close();
  $conn->close();
?>
