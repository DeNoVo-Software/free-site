<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $instagram = $_POST['instagram'];
    $message = $_POST['message'];

    // Путь к файлу, в который будут сохраняться данные
    $file = 'data.txt';

    // Форматирование данных для записи в файл
    $data = "Имя: $name\nEmail: $email\nInstagram: $instagram\nСообщение: $message\n\n";

    // Открыть файл для записи и добавить данные
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

    // Отправка уведомления о успешной отправке
    echo "Спасибо! Ваша заявка успешно отправлена.";
}
?>
