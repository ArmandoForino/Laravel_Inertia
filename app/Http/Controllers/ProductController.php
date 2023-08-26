<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\ProductRequest;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $categories = Category::where('user_id', auth()->id())->get();
        if(count($categories)<1) { 
            return redirect()->route('categories.index');
        }
        $tags =Tag::where('user_id', auth()->id())->get();

        $products = Product::with('category')->with(['tags' => function ($query) {
            return $query->orderBy('type');
        }])->where('user_id', auth()->id())->latest()->get();
       

        return Inertia::render('Products/Index', [
            'products' => $products->groupBy('category.name'),
            'measures' => $products->groupBy('measure'),
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function store(ProductRequest $request)
    {
        $validated = $request->validated();
        $category = Category::find($validated['category_id']);
        if($category) {
            $product = $request->user()->products()->create($validated);
            $product->category()->associate($category)->save();
        }
        if(isset($validated['tagsIds'])){
            $product->tags()->sync($validated['tagsIds']);
        }
        return redirect(route('products.index'));
    }

    public function update(ProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        $validated = $request->validated();
        $category = Category::find($validated['category_id']);
        if($category) {
            $product->category()->associate($category)->save();
        }
        $product->update($validated);
        if(isset($validated['tagsIds'])){
            $product->tags()->sync($validated['tagsIds']);
        }
        return redirect(route('products.index'));
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();
        return redirect(route('products.index'));
    }
}
