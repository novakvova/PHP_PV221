<?php
// Database credentials
$host = 'localhost';
$dbname = 'local.pv221.com';
$username = 'root';
$password = '123456';

// Connection string
$dsn = "mysql:host=$host;dbname=$dbname";

// Attempt to connect
try {
    $pdo = new PDO($dsn, $username, $password);
    // Set PDO to throw exceptions on errors
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
<main>
    <div class="container">
        <h1>Користувачі</h1>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Фото</th>
                <th scope="col">ПІБ</th>
                <th scope="col">Телефон</th>
                <th scope="col">Email</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $sql = 'SELECT * FROM tbl_users';
            foreach ($pdo->query($sql) as $row) {
                $id = $row['id'];
                $name = $row['name'];
                $image = $row['image'];
                $email = $row['email'];
                $phone = $row['phone'];
                echo "
            <tr>
                <th scope='row'>$id</th>
                <td>
                    <img src='$image'
                         width='150'
                         alt='$name'>
                </td>
                <td>$name</td>
                <td>$phone</td>
                <td>$email</td>
            </tr>
                ";
            }
            ?>
            </tbody>
        </table>
    </div>
</main>


<script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>