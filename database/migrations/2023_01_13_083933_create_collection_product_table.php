<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('collection_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collection_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('description')->nullable();
            $table->decimal('price')->nullable();
            $table->float('quantity')->nullable();
        });
    }

    
    public function down()
    {
        Schema::dropIfExists('collection_product');
    }
};
