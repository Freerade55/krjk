<?php

const HOSTNAME = "localhost";
const USERNAME = "u2030778_default";
const PASSWORD = "RqKc3A0V5ye4FpwL";
const DATABASE = "u2030778_default";

function connectToBd($query, $method) {

    $db = mysqli_connect(HOSTNAME, USERNAME, PASSWORD, DATABASE);
    mysqli_set_charset($db, "utf8");

    if (!$db) {
        die('Could not connect to database!');
    }

    $result = mysqli_query($db, $query);


    if($method == "GET") {


        $result = mysqli_fetch_all($result, MYSQLI_ASSOC);


    }


    mysqli_close($db);

    return $result;



}
