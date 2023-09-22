<?php
// Mendapatkan data yang dikirim dari formulir
$username = $_POST['username'];
$password = $_POST['password'];

// Membaca data pengguna dari file JSON
$usersData = file_get_contents('<assets>
<json>users.json');
$users = json_decode($usersData, true)['users'];

// Logika otentikasi
$authenticatedUser = null;
foreach ($users as $user) {
  if ($user['username'] === $username && $user['password'] === $password) {
    $authenticatedUser = $user;
    break;
  }
}

// Menyiapkan respons JSON
$response = [];

if ($authenticatedUser) {
  $response['success'] = true;
  $response['role'] = $authenticatedUser['role'];
} else {
  $response['success'] = false;
  $response['message'] = 'Invalid username or password';
}

// Mengirim respons JSON ke JavaScript
header('Content-Type: application/json');
echo json_encode($response);
?>
