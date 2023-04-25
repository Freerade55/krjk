<?php
const ROOT = __DIR__;
require ROOT . "/dbConnect.php";

$now = new DateTime();
$date = $now->format('Y-m-d');

$query = "SELECT task_id, name, object, address, task, contacts, comment, task_initiator, task_status, date, zayavk_nomer, srok_ispolnenya FROM tasks
        INNER JOIN users
        ON tasks.id = users.id
        WHERE tasks.date = '$date'
        ORDER BY tasks.task_id";

$result = connectToBd($query, "GET");


echo json_encode($result, true);
















