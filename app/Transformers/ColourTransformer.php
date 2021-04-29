<?php

namespace App\Transformers;

class ColourTransformer extends Transformer
{
    /**
     * Transform a colour
     * @param $colour
     * @return array
     */
    public function transform($colour)
    {
        return [
            'id' => $colour->id,
            'name' => $colour->name,
            'slug' => $colour->slug,
            'hex' => $colour->hex,
            'created_at' => $colour->created_at->toDateTimeString(),
            'updated_at' => $colour->updated_at->toDateTimeString(),
        ];
    }

    public function list($colour)
    {
        return $this->transform($colour);
    }
}
