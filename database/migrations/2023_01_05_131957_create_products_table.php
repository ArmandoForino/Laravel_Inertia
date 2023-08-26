<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /*
    SQL 

    CREATE TABLE `products` (
        `id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(50) NOT NULL,
        `description` VARCHAR(255),
        `price` DECIMAL(8,2) NOT NULL,

        CONSTRAINT `products_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
        
        PRIMARY KEY (`id`)
    )
    */
    
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('name',50);
            $table->string('description')->nullable();
            $table->decimal('price')->nullable();
            $table->float('quantity')->nullable();
            $table->string('measure')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
