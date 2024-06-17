<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class CategoryController extends Controller
{
    protected string $upload;
    protected string $url;
    public function __construct()
    {
        $protocol = isset($_SERVER['HTTPS']) &&
        $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
        $base_url = $protocol . $_SERVER['HTTP_HOST'] . '/';
        $this-> upload = env('UPLOAD_DIR');
        $this-> url = $base_url . $this->upload;
    }
    public function getList() {
        $data = Category::all();
        return response()->json($data)
            ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function create(Request $request) {
        if (!file_exists(public_path($this->upload))) {
            mkdir(public_path($this->upload), 0777);
        }
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = uniqid() . '.webp';
            $destinationPath =public_path( $this->upload);
            $manager = new ImageManager(new Driver());
            $sizes = [50,150,300,600,1200];
            foreach ($sizes as $size) {
                // read image from file system
                $imageSave = $manager->read($file);
                // resize image proportionally to 600px width
                $imageSave->scale(width: $size);
                $path = public_path($this->upload.$size."_".$fileName);
                // save modified image in new format
                $imageSave->toWebp()->save($path);
            }
            $item = Category::create(['name' => $request->input('name') , 'image' => $fileName]);
            $item->image =$this->url . $item->image;
            return response()->json($item, 201);
        }
        else
            return response()->json("Image file not found", 404);
    }
}
