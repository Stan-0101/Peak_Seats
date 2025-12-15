<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = isset($_GET['user_id']) ? trim($_GET['user_id']) : '';
} else {
    $json = file_get_contents('php://input');
    $input = json_decode($json, true);
    $user_id = isset($input['user_id']) ? trim($input['user_id']) : '';
}

if (empty($user_id)) {
    echo json_encode([
        "success" => false, 
        "message" => "Missing required parameter: user_id"
    ]);
    exit();
}


$sql = "SELECT 
            reservation_id,
            user_id,
            arena_name,
            seat_numbers,
            total_amount,
            payment_method
        FROM reservations 
        WHERE user_id = ? 
        ORDER BY reservation_id DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode([
        "success" => false, 
        "message" => "Database error: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$reservations = [];
$total_reservations = 0;
$total_amount = 0;

while ($row = $result->fetch_assoc()) {
    $total_reservations++;
    $total_amount += $row['total_amount'];
    
    $seat_count = count(explode(',', $row['seat_numbers']));
    
    $reservations[] = [
        'reservation_id' => $row['reservation_id'],
        'user_id' => $row['user_id'],
        'arena_name' => $row['arena_name'],
        'seat_numbers' => $row['seat_numbers'],
        'seat_count' => $seat_count,
        'total_amount' => number_format($row['total_amount'], 2),
        'raw_amount' => $row['total_amount'],
        'payment_method' => $row['payment_method'],
        'payment_text' => $row['payment_method'] === 'online_card' ? 'Online Payment' : 'Pay Onsite'
    ];
}

if (count($reservations) > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Reservations retrieved successfully",
        "count" => $total_reservations,
        "total_amount" => number_format($total_amount, 2),
        "data" => $reservations
    ]);
} else {
    echo json_encode([
        "success" => true,
        "message" => "No reservations found for this user",
        "count" => 0,
        "total_amount" => "0.00",
        "data" => []
    ]);
}

$stmt->close();
$conn->close();
?>