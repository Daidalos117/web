<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 

const M_ER = "danger";
const M_S = "success";
if(isset($_POST["message"]) and !empty($_POST["message"]) ) {
    
    $body = filter_var($_POST['message'], FILTER_SANITIZE_EMAIL); 
    //$body = "Nová zpráva"; 
    $lang = $_POST["language"];

    $langBool = $lang == "cz";
    require 'phpmailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;

    $mail->SMTPDebug = 3;  
    
    //$mail->setFrom('zakaznik@jsemroman.cz', 'Mailer');
    $mail->addAddress('rajchert.roman+jsemroman@gmail.com', 'Joe User');     // Add a recipient
    
    $mail->Subject = ($langBool) ? 'Nová zpráva z jsemroman.cz' : 'New message from you web';
    $mail->Body    = $body;
    $mail->CharSet = 'UTF-8';
    
    
    if(!$mail->send()) {
    $message = ($langBool) ?  'Zpráva nemohla být odeslána. Zkuste to prosím znovu za chvíli.' : 'Message could not be sent. Please try again.';
    $message .= 'Error: ' . $mail->ErrorInfo;
    $class = M_ER;
    } else {
        $message = ($langBool) ? 'Zpráva mi byla úspěšně odeslána.' : 'Message was succesfully sent to me.';
        $class = M_S;
    }

}else {
    $message = ($langBool) ? 'Vyplňte prosím všechna pole.' : 'Please fill all inputs.';
    $class = M_ER;
}

echo json_encode(["class" => $class, "message" => $message]);
