<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $measures = ['pz', 'kg', 'lt'];
        
        return [
            'user_id' => 1,
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2,1,30),
            'quantity' => fake()->numberBetween(0, 100),
            'measure' => $measures[array_rand($measures)]
            
        ];
    }
}
