<?
require_once "./libs/router.php";
define('ROOT_PATH', __DIR__);
define('REQUEST_URI', parse_url($_SERVER["REQUEST_URI"])['path']);

renderPage(ROOT_PATH, REQUEST_URI);
