<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequestValidate;
use App\Http\Requests\UpdateRequestValidate;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * عرض قائمة المهام
     * هذه الدالة تُستدعى عندما يزور المستخدم صفحة المهام
     */
    public function index()
    {
        // جلب كل مهام المستخدم الحالي مع ترتيبها (الأحدث أولاً)
        $tasks = Task::where('user_id', auth()->id())
                    ->orderBy('created_at', 'desc')
                    ->get();

        // إرسال المهام لصفحة React
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function show(Task $task)
    {
        // التأكد أن المهمة تخص المستخدم الحالي
        if ($task->user_id !== auth()->id()) {
            abort(403); // ممنوع!
        }

        return Inertia::render('Tasks/Show', [
            'task' => $task
        ]);
    }

    /**
     * عرض صفحة إنشاء مهمة جديدة
     */
    public function create()
    {
        return Inertia::render('Tasks/Create');
    }

    /**
     * حفظ المهمة الجديدة في قاعدة البيانات
     */
    public function store(StoreRequestValidate $request)
    {
        // إنشاء المهمة وربطها بالمستخدم الحالي
        Task::create([
            ...$request->validated(), // كل البيانات المُتحقق منها
            'user_id' => auth()->id(), // ربط المهمة بالمستخدم
        ]);

        // العودة لصفحة المهام مع رسالة نجاح
        return redirect()->route('tasks.index')
                        ->with('success', 'تم إضافة المهمة بنجاح!');
    }

    /**
     * عرض صفحة تعديل مهمة
     */
    public function edit(Task $task)
    {
        // التأكد أن المهمة تخص المستخدم الحالي
        if ($task->user_id !== auth()->id()) {
            abort(403); // ممنوع!
        }

        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }

    /**
     * تحديث المهمة في قاعدة البيانات
     */
    public function update(UpdateRequestValidate $request, Task $task)
    {
        // تحديث المهمة
        $task->update($request->validated());

        // العودة لصفحة المهام
        return redirect()->route('tasks.index')
                        ->with('success', 'تم تحديث المهمة بنجاح!');
    }

    /**
     * حذف المهمة
     */
    public function destroy(Task $task)
    {
        // التأكد أن المهمة تخص المستخدم
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        // حذف المهمة
        $task->delete();

        // العودة لصفحة المهام
        return redirect()->route('tasks.index')
                        ->with('success', 'تم حذف المهمة بنجاح!');
    }
}



