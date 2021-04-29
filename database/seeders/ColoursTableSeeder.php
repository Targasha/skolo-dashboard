<?php

namespace Database\Seeders;

use App\Models\Colour;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ColoursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colours = [
            [
                'name' => 'Blue',
                'hex' => '#3490dc'
            ],
            [
                'name' => 'Indigo',
                'hex' => '#6574cd'
            ],
            [
                'name' => 'Purple',
                'hex' => '#9561e2'
            ],
            [
                'name' => 'Pink',
                'hex' => '#f66d9b'
            ],
            [
                'name' => 'Red',
                'hex' => '#e3342f'
            ],
            [
                'name' => 'Orange',
                'hex' => '#f6993f'
            ],
            [
                'name' => 'Yellow',
                'hex' => '#ffed4a'
            ],
            [
                'name' => 'Green',
                'hex' => '#38c172'
            ],
            [
                'name' => 'Teal',
                'hex' => '#4dc0b5'
            ],
            [
                'name' => 'Cian',
                'hex' => '#6cb2eb'
            ],
            [
                'name' => 'White',
                'hex' => '#fff'
            ],
            [
                'name' => 'Gray',
                'hex' => '#6c757d'
            ],
            [
                'name' => 'Gray Dark',
                'hex' => '#343a40'
            ],
        ];

        foreach ($colours as $colour) {
            Colour::create([
                'name' => $colour['name'],
                'slug' => Str::slug($colour['name']),
                'hex' => $colour['hex']
            ]);
        }
    }
}
