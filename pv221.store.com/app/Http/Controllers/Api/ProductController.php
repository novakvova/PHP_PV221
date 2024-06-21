<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAll(): \Illuminate\Http\JsonResponse
    {
        $items = Product::with(["category","product_images"])->get();
        return response()->json($items) ->header('Content-Type', 'application/json; charset=utf-8');
    }
}
