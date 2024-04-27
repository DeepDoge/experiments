<?
class FileStore
{
    private $dirPath;

    public function __construct(string $dirPath)
    {
        if (!is_dir($dirPath)) mkdir($dirPath);
        $this->dirPath = $dirPath;
    }

    public function __get($name): mixed
    {
        $filePath = $this->dirPath . '/' . $name;
        return file_exists($filePath) ?  unserialize(file_get_contents($filePath)) : null;
    }

    public function __set($name, mixed $value): void
    {
        $filePath = $this->dirPath . '/' . $name;
        file_put_contents($filePath, serialize($value));
    }
}
