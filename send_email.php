<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);
    
    $to = "BodkinInteractive@gmail.com";
    $subject = "New Contact Form Submission from " . $name;
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "You have received a new message from the contact form:\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Message:\n" . $message . "\n";

    if (mail($to, $subject, $email_body, $headers)) {
        echo "<script>
                alert('Thank you, $name! Your message has been sent successfully.');
                window.location.href = 'contact.html'; // Redirect back to contact page
              </script>";
    } else {
        echo "<script>
                alert('Oops! Something went wrong. Please try again.');
                window.location.href = 'contact.html'; // Redirect back to contact page
              </script>";
    }
}
?>
