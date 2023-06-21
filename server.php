<?php
header("Content-Type: application/json"); // Устанавливаем заголовок Content-Type для ответа в формате JSON

$data = json_decode(file_get_contents("php://input"), true); // Получаем данные из запроса


echo json_encode($data); // Отправляем ответ в формате JSON