<?php
// deleteuser.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
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

// Log for debugging
error_log("Delete request received: " . $json);

// Check if user IDs are provided
if (!$input || !isset($input['user_ids']) || !is_array($input['user_ids'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No user IDs provided or invalid format",
        "received" => $input
    ]);
    exit();
}

$userIds = $input['user_ids'];
$deletedCount = 0;
$errors = [];

// Security: Validate and sanitize IDs
$validUserIds = [];
foreach ($userIds as $id) {
    if (is_numeric($id) && $id > 0) {
        $validUserIds[] = intval($id);
    }
}

if (empty($validUserIds)) {
    echo json_encode([
        "success" => false,
        "message" => "No valid user IDs provided"
    ]);
    exit();
}

try {
    // Prepare SQL statement for multiple deletions
    $placeholders = implode(',', array_fill(0, count($validUserIds), '?'));
    $sql = "DELETE FROM users WHERE id IN ($placeholders)";
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Database prepare error: " . $conn->error);
    }
    
    // Bind parameters
    $types = str_repeat('i', count($validUserIds));
    $stmt->bind_param($types, ...$validUserIds);
    
    
    if ($stmt->execute()) {
        $deletedCount = $stmt->affected_rows;
        
        if ($deletedCount > 0) {
            echo json_encode([
                "success" => true,
                "message" => "Successfully deleted $deletedCount user(s)",
                "deleted_count" => $deletedCount,
                "deleted_ids" => $validUserIds
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "No users were deleted. Users may not exist or have already been deleted."
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
        "message" => "Error deleting users: " . $e->getMessage()
    ]);
} finally {
    $conn->close();
}
?>