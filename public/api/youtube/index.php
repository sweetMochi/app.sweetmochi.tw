<?php
declare(strict_types=1);

// 金鑰放在網站根目錄之外，不會被直接下載
$config = require __DIR__ . '/../../../config/google.php';

// 只允許自己的網域（擋其他網站在瀏覽器裡直接用這個端點）
$allowOrigins = ['https://app.sweetmochi.tw', 'http://localhost:4200'];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

/**
 * 快取伺服器會將 Origin 標頭視為快取鍵（Cache Key）的一部分。
 * 來自 site-a.com 的請求會得到 A 快取。
 * 來自 site-b.com 的請求會得到 B 快取，兩者互不干擾
 * 解決 CORS 快取錯亂的問題
 */
if (in_array($origin, $allowOrigins, true)) {
	header("Access-Control-Allow-Origin: {$origin}");
	header('Vary: Origin');
}

header('Content-Type: application/json; charset=utf-8');

// 驗證影片 ID 格式，避免被當成任意代理
// ?id[]=x 會傳入陣列，strict_types 下直接交給 preg_match 會拋出 TypeError
$id = $_GET['id'] ?? '';
if (!is_string($id) || !preg_match('/^[A-Za-z0-9_-]{11}$/', $id)) {
	http_response_code(400);
	echo json_encode([
		'code' => '3001',
		'desc' => 'Invalid YouTube video ID',
	]);
	exit();
}

$url =
	'https://www.googleapis.com/youtube/v3/videos?' .
	http_build_query([
		'id' => $id,
		'part' => 'snippet',
		'key' => $config['youtubeApiKey'],
	]);

$context = stream_context_create(['http' => ['ignore_errors' => true, 'timeout' => 10]]);
$res = @file_get_contents($url, false, $context);

// $http_response_header[0] 例如 "HTTP/1.1 403 Forbidden"
$status =
	isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)
		? (int) $m[1]
		: 0;
$data = $res ? json_decode($res, true) : null;
$item = $data['items'][0] ?? null;

if ($status !== 200) {
	$reason = $data['error']['errors'][0]['reason'] ?? '';
	error_log("YouTube API {$status} {$reason}"); // 寫進 Plesk 的錯誤日誌，方便查問題
	http_response_code(502);
	echo json_encode([
		'code' => '3003',
		'desc' => 'YouTube API error',
	]);
	exit();
}

if (!$item) {
	echo json_encode([
		'code' => '3002',
		'desc' => 'YouTube video not available',
	]);
	exit();
}

// 只回傳前端需要的欄位
echo json_encode([
	'code' => '',
	'data' => [
		'title' => $item['snippet']['title'],
		'thumbnails' => $item['snippet']['thumbnails'],
	],
]);
