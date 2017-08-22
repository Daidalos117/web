<?php

// List of available localized versions as 'lang code' => 'url' map
$sites = array(
    "cs" => "http://jsemroman.cz",
    "en" => "http://jsemroman.cz/en",
);

if(isset($_COOKIE['language']))

if(isset($_GET['setLanguage'])) {
    $lang = $_GET['setLanguage'];
    setcookie("language", $lang,  time() + (10 * 365 * 24 * 60 * 60)); 
    redirect($lang);
}

function getLanguage() {
    // Get 2 char lang code
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

    // Set default language if a `$lang` version of site is not available
    if (!in_array($lang, array_keys($sites)))
        $lang = 'en';

    return $lang;
}

function redirect($lang) {
    glob $sites;
    // Finally redirect to desired location
    header('Location: ' . $sites[$lang]);
}
