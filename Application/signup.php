
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
  <title>Movie-ception</title>

  <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="manifest" href="images/site.webmanifest">

  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="js/main.js"></script>
</head>
<body>
    <nav class="navbar navbar-default">
        <div class="container">
        <div class="navbar-header">
            <a id="logolink" class="navbar-brand" href="index.html">
            <img id="navlogo" src="images/logo.jpg" alt="mclogo">
            <span id="logoname">Movie-ception</span>
            <li><a href="login.php">Login</a></li>
            <li><a href="signup.php">Sign Up</a></li>
            </a>
        </div>
        </div>
    </nav>
   
    <div class="loginbox">
            <h1>Sign Up Here</h1>
            <div class="signup-form">
                <form action="includes/signup.inc.php" method ="post">
                    <input type="text" name="username" placeholder="Username...">
                    <input type="text" name="email" placeholder="Email...">
                    <input type="text" name="password" placeholder="Password...">
                    <input type="text" name="passwordrepeat" placeholder="Repeat Password...">
                    <button type="submit" name="submit">Sign Up</button>
                </form> 
            </div>
    </div>
</body>
</html>