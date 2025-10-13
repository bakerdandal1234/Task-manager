import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { TaskFormData, TaskEditProps } from '@/types/task';
import { FormEventHandler } from 'react';
import { BreadcrumbItem } from '@/types/index';

export default function Edit({ task }: TaskEditProps) {
    // useForm مع البيانات الحالية وتحديد النوع
    const { data, setData, put, processing, errors } = useForm<TaskFormData>({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        due_date: task.due_date || '',
    });

    // دالة إرسال النموذج
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/tasks/${task.id}`);
    };
    const breadcrumbs: BreadcrumbItem[] = [
            {
                title: 'edit task',
                href: '/tasks/{task.id}/edit',
            },
           
        ];

    return (
        <AppLayout  breadcrumbs={breadcrumbs}>

            <Head title="Edit task" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* حقل العنوان */}
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                       task title<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=" title of the task"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* حقل الوصف */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        task description (optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder=" description of the task"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* الحالة والأولوية */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* حقل الحالة */}
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            task status<span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as 'pending' | 'in_progress' | 'completed')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="pending">pending</option>
                                            <option value="in_progress">in_progress</option>
                                            <option value="completed">completed</option>
                                        </select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                        )}
                                    </div>

                                    {/* حقل الأولوية */}
                                    <div>
                                        <label
                                            htmlFor="priority"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            priority<span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="priority"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value as 'low' | 'medium' | 'high')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="low">low</option>
                                            <option value="medium">medium</option>
                                            <option value="high">high</option> 
                                        </select>
                                        {errors.priority && (
                                            <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
                                        )}
                                    </div>
                                </div>

                                {/* حقل تاريخ الاستحقاق */}
                                <div>
                                    <label
                                        htmlFor="due_date"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        task due date (optional)
                                    </label>
                                    <input
                                        id="due_date"
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.due_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>
                                    )}
                                </div>

                                {/* معلومات إضافية */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <strong>date created:</strong> {new Date(task.created_at).toLocaleString('en-US')}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        <strong>date updated:</strong> {new Date(task.updated_at).toLocaleString('en-US')}
                                    </p>
                                </div>

                                {/* الأزرار */}
                                <div className="flex gap-4 justify-end">
                                    {/* زر الإلغاء */}
                                    <Link
                                        href="/tasks"
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        cancel
                                    </Link>

                                    {/* زر الحفظ */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'updating...' : 'update task'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
