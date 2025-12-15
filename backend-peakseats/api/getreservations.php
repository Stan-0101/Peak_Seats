<?php
// getreservations.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Return only the headers and not the content
    // Only allow CORS if we're doing a GET, POST, PUT, DELETE or OPTIONS
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
    exit(0);
}

// Get the actual path to config.php
$configPath = dirname(__DIR__) . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Config file not found",
        "path" => $configPath
    ]);
    exit();
}

require_once $configPath;

// Check database connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit();
}

try {
    // First check if table exists
    $checkTable = $conn->query("SHOW TABLES LIKE 'reservations'");
    if ($checkTable->num_rows == 0) {
        echo json_encode([
            "success" => false,
            "message" => "Reservations table does not exist",
            "reservations" => []
        ]);
        exit();
    }
    
    // Query to get all reservations
    $sql = "SELECT 
                reservation_id,
                user_id,
                arena_name,
                seat_numbers,
                total_amount,
                payment_method
            FROM reservations 
            ORDER BY reservation_id DESC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Database query error: " . $conn->error);
    }
    
    $reservations = [];
    while ($row = $result->fetch_assoc()) {
        $reservations[] = [
            'reservation_id' => $row['reservation_id'],
            'user_id' => $row['user_id'],
            'arena_name' => $row['arena_name'],
            'seat_numbers' => $row['seat_numbers'],
            'total_amount' => number_format($row['total_amount'], 2),
            'payment_method' => $row['payment_method']
        ];
    }
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Reservations fetched successfully",
        "reservations" => $reservations,
        "count" => count($reservations)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage(),
        "error_details" => $conn->error
    ]);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
?>