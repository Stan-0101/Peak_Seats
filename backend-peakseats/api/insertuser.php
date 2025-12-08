<?php
// CORS headers - Allow requests from React app
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Include database config
require_once "../config.php";

// Get JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

// Debug: Log what we received
error_log("Raw input: " . $rawInput);
error_log("Decoded input: " . json_encode($input));

if (!$input) {
    echo json_encode(["success" => false, "message" => "No data received", "debug" => "Raw: " . $rawInput]);
    exit;
}

$fullname = $input['fullname'];
$email = $input['email'];
$username = $input['username'];
$password = $input['password'];

// Check for duplicate email or username
$stmt = $conn->prepare("SELECT id FROM users WHERE Email_Address=? OR Username=?");
$stmt->bind_param("ss", $email, $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email or username already exists"]);
    exit;
}
$stmt->close();

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (Full_Name, Email_Address, Username, Password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $fullname, $email, $username, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registered successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed"]);
}

$stmt->close();
$conn->close();
?>
