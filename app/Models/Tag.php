<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'description', 'domain'];

    public function user() {
        return $this->belongsTo(User::class);
    }


    public function items() {
        return $this->belongsToMany(Item::class);
    }
}
