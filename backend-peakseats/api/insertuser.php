<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Include DB connection
require_once "../config.php";

// Read JSON
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["message" => "No data received"]);
    exit;
}

$fullname = $input["fullname"];
$email = $input["email"];
$username = $input["username"];
$password = $input["password"];

// Insert into database
$stmt = $conn->prepare("INSERT INTO users (Full_Name, Email_Address, Username,Password) VALUES (?, ?,?,?)");
$stmt->bind_param("ssss", $name, $email, $username, $pass);

if ($stmt->execute()) {
    echo json_encode(["message" => "Data saved successfully"]);
} else {
    echo json_encode(["message" => "Failed to save data"]);
}

$stmt->close();
$conn->close();
?>