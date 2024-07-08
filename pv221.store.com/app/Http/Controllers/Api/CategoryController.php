<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Helpers\ImageWorker;

class CategoryController extends Controller
{
    //по категоріях зробити пошук і пагінацію.
    public function getAll(Request $request) : \Illuminate\Http\Response //\Illuminate\Http\JsonResponse
    {
        $perPage = intval($request->query('perPage',2));
        $search = $request->query('search');
        $page = $request->query('page',1);
        $query = Category::query();
        if($search){
            $query-> where('name', 'like', '%'.$search.'%');
        }
        $data = $query->paginate($perPage, ['*'], 'page', $page);
        $json = json_encode($data);
        $dataSize = strlen($json);
         return response($json, 200)
                ->header('Content-Type', 'application/json')
               ->header('Content-Length', $dataSize)
               ->header('Accept-Ranges', 'bytes');
//        $items = Category::all();
//        return response()->json($items) ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        if (!file_exists(public_path($this->upload))) {
            mkdir(public_path($this->upload), 0777);
        }
        if ($request->hasFile('image') && $request->input('name') != '') {
            $file = $request->file('image');
            $fileName = ImageWorker::save($file);
            $item = Category::create(['name' => $request->input('name') , 'image' => $fileName]);
            return response()->json($item, 201);
        }
        else
            return response()->json("Bad request", 400);
    }

    public function getById(int $categoryId): \Illuminate\Http\JsonResponse
    {
        $item = Category::find($categoryId);
        return response()->json($item);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $item = Category::find($id);
        if($item && $request->input('name') != ''){
            if ( $request->hasFile('image') ) {
                $file = $request->file('image');
                ImageWorker::detete($id);
                $item->image = ImageWorker::save($file);
            }
            $item->name = $request->input('name');
            $item->save();
            return response()->json([
                'message' => 'Category updated successfully!',
                'category' => $item
            ], 200);
        }
        else
            return response()->json("Bad request", 400);
    }

    public function delete(int $id): \Illuminate\Http\JsonResponse
    {
        ImageWorker::detete($id);
        Category::destroy($id);
        return response()->json(null, 204);
    }
}
