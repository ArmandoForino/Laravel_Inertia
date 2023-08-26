<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Category;
use App\Models\Collection;
use App\Models\Tag;
use App\Models\Feature;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'quantity', 'measure'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function collections() {
        return $this->belongsToMany(Collection::class)->withPivot('description', 'price', 'quantity');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

}
