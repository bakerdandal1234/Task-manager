import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Task, TaskIndexProps, TaskPriority, TaskStatus } from '@/types/task';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/dashboard',
    },
];

export default function Index({ tasks }: TaskIndexProps) {
    const handleDelete = (taskId: number): void => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${taskId}`);
        }
    };

    const getStatusColor = (status: TaskStatus): string => {
        const colors: Record<TaskStatus, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
        };
        return colors[status];
    };

    // دالة لاختيار لون حسب الأولوية
    const getPriorityColor = (priority: TaskPriority): string => {
        const colors: Record<TaskPriority, string> = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-orange-100 text-orange-800',
            high: 'bg-red-100 text-red-800',
        };
        return colors[priority];
    };

    // ترجمة الحالة للعربية
    const getStatusTableValue = (status: TaskStatus): string => {
        return status;
    };
    const getPriorityTableValue = (priority: TaskPriority): string => {
        return priority;
    }

    // ترجمة الأولوية للعربية
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Tasks</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 dark:text-white">list of all tasks in your account</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link
                            href="/tasks/create"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            add new task
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {tasks.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                                            >
                                                title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white"
                                            >
                                                description
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white"
                                            >
                                                status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white"
                                            >
                                                priority
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white"
                                            >
                                                due date
                                            </th>
                                            {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0  dark:text-white">
                                                <span className="sr-only">Editttttt</span>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {tasks.map((task: Task) => (
                                            <tr key={task.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-right dark:text-white">
                                                    {task.title}
                                                </td>
                                                <td className="max-w-xs truncate whitespace-pre-wrap px-3 py-4 text-sm text-gray-500 text-right dark:text-white">
                                                    {task.description}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                                            task.status,
                                                        )}`}
                                                    >
                                                        {getStatusTableValue(task.status)}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
                                                            task.priority,
                                                        )}`}
                                                    >
                                                        {getPriorityTableValue(task.priority)}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                                                    {task.due_date
                                                        ? new Date(task.due_date).toLocaleDateString()
                                                        : 'غير محدد'}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <Link
                                                        href={`/tasks/${task.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        edit<span className="sr-only">, {task.title}</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(task.id)}
                                                        className="ml-4 text-red-600 hover:text-red-900"
                                                    >
                                                        delete<span className="sr-only">, {task.title}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-sm text-gray-500">no tasks found</p>
                                    <p className="mt-2">
                                        <Link
                                            href="/tasks/create"
                                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            add your first task
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}