<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'colour_id', 'title', 'url'
    ];

    public function colour()
    {
        return $this->belongsTo(Colour::class);
    }
}
