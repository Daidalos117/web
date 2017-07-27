<?php 
if(!isset($_GET["img"])){
    die("Není obrázek");
}
$image = mb_ereg_replace("([^\w\s\d\-_~,;\[\]\(\).])", '', $_GET["img"]);
// Remove any runs of periods (thanks falstro!)
$image = mb_ereg_replace("([\.]{2,})", '', $image);
 ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><?= $image ?></title>
    </head>
    <body>
        <img src="img/<?= $image ?>" alt="<?= $image ?>"  style="width: 100vw">
    </body>
</html>
