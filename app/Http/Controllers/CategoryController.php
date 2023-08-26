<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\CategoryRequest;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->where('user_id', auth()->id())->get();
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function store(CategoryRequest $request) : RedirectResponse
    {
        $validated = $request->validated();
        $request->user()->categories()->create($validated);
        return redirect(route('categories.index'));
    }

   public function update(CategoryRequest $request, Category $category) : RedirectResponse
    {
        $this->authorize('update', $category);
        $validated = $request->validated();
        $category->update($validated);
        return redirect(route('categories.index'));
    }

    public function destroy(Category $category) : RedirectResponse
    {
        $this->authorize('delete', $category);
        $category->delete();
        return redirect(route('categories.index'));
    }
}
