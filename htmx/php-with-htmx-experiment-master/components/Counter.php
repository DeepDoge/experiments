<? {
    require_once ROOT_PATH . "/libs/fileStore.php";

    $store = new FileStore("/tmp/counter-store");

    $store->count ??= 0;

    if (COMPONENT_CALL) {
        if (isset($_GET['increment'])) {
            echo ++$store->count;
        } else if (isset($_GET['decrement'])) {
            echo --$store->count;
        }
        exit;
    }

    require_once ROOT_PATH . "/libs/uniqueIds.php";
    $classes = new UniqueIdStore();
    $ids = new UniqueIdStore();
?>
    <div class="<?= $classes->counter ?>">
        <div class="<? $classes->value ?>">
            Count: <span id="<?= $ids->count ?>"> <?= $store->count ?> </span>
        </div>

        <div class="<?= $classes->actions ?>">
            <button hx-post="/$/Counter.php?increment=1" hx-swap="innerHTML" hx-target="#<?= $ids->count ?>">
                Increment
            </button>
            <button hx-post="/$/Counter.php?decrement=1" hx-swap="innerHTML" hx-target="#<?= $ids->count ?>">
                Decrement
            </button>
        </div>
    </div>
<?
}
