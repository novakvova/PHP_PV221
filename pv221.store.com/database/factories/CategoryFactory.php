<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    protected $sizes = [50,150,300,600,1200];

    protected function saveImages($imageContent){
        $fileName = uniqid() . '.webp';
        $manager = new ImageManager(new Driver());
        foreach ($this->sizes as $size) {
            $imageSave = $manager->read($imageContent);
            $imageSave->scale(width: $size);
            $path = public_path(env('UPLOAD_DIR').$size."_".$fileName);
            $imageSave->toWebp()->save($path);
        }
        return $fileName;
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageUrl = "https://picsum.photos/1200/800?category";
        $imageContent = file_get_contents($imageUrl);

        $fileName = $this->saveImages($imageContent);

        return [
            'name'=> $this->faker->unique()->word,
            'image'=> $fileName
        ];
    }
}
