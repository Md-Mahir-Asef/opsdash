import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    CheckSquare,
    Calendar,
    Mail,
    AlertCircle,
    ArrowLeft,
    Pencil,
    FolderKanban,
    ListChecks,
    Flag,
    User,
} from "lucide-react";
import { config } from "../../utils/config";
import { Button } from "../../components/common/Button";

function getStatusBadgeStyles(status: string) {
    switch (status) {
        case "Done":
            return "bg-green-100 text-green-800";
        case "InProgress":
            return "bg-amber-100 text-amber-800";
        case "Todo":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-dark-200 text-dark-700";
    }
}

function getPriorityBadgeStyles(priority: string) {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-800";
        case "Medium":
            return "bg-yellow-100 text-yellow-800";
        case "Low":
            return "bg-green-100 text-green-800";
        default:
            return "bg-dark-200 text-dark-700";
    }
}

function getStatusLabel(status: string) {
    switch (status) {
        case "Unconfirmed":
            return "Unconfirmed";
        case "Todo":
            return "To Do";
        case "InProgress":
            return "In Progress";
        case "Done":
            return "Done";
        default:
            return status;
    }
}

function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatDateTime(dateStr: string | null | undefined) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function daysUntil(dateStr: string | null | undefined) {
    if (!dateStr) return null;
    const diff = Math.ceil(
        (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return diff;
}

export default function TaskDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/task/${id}`,
                    { withCredentials: true },
                );
                const data = res?.data?.data?.data ?? res?.data?.data;
                setTask(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <div className="p-8">
                <div className="mb-8">
                    <div className="h-8 w-48 bg-dark-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-72 bg-dark-200 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-dark-100 border border-dark-300 rounded-lg p-6"
                        >
                            <div className="h-8 w-8 bg-dark-200 rounded animate-pulse mb-4" />
                            <div className="h-4 w-20 bg-dark-200 rounded animate-pulse mb-2" />
                            <div className="h-7 w-28 bg-dark-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <div className="h-6 w-36 bg-dark-200 rounded animate-pulse mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-4 w-24 bg-dark-200 rounded animate-pulse" />
                                    <div className="h-4 w-48 bg-dark-200 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <div className="h-6 w-36 bg-dark-200 rounded animate-pulse mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-4 w-36 bg-dark-200 rounded animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="p-8">
                <div className="bg-dark-100 border border-dark-300 rounded-lg p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-dark-900 mb-2">
                        Task Not Found
                    </h2>
                    <p className="text-dark-600 mb-6">
                        The task you're looking for doesn't exist or has been
                        removed.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/dashboard/tasks")}
                    >
                        Back to Tasks
                    </Button>
                </div>
            </div>
        );
    }

    const dueDays = daysUntil(task.due_date);
    const status = task.status || "Unconfirmed";
    const priority = task.priority || "NotSet";
    const title = task.title || "Untitled Task";

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center space-x-3 mb-1">
                        <h1 className="text-2xl font-bold text-dark-900">
                            {title}
                        </h1>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyles(status)}`}
                        >
                            {getStatusLabel(status)}
                        </span>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeStyles(priority)}`}
                        >
                            {priority}
                        </span>
                    </div>
                    <p className="text-dark-600">
                        {task.description || "No description provided."}
                    </p>
                </div>
                <div className="flex space-x-2 relative top-0 justify-start items-start">
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/dashboard/tasks")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate(`/dashboard/tasks/${id}/edit`)
                        }
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <FolderKanban className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Project</span>
                    </div>
                    <div className="text-xl font-bold text-dark-900 break-words">
                        {task.project?.title || `Project #${task.project_id}`}
                    </div>
                    {task.project?.id && (
                        <button
                            onClick={() =>
                                navigate(
                                    `/dashboard/projects/${task.project.id}`,
                                )
                            }
                            className="text-sm text-primary-600 hover:text-primary-900"
                        >
                            View project →
                        </button>
                    )}
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <Flag className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Priority</span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">
                        {priority}
                    </div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <User className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Assignee</span>
                    </div>
                    <div className="text-xl font-bold text-dark-900 break-words">
                        {task.assigned_staff_email || "Unassigned"}
                    </div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <Calendar className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Due Date</span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">
                        {formatDate(task.due_date)}
                    </div>
                    {dueDays !== null && task.due_date && (
                        <div
                            className={`text-sm font-medium ${
                                dueDays < 0
                                    ? "text-red-600"
                                    : dueDays <= 3
                                      ? "text-amber-600"
                                      : "text-green-600"
                            }`}
                        >
                            {dueDays < 0
                                ? `${Math.abs(dueDays)} day${Math.abs(dueDays) !== 1 ? "s" : ""} overdue`
                                : dueDays === 0
                                  ? "Due today"
                                  : `${dueDays} day${dueDays !== 1 ? "s" : ""} remaining`}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg">
                        <div className="p-4 border-b border-dark-300">
                            <h2 className="text-lg font-semibold text-dark-900">
                                Task Details
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <FolderKanban className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Project
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {task.project?.title ||
                                            `Project #${task.project_id}`}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <ListChecks className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Status
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {getStatusLabel(status)}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <Flag className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Priority
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {priority}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Assigned Staff
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {task.assigned_staff_email ||
                                            "Unassigned"}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Due Date
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {formatDate(task.due_date)}
                                    </span>
                                </div>

                                {task.description && (
                                    <>
                                        <div className="border-t border-dark-300" />
                                        <div className="flex items-start justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <CheckSquare className="w-4 h-4 text-dark-500" />
                                                <span className="text-sm text-dark-500">
                                                    Description
                                                </span>
                                            </div>
                                            <span className="text-dark-900 text-sm max-w-[50%] break-words">
                                                {task.description}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg">
                        <div className="p-4 border-b border-dark-300">
                            <h2 className="text-lg font-semibold text-dark-900">
                                Timeline
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-dark-500 mb-1">
                                        Created
                                    </div>
                                    <div className="text-sm text-dark-900">
                                        {formatDateTime(task.created_at)}
                                    </div>
                                </div>
                                <div className="border-t border-dark-300" />
                                <div>
                                    <div className="text-sm text-dark-500 mb-1">
                                        Last Updated
                                    </div>
                                    <div className="text-sm text-dark-900">
                                        {formatDateTime(task.updated_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-300 rounded-lg">
                        <div className="p-4 border-b border-dark-300">
                            <h2 className="text-lg font-semibold text-dark-900">
                                Quick Actions
                            </h2>
                        </div>
                        <div className="p-6 space-y-3">
                            <button
                                onClick={() =>
                                    navigate(`/dashboard/tasks/${id}/edit`)
                                }
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-dark-900 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
                            >
                                <Pencil className="w-4 h-4 text-primary-600" />
                                <span>Edit Task</span>
                            </button>
                            <button
                                onClick={() => navigate("/dashboard/tasks")}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-dark-900 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
                            >
                                <ListChecks className="w-4 h-4 text-primary-600" />
                                <span>All Tasks</span>
                            </button>
                            <button
                                onClick={() =>
                                    navigate("/dashboard/projects")
                                }
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-dark-900 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
                            >
                                <FolderKanban className="w-4 h-4 text-primary-600" />
                                <span>All Projects</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}