<?php

function emtpyInputSignup($username, $email, $password, $passwordRepeat) {
    $result;
    if (empty($username) || empty($email) || empty($password) || empty($passwordRepeat)){
        $result = true;
    } else {
        $result = false;
        }
    return $result;
}

function invalidUsername($username) {
    $result;
    if (!preg_match(("/^[a-zA-Z0-9]*$/"), $username))
        $result = true;
    else {
        $result = false;
        }
    return $result;
}

function invalidEmail($email) {
    $result;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        $result = true;
    else {
        $result = false;
        }
    return $result;
}

function checkPasswords($password, $passwordRepeat) {
    $result;
    if ($password !== $passwordRepeat)
        $result = true;
    else {
        $result = false;
        }
    return $result;
}

function usernameExists($link, $username, $email) {
    $sql = "SELECT * FROM users WHERE username = ? OR email = ?;";
    $stmt = mysqli_stmt_init($link);
    if (!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../signup.php?error=usernametaken");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)){
        return $row;
    }
    else {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);
}

function createUser($link, $username, $email, $password) {
    $sql = "INSERT INTO users (username, password, email) VALUES (?,?,?)";
    $stmt = mysqli_stmt_init($link);
    if (!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../signup.php?error=usernametaken");
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "sss", $username, $hashedPassword, $email);
    mysqli_stmt_execute($stmt);

    mysqli_stmt_close($stmt);

    header("location: ../login.php?error=signupsuccess");
    exit();
}



?>