<?php

namespace App\Http\Controllers;

use App\Models\Colour;
use App\Traits\ApiResponser;
use App\Transformers\ColourTransformer;

class ColourController extends Controller
{
    use ApiResponser;

    protected $transformer;

    public function __construct(ColourTransformer $colourTransformer)
    {
        $this->transformer = $colourTransformer;
    }

    public function index()
    {
        $colours = Colour::all();

        return $this->successResponse($this->transformer->transformCollection($colours->all()));
    }
}
