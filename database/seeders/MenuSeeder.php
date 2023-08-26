<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $domains = ['product'];
        $tags = Tag::factory(10)->sequence(fn($s) => ['name' => 'Tag_'.$s->index, 'type'=>($s->index% 2 != 0)?'type_odd':'type_even', 'domain'=>$domains[array_rand($domains)]])->create();


        $categories = Category::factory(5)->sequence(fn($s) => ['name' => 'TestCat_'.$s->index])->create();

        // creo 10 prodotti e per ognuno associo un numero da 1 a n (numero di categorie create) di categorie
        $products = Product::factory(10)->sequence(fn($s) => ['name' => 'TestProd_'.$s->index])->create()->each(function($product) use ($categories, $tags) {
            // $feature = Feature::factory(1)->make();
            // $feature[0]->product()->associate($product)->save();
            $product->category()->associate($categories->random())->save();
            //$product->feature()->associate($feature[0])->save();
            $product->tags()->attach(
                $tags->where('domain', 'product')->random(rand(1, $tags->count()))->pluck('id')->toArray()
            );

        });

        Collection::factory(10)->sequence(fn($s) => ['name' => 'TestColl_'.$s->index])->create()->each(function($collection) use ($products) {
            $collection->products()->attach(
                $products->random(rand(1, $products->count()))->pluck('id')->toArray()
            );
        });

    }
}
