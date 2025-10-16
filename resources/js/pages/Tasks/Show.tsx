import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { TaskShowProps } from '@/types/task';
import { BreadcrumbItem } from '@/types/index';

export default function Show({ task }: TaskShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Task Details',
            href: `/tasks/${task.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Details" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {task.title}
                                </h3>
                            </div>

                            {task.description && (
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {task.description}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <p className="text-sm text-gray-900 dark:text-white">{task.status}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Priority
                                    </label>
                                    <p className="text-sm text-gray-900 dark:text-white">{task.priority}</p>
                                </div>
                            </div>

                            {task.due_date && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Due Date
                                    </label>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {new Date(task.due_date).toLocaleDateString()}
                                    </p>
                                </div>
                            )}

                            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong>Date Created:</strong> {new Date(task.created_at).toLocaleString('en-US')}
                                </p>
                                <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
                                    <strong>Date Updated:</strong> {new Date(task.updated_at).toLocaleString('en-US')}
                                </p>
                            </div>

                            <div className="flex gap-4 justify-end">
                                <Link
                                    href="/tasks"
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Back to Tasks
                                </Link>
                                <Link
                                    href={`/tasks/${task.id}/edit`}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Edit Task
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}