<?php
// deletereservation.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Return only the headers and not the content
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
        "message" => "Config file not found"
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

// Get JSON input
$json = file_get_contents('php://input');
$input = json_decode($json, true);

// Log for debugging
error_log("Delete request received: " . $json);

// Check if reservation IDs are provided
if (!$input || !isset($input['reservation_ids']) || !is_array($input['reservation_ids'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No reservation IDs provided",
        "received" => $input
    ]);
    exit();
}

$reservationIds = $input['reservation_ids'];

// Validate IDs
$validIds = [];
foreach ($reservationIds as $id) {
    if (is_numeric($id) && $id > 0) {
        $validIds[] = intval($id);
    }
}

if (empty($validIds)) {
    echo json_encode([
        "success" => false,
        "message" => "No valid reservation IDs provided"
    ]);
    exit();
}

try {
    // Check if table exists
    $checkTable = $conn->query("SHOW TABLES LIKE 'reservations'");
    if ($checkTable->num_rows == 0) {
        echo json_encode([
            "success" => false,
            "message" => "Reservations table does not exist"
        ]);
        exit();
    }
    
    // Prepare SQL statement for multiple deletions
    $placeholders = implode(',', array_fill(0, count($validIds), '?'));
    $sql = "DELETE FROM reservations WHERE reservation_id IN ($placeholders)";
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Database prepare error: " . $conn->error);
    }
    
    // Bind parameters
    $types = str_repeat('i', count($validIds));
    $stmt->bind_param($types, ...$validIds);
    
    // Execute deletion
    if ($stmt->execute()) {
        $deletedCount = $stmt->affected_rows;
        
        if ($deletedCount > 0) {
            echo json_encode([
                "success" => true,
                "message" => "Successfully deleted $deletedCount reservation(s)",
                "deleted_count" => $deletedCount,
                "deleted_ids" => $validIds
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "No reservations were deleted. They may not exist.",
                "attempted_ids" => $validIds
            ]);
        }
    } else {
        throw new Exception("Delete execution failed: " . $stmt->error);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error deleting reservations: " . $e->getMessage(),
        "sql_error" => isset($conn->error) ? $conn->error : "No SQL error"
    ]);
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
?>