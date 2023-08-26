<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'measure' => 'nullable|string|max:5',
            'quantity' => 'nullable|numeric|between:0,99999999',
            'price' => 'nullable|numeric|between:0.01,99999999.99',
            'category_id'=> 'required|numeric',
            'tagsIds' => 'array'
        ];
    }
}
