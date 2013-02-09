<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/items', 'getItems');
$app->get('/items/:id',	'getItem');
$app->get('/items/search/:query', 'findByName');
$app->post('/items', 'addItem');
$app->put('/items/:id', 'updateItem');
$app->delete('/items/:id',	'deleteItem');

$app->run();

function getItems() {
	$sql = "select * FROM item ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$items = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"items": ' . json_encode($items) . '}';
		echo json_encode($items);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getItem($id) {
	$sql = "SELECT * FROM item WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$item = $stmt->fetchObject();
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addItem() {
	error_log('addItem\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$item = json_decode($request->getBody());
	$sql = "INSERT INTO item (name, description) VALUES (:name, :description)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("name", $item->name);
		$stmt->bindParam("description", $item->description);
		$stmt->execute();
		$item->id = $db->lastInsertId();
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateItem($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$item = json_decode($body);
	$sql = "UPDATE item SET name=:name, description=:description WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("name", $item->name);
		$stmt->bindParam("description", $item->description);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteItem($id) {
	$sql = "DELETE FROM item WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function findByName($query) {
	$sql = "SELECT * FROM item WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$items = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($items);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="itemdb";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>