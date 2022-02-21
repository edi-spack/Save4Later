<?php
  session_start();
  include("mysql-login-info.php");

  function generateNoteId()
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
  
  // text
  if(isset($_POST['text']))
  {
    $text = $_POST['text'];
  }
  else
  {
    $text = '';
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
      if(strlen($text) > 65535)
      {
        $resp["error"] = true;
        $resp["error_message"] = "TEXT_TOO_LONG";
      }
      else
      {
        //check if noteId already exists
        $stmt = $conn->prepare("SELECT `user` FROM `notes` WHERE BINARY `noteId` = ?");
        $stmt->bind_param("s", $id);
        $id = generateNoteId();
        $stmt->execute();
        $stmt->store_result();
        while ($stmt->num_rows > 0)
        {
          $id = generateNoteId();
          $stmt->execute();
          $stmt->store_result();
        }
        $stmt->close();


        $stmt = $conn->prepare("INSERT INTO `notes` VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $id, $text, $email, $creationDate);
        $creationDate = date("Y-m-d h:i:s");
        $stmt->execute();
        $resp["noteId"] = $id;
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
