<?php

namespace App\Helpers;

use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ImageWorker
{
    public static $sizes = [50, 150, 300, 600, 1200];

    public static function save(UploadedFile $file): string
    {
        $fileName = uniqid() . ".webp";
        $manager = new ImageManager(new Driver());
        foreach (ImageWorker::$sizes as $size) {
            $imageSave = $manager->read($file);
            $imageSave->scale(width: $size);
            $path = public_path(env('UPLOAD_DIR') . $size . "_" . $fileName);
            $imageSave->toWebp()->save($path);
        }
        return $fileName;
    }

    public static function delete(int $id): void
    {
        $item = Category::find($id);
        foreach (ImageWorker::$sizes as $size) {
            $filePath = public_path(env('UPLOAD_DIR') . $size . "_" . $item->image);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
    }
}


