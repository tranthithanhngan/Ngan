<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/layout', [App\Http\Controllers\MapController::class, 'index'])->name('layout');
Route::get('/tuyendtnd', [App\Http\Controllers\MapController::class, 'tuyendtnd']);
Route::get('/vuottuyen', [App\Http\Controllers\MapController::class, 'vuottuyen']);
Route::get('/layoutraster', [App\Http\Controllers\MapController::class, 'index1'])->name('layoutraster');
Route::post('/vuottuyenjson', [App\Http\Controllers\MapController::class, 'vuottuyenjson']);
