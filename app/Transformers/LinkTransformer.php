<?php

namespace App\Transformers;

class LinkTransformer extends Transformer
{
    /**
     * Transform a link
     * @param $link
     * @return array
     */
    public function transform($link)
    {
        return [
            'id' => (int) $link->id,
            'colour_id' => (int) $link->colour_id,
            'title' => $link->title,
            'url' => $link->url,
            'colour' => $link->colour,
            'created_at' => $link->created_at->toDateTimeString(),
            'updated_at' => $link->updated_at->toDateTimeString(),
        ];
    }

    public function list($link)
    {
        return $this->transform($link);
    }
}
