<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use App\Models\Link;
use App\Traits\ApiResponser;
use App\Transformers\LinkTransformer;
use Illuminate\Http\Response;

class LinkController extends Controller
{
    use ApiResponser;

    protected $transformer;

    public function __construct(LinkTransformer $linkTransformer)
    {
        $this->transformer = $linkTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $links = Link::with('colour')->latest()->get();

        return $this->successResponse($this->transformer->transformCollection($links->all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\StoreLinkRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLinkRequest $request)
    {
        $link = Link::create([
            'title' => $request->title,
            'url' => $request->url,
            'colour_id' => $request->colour_id,
        ]);

        return $this->successResponse($this->transformer->transform($link), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(Link $link)
    {
        return $this->successResponse($this->transformer->transform($link), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateLinkRequest  $request
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLinkRequest $request, Link $link)
    {
        $link->fill($request->all())->save();

        return $this->successResponse($this->transformer->transform($link), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy(Link $link)
    {
        if (!$link->delete()) {
            return $this->errorResponse('Something went wrong! Please try again.', Response::HTTP_BAD_REQUEST);
        }

        return $this->successResponse('', Response::HTTP_NO_CONTENT);
    }
}
