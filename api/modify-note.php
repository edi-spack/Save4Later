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

  // noteId
  if(isset($_POST['noteId']))
  {
    $noteId = $_POST['noteId'];
  }
  else
  {
    $noteId = '';
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
      $stmt = $conn->prepare("SELECT `user` FROM `notes` WHERE BINARY `user` = ? AND BINARY `noteId` = ?");
      $stmt->bind_param("ss", $email, $noteId);
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
          $stmt = $conn->prepare("UPDATE `notes` SET `text` = ? WHERE BINARY `noteId` = ?");
          $stmt->bind_param("ss", $text, $noteId);
          $stmt->execute();
        }
      }
      else
      {
        $resp["error"] = true;
        $resp["error_message"] = "WRONG_NOTE_ID";
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
