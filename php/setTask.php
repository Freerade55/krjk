<?php

const ROOT = __DIR__;
require ROOT . "/dbConnect.php";

$task = json_decode(file_get_contents( 'php://input'), true);



$date = DateTime::createFromFormat('d.m.Y', $task['dataZayavki'])->format('Y-m-d');

$task["ispolnitelId"] = intval($task["ispolnitelId"]);

$query = "INSERT INTO tasks (id, object, address, task, contacts, comment, task_initiator, task_status,
            date, srok_ispolnenya, coords, zayavk_nomer)
                    VALUES ('{$task["ispolnitelId"]}', '{$task["object"]}',
                    '{$task["address"]}', '{$task["zadachi"]}', '{$task["contacts"]}', '{$task["comment"]}', '{$task["initiator"]}', false , '$date', '{$task["srokIspolnenya"]}', '{$task["coords"][0][0]}, {$task["coords"][0][1]}', '{$task["nomerZayavki"]}')";



$result = connectToBd($query, "INSERT");







