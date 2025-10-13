<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        // التحقق من صحة البيانات المُدخلة
        $validated = $request->validate([
            'title' => 'required|string|max:255', // العنوان: مطلوب، نص، أقصى طول 255
            'description' => 'nullable|string', // الوصف: اختياري، نص
            'status' => 'required|in:pending,in_progress,completed', // الحالة: مطلوب، من القيم المحددة
            'priority' => 'required|in:low,medium,high', // الأولوية: مطلوب، من القيم المحددة
            'due_date' => 'nullable|date|after_or_equal:today', // تاريخ الاستحقاق: اختياري، تاريخ، من اليوم فصاعداً
        ]);

        // إنشاء المهمة وربطها بالمستخدم الحالي
        Task::create([
            ...$validated, // كل البيانات المُتحقق منها
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
    public function update(Request $request, Task $task)
    {
        // التأكد أن المهمة تخص المستخدم
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        // التحقق من البيانات
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date|after_or_equal:today',
        ]);

        // تحديث المهمة
        $task->update($validated);

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



