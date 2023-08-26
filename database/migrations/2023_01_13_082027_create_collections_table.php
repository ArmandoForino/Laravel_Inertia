<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /*
    SQL
    
    CREATE TABLE `collections`(
        `id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(50) NOT NULL,
        `description` VARCHAR(255),

        CONSTRAINT `collections_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `collections`(`id`) ON DELETE CASCADE,

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
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name',50);
            $table->string('description')->nullable();
            $table->json('option')->nullable();
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
        Schema::dropIfExists('collections');
    }
};
