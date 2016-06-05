<?php
/**
 * Created by IntelliJ IDEA.
 * User: willy
 * Date: 2016-06-05
 * Time: 00:13
 */

$mail_dest = "willkoua@yahoo.fr";

// Messages de confirmation du mail
$message_envoye = "Votre message nous est bien parvenu !";
$message_non_envoye = "L'envoi du mail a échoué, veuillez réessayer SVP.";

// Messages d'erreur du formulaire
$message_formulaire_invalide = "Vérifiez que tous les champs soient bien remplis et que l'email soit sans erreur.";

if(!isset($_POST['send'])){
    echo '<p>'.$message_erreur_formulaire.'</p>'."\n";
}else{
    /*
	 * cette fonction sert à nettoyer et enregistrer un texte
	 */
    function Rec($text)
    {
        $text = htmlspecialchars(trim($text), ENT_QUOTES);
        if (1 === get_magic_quotes_gpc())
        {
            $text = stripslashes($text);
        }

        $text = nl2br($text);
        return $text;
    };

    /*
	 * Cette fonction sert à vérifier la syntaxe d'un email
	 */
    function IsEmail($email)
    {
        $value = preg_match('/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/', $email);
        return (($value === 0) || ($value === false)) ? false : true;
    }

    if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail_dest)) // On filtre les serveurs qui présentent des bogues.
    {
        $passage_ligne = "\r\n";
    }
    else
    {
        $passage_ligne = "\n";
    }

    //=====Création de la boundary.
    $boundary = "-----=".md5(rand());
    $boundary_alt = "-----=".md5(rand());

    // formulaire envoyé, on récupère tous les champs.
    $nom     = (isset($_POST['name']))     ? Rec($_POST['name'])     : '';
    $email   = (isset($_POST['email']))   ? Rec($_POST['email'])   : '';
    $objet   = (isset($_POST['subject']))   ? Rec($_POST['subject'])   : '';
    $message = (isset($_POST['text'])) ? Rec($_POST['text']) : '';
    // On va vérifier les variables et l'email ...
    $email_dest = (IsEmail($email)) ? $email : ''; // soit l'email est vide si erroné, soit il vaut l'email entré

    if (($nom != '') && ($email != '') && ($objet != '') && ($message != '')){
        //=====Création du header de l'e-mail.
        $headers = "From: $nom <$email>".$passage_ligne;
        $headers.= "Reply-to: $nom <$email>".$passage_ligne;
        $headers.= "MIME-Version: 1.0".$passage_ligne;
        $headers .= "Content-Type: text/plain; charset=\"utf-8\"; DelSp=\"Yes\"; format=flowed".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
    }

    // Remplacement de certains caractères spéciaux
    $message = str_replace("&#039;","'",$message);
    $message = str_replace("&#8217;","'",$message);
    $message = str_replace("&quot;",'"',$message);
    $message = str_replace('<br>','',$message);
    $message = str_replace('<br />','',$message);
    $message = str_replace("&lt;","<",$message);
    $message = str_replace("&gt;",">",$message);
    $message = str_replace("&amp;","&",$message);

    // Envoi du mail
    mail($email_dest, $objet, $message, $headers);
}

