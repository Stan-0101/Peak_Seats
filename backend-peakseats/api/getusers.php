<?php
// getusers.php - Simplified Version

// CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include config - adjust path as needed
require_once "../config.php";

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit();
}

// Simple query
$sql = "SELECT id, Full_Name, Email_Address, Username FROM users";
$result = $conn->query($sql);

if ($result) {
    $users = [];
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    echo json_encode([
        "success" => true,
        "users" => $users,
        "count" => count($users)
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . $conn->error
    ]);
}

$conn->close();
?>