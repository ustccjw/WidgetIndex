<?php
$path = $_SERVER['argv'][1];

$file = realpath($path);
$lastIndexOf = strrpos($file, '.');
$ext = substr($file, $lastIndexOf + 1);

$content = file_get_contents($file);

echo 'data:image/' . $ext . ';base64,' . base64_encode($content)


?>
