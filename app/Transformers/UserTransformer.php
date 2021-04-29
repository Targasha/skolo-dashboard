<?php

namespace App\Transformers;

class UserTransformer extends Transformer
{
    /**
     * Transform a user
     * @param $user
     * @return array
     */
    public function transform($user)
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at->toDateTimeString(),
            'updated_at' => $user->updated_at->toDateTimeString(),
        ];
    }

    public function list($user)
    {
        return $this->transform($user);
    }
}
