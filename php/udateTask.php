<?php

const ROOT = __DIR__;
require ROOT . "/dbConnect.php";

$task = json_decode(file_get_contents( 'php://input'), true);


$date = DateTime::createFromFormat('d.m.Y', $task['dataZayavki'])->format('Y-m-d');


$task["ispolnitelId"] = intval($task["ispolnitelId"]);
$task["bdID"] = intval($task["bdID"]);


$query = "UPDATE tasks SET id = '{$task["ispolnitelId"]}', 
            object = '{$task["object"]}', 
            address = '{$task["address"]}', 
            task = '{$task["zadachi"]}', 
            contacts = '{$task["contacts"]}', 
            comment = '{$task["comment"]}', 
            task_initiator = '{$task["initiator"]}', 
            date = '$date', 
            srok_ispolnenya = '{$task["srokIspolnenya"]}', 
            zayavk_nomer = '{$task["nomerZayavki"]}'
            WHERE task_id = '{$task["bdID"]}'";

print_r($query);

$result = connectToBd($query, "UPDATE");








