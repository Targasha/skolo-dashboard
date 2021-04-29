<?php

namespace Database\Seeders;

use App\Models\Colour;
use App\Models\Link;
use Faker\Factory;
use Illuminate\Database\Seeder;

class LinksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colours = Colour::all();
        $faker = Factory::create();

        for ($i = 0; $i < 9; $i++) {
            Link::create([
                'colour_id' => $colours->random()->id,
                'title' => $faker->domainName(),
                'url' => $faker->url()
            ]);
        }
    }
}
