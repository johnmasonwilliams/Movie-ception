<?php

    if (isset($_POST["submit"])){
        $username = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $passwordRepeat = $_POST["passwordrepeat"];

        require_once '../connections/config.php';
        require_once 'functions.inc.php';
        
        if(emtpyInputSignup($username, $email, $password, $passwordRepeat) !== false){
            header("location: ../signup.php?error=emptyinput");
            exit();
        }

        if(invalidUsername($username) !== false){
            header("location: ../signup.php?error=invalidUsername");
            exit();
        }

        if(invalidEmail($email) !== false){
            header("location: ../signup.php?error=invalidEmail");
            exit();
        }

        if(checkPasswords($password, $passwordRepeat) !== false){
            header("location: ../signup.php?error=passwordsdontmatch");
            exit();
        }

        if(usernameExists($link, $username, $email) !== false){
            header("location: ../signup.php?error=usernametaken");
            exit();
        }

        createUser($link, $username, $email, $password);

    }
    else { 
        header("location: signup.php");
        exit();
    }

?>