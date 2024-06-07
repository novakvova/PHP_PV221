<?php
include_once $_SERVER["DOCUMENT_ROOT"]."/connection_database.php";
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
        <a class="btn btn-success" href="/create.php">Додати</a>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Фото</th>
                <th scope="col">ПІБ</th>
                <th scope="col">Телефон</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <?php
            $sql = 'SELECT * FROM tbl_users';
            foreach ($pdo->query($sql) as $row) {
                $id = $row['id'];
                $name = $row['name'];
                $image = "/".MEDIA."/".$row['image'];
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
                <td>
                    <button class='btn btn-danger' data-delete='${id}'>Видалити</button>
                </td>
            </tr>
                ";
            }
            ?>
            </tbody>
        </table>
    </div>
</main>

<div class="modal" id="dialogDelete" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Підтвердіть операцію</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Ви дійсно бажаєте видалити елемент?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                <button type="button" class="btn btn-danger" id="dialogDeleteYes">Видалити</button>
            </div>
        </div>
    </div>
</div>


<script src="/js/bootstrap.bundle.min.js"></script>
<script src="/js/axios.min.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const dialogDelete = new bootstrap.Modal("#dialogDelete");
        const dialogDeleteYes = document.getElementById("dialogDeleteYes");
        let deleteId=0;
        dialogDeleteYes.addEventListener("click", function () {
            //console.log("Підтвердили видалення елемента", deleteId);
            const headers = {
                'Content-Type': 'multipart/form-data', // This header is set automatically by Axios when using FormData
            };
            axios.post("/delete.php", {
                id: deleteId
            }, { headers })
                .then(resp => {
                console.log("Delete is good");
                window.location.reload(); // якщо запит успішний перегружаємо сторінку і запис зникне із таблиці
            });
            //dialogDelete.hide();
        });

        // Select all elements with the data-delete attribute
        const deleteButtons = document.querySelectorAll('[data-delete]');


        // Attach a click event listener to each button
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // Get the value of the data-delete attribute
                const deleteValue = event.target.getAttribute('data-delete');
                console.log(`Delete item with ID: ${deleteValue}`);
                deleteId = deleteValue;
                dialogDelete.show();
                // Add your delete logic here
            });
        });
    });
</script>

</body>
</html>