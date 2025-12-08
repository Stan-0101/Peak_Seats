<?php
// CORS headers - MUST BE SET BEFORE ANY OUTPUT
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config.php";

// Get JSON input
$json = file_get_contents('php://input');
$input = json_decode($json, true);


error_log("Received JSON: " . $json);

if (!$input) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "message" => "No valid JSON data received",
        "received" => $json
    ]);
    exit();
}

// Validate required fields
if (!isset($input['fullname']) || !isset($input['email']) || 
    !isset($input['username']) || !isset($input['password'])) {
    echo json_encode([
        "success" => false, 
        "message" => "Missing required fields"
    ]);
    exit();
}

$fullname = trim($input['fullname']);
$email = trim($input['email']);
$username = trim($input['username']);
$password = trim($input['password']);

// Check for duplicate email or username
$stmt = $conn->prepare("SELECT id FROM users WHERE Email_Address=? OR Username=?");
if (!$stmt) {
    echo json_encode([
        "success" => false, 
        "message" => "Database prepare error: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param("ss", $email, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false, 
        "message" => "Email or username already exists"
    ]);
    $stmt->close();
    exit();
}
$stmt->close();

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (Full_Name, Email_Address, Username, Password) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode([
        "success" => false, 
        "message" => "Database prepare error: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param("ssss", $fullname, $email, $username, $password);

if ($stmt->execute()) {
    $last_id = $conn->insert_id;
    echo json_encode([
        "success" => true, 
        "message" => "Registered successfully",
        "user_id" => $last_id
    ]);
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Registration failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>