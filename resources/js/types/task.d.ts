import { User } from './index';

// حالات المهمة الممكنة
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

// مستويات الأولوية
export type TaskPriority = 'low' | 'medium' | 'high';

// نوع المهمة الأساسي
export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
    user?: User; // العلاقة مع المستخدم (اختيارية)
}

// نوع بيانات النموذج (للإضافة والتعديل)
export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string;
}

// Props لصفحة قائمة المهام
export interface TaskIndexProps {
    tasks: Task[];
    flash?: { // لإظهار رسائل النجاح أو الخطأ
        success?: string;
        error?: string;
    };
}

// Props لصفحة تعديل المهمة
export interface TaskEditProps {
    task: Task;
}

// Props لصفحة عرض المهمة
export interface TaskShowProps {
    task: Task;
}

// Props لصفحة إنشاء مهمة (عادةً فارغة لكن يمكن إضافة بيانات إضافية)
export interface TaskCreateProps {
    // يمكن إضافة أي بيانات إضافية هنا إذا احتجت
    // مثلاً: categories, tags, إلخ
}