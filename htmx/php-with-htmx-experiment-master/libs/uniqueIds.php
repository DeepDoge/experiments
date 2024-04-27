<?
class UniqueIdStore
{
    private $keyIdMap = [];

    public function __get($key)
    {
        return isset($this->keyIdMap[$key]) ?  $this->keyIdMap[$key] : ($this->keyIdMap[$key] = uniqid($key . '-'));
    }
}
