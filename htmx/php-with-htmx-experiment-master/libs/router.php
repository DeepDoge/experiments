<?

function renderPage(string $rootDir, string $path): void
{
    if (str_starts_with($path, '/$/')) {
        define('COMPONENT_CALL', true);
        include($rootDir . '/components' . substr($path, 2));
        return;
    }
    define('COMPONENT_CALL', false);

    $parts = explode('/', trim($path, '/'));

    $SLOT = ''; // Initialize SLOT variable

    $routesDir = $rootDir . '/routes'; // Define the "routes" directory path

    // Check for index.php in the full path within the "routes" directory
    $fullPath = $routesDir . $path . '/index.php';

    if (file_exists($fullPath)) {
        ob_start();
        include($fullPath);
        $SLOT = ob_get_clean();
    }

    // Loop through the parts in reverse order, excluding the last part
    $currentPath = $routesDir; // Use the "routes" directory as the starting point
    foreach (array_reverse($parts) as $part) {
        $currentPath .= '/' . $part;

        // Check for layout.php in the current directory
        $layoutFile = $currentPath . '/layout.php';

        if (file_exists($layoutFile)) {
            ob_start();
            include($layoutFile);
            $SLOT = ob_get_clean();
        }
    }

    // Output the final content in SLOT
    echo $SLOT;
}
