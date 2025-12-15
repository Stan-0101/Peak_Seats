<?php
header_remove();

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "peakseat_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'DB Connection failed']));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
        exit();
    }
    
    $userId = $conn->real_escape_string($data['userId'] ?? 'guest');
    $mealItems = $conn->real_escape_string(json_encode($data['mealItems'] ?? []));
    $totalAmount = floatval($data['totalAmount'] ?? 0);
    $paymentMethod = $conn->real_escape_string($data['paymentMethod'] ?? 'onsite');
    
    $cardHolderName = !empty($data['cardHolderName']) ? $conn->real_escape_string($data['cardHolderName']) : NULL;
    $cardLastFour = !empty($data['cardLastFour']) ? $conn->real_escape_string($data['cardLastFour']) : NULL;
    $cardExpiry = !empty($data['cardExpiry']) ? $conn->real_escape_string($data['cardExpiry']) : NULL;
    $cardCvv = !empty($data['cardCvv']) ? intval($data['cardCvv']) : NULL;
    
    $sql = "INSERT INTO meal_orders (user_id, meal_items, total_amount, payment_method, card_holder_name, card_number_last4, card_expiry, card_cvv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("ssdssssi", $userId, $mealItems, $totalAmount, $paymentMethod, $cardHolderName, $cardLastFour, $cardExpiry, $cardCvv);
        
        if ($stmt->execute()) {
            $orderId = $stmt->insert_id;
            echo json_encode(['success' => true, 'message' => 'Order placed', 'orderId' => $orderId]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Query error: ' . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Statement error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid method']);
}

$conn->close();
?>
