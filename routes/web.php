<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function () {
    
    // صفحة قائمة المهام
    Route::get('/tasks', [TaskController::class, 'index'])
         ->name('tasks.index');

         // صفحة إنشاء مهمة جديدة
    Route::get('/tasks/create', [TaskController::class, 'create'])
         ->name('tasks.create');

     Route::get('/tasks/{task}', [TaskController::class, 'show'])
         ->name('tasks.show');
    
    
    
    // حفظ المهمة الجديدة
    Route::post('/tasks', [TaskController::class, 'store'])
         ->name('tasks.store');
    
    // صفحة تعديل مهمة
    Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])
         ->name('tasks.edit');
    
    // تحديث المهمة
    Route::put('/tasks/{task}', [TaskController::class, 'update'])
         ->name('tasks.update');
    
    // حذف المهمة
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])
         ->name('tasks.destroy');
});









require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
