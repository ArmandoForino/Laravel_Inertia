<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Product;

class Collection extends Model
{
    use HasFactory;

    // Rendo name, description e price mass-assignable 
    protected $fillable = ['name', 'description'];

    // Implemento la relazione many to many
    public function products() {
        return $this->belongsToMany(Product::class)->withPivot('description', 'price', 'quantity');
    }

    // Implemento la relazione one to many
    public function user() {
        return $this->belongsTo(User::class);
    }

    // creo delle regole per la validazione del form creazione
    public static $rules = [
        'name' => 'required|string|max:50',
        'description' => 'max:255',
        'productsIds'=> 'required|array'
    ];
}
