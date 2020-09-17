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
      $stmt = $conn->prepare("SELECT `noteId`, `creationDate`, `text` FROM `notes` WHERE BINARY `user` = ? ORDER BY `creationDate` DESC");
      $stmt->bind_param("s", $email);
      $stmt->execute();
      $stmt->bind_result($noteId, $creationDate, $text);
      $resp["notes"] = array();
      while ($stmt->fetch())
      {
        $note['noteId']=$noteId;
        $note['creationDate']=$creationDate;
        $note['text']=$text;
        array_push($resp["notes"], $note);
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
