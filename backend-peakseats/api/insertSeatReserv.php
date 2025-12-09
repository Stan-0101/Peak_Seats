<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false, 
        "message" => "Method not allowed. Use POST."
    ]);
    exit();
}

require_once "../config.php";

$json = file_get_contents('php://input');
$input = json_decode($json, true);

if (!$input) {
    echo json_encode(["success" => false, "message" => "No JSON data received"]);
    exit();
}


$required = ['user_id', 'arena_name', 'seat_numbers', 'total_amount', 'payment_method'];
foreach ($required as $field) {
    if (!isset($input[$field]) || $input[$field] === '') {
        echo json_encode(["success" => false, "message" => "Missing required field: $field"]);
        exit();
    }
}

$user_id = trim($input['user_id']); 
$arena_name = trim($input['arena_name']);
$seat_numbers = trim($input['seat_numbers']);
$total_amount = floatval($input['total_amount']);
$payment_method = trim($input['payment_method']);

if (!in_array($payment_method, ['online_card', 'onsite'])) {
    echo json_encode(["success" => false, "message" => "Invalid payment method"]);
    exit();
}


$card_holder_name = isset($input['card_holder_name']) ? trim($input['card_holder_name']) : null;
$card_number_last4 = isset($input['card_number_last4']) ? trim($input['card_number_last4']) : null;
$card_expiry = isset($input['card_expiry']) ? trim($input['card_expiry']) : null;
$card_cvv = isset($input['card_cvv']) ? intval($input['card_cvv']) : null; 


$check_user = $conn->prepare("SELECT Username FROM users WHERE Username = ?");
if (!$check_user) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit();
}

$check_user->bind_param("s", $user_id); 
$check_user->execute();
$check_user->store_result();

if ($check_user->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found: $user_id"]);
    $check_user->close();
    exit();
}
$check_user->close();

// Insert into table
$sql = "INSERT INTO reservations (
    user_id, 
    arena_name, 
    seat_numbers, 
    total_amount, 
    payment_method, 
    card_holder_name, 
    card_number_last4, 
    card_expiry, 
    card_cvv
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Prepare error: " . $conn->error]);
    exit();
}


$stmt->bind_param(
    "sssdssssi", 
    $user_id,         
    $arena_name,      
    $seat_numbers,    
    $total_amount,    
    $payment_method,  
    $card_holder_name,
    $card_number_last4, 
    $card_expiry,     
    $card_cvv         
);

if ($stmt->execute()) {
    $id = $conn->insert_id;
    echo json_encode([
        "success" => true, 
        "message" => "Reservation created successfully!",
        "reservation_id" => $id
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>