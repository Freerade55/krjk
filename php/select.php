<?php

const ROOT = __DIR__;
require ROOT . "/dbConnect.php";


$query = "SELECT id, name FROM users";

$result = connectToBd($query, "GET");


echo json_encode($result, true);













