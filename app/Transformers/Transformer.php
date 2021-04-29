<?php

namespace App\Transformers;

use App\Services\RolesService;

/**
*
*/
abstract class Transformer
{
    // protected $roles;

    // public function __construct(RolesService $rolesService)
    // {
    //     $this->roles = json_decode($rolesService->obtainRoles(), true);
    // }

    /**
     * Transform a collection of items
     *
     * @param $items
     * @return array
     */
    public function transformCollection(array $items, $method = null)
    {
        if (method_exists($this, $method)) {
            return array_map([$this, $method], $items);
        }

        return array_map([$this, 'transform'], $items);
    }

    /**
     * Transform a item
     *
     * @param $item
     * @return array
     */
    abstract public function transform($item);

    /**
     * Transform a item specially fo listing
     *
     * @param $item
     * @return array
     */
    abstract public function list($item);
}
