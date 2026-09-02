import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FolderKanban,
    DollarSign,
    Calendar,
    CheckSquare,
    Clock,
    Mail,
    AlertCircle,
    ArrowLeft,
    Pencil,
    Timer,
    CalendarCheck,
    CalendarClock,
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

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project/${id}`,
                    { withCredentials: true },
                );
                const data = res?.data?.data?.data ?? res?.data?.data;
                setProject(data);
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
                                <div key={i} className="h-4 w-36 bg-dark-200 rounded animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="p-8">
                <div className="bg-dark-100 border border-dark-300 rounded-lg p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-dark-900 mb-2">
                        Project Not Found
                    </h2>
                    <p className="text-dark-600 mb-6">
                        The project you're looking for doesn't exist or has been
                        removed.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/dashboard/projects")}
                    >
                        Back to Projects
                    </Button>
                </div>
            </div>
        );
    }

    const dueDays = daysUntil(project.due_date);
    const startDate = project.start_date || project.created_at;
    const endDate = project.end_date || project.due_date;
    const taskCount = project._count?.tasks ?? 0;
    const status = project.status || "Unconfirmed";

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center space-x-3 mb-1">
                        <h1 className="text-2xl font-bold text-dark-900">
                            {project.title}
                        </h1>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyles(status)}`}
                        >
                            {getStatusLabel(status)}
                        </span>
                    </div>
                    <p className="text-dark-600">
                        {project.description || "No description provided."}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/dashboard/projects")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate(`/dashboard/projects/${id}/edit`)
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
                        <DollarSign className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Budget</span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">
                        $
                        {project.budget?.toLocaleString?.() ??
                            project.budget}
                    </div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <CheckSquare className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Tasks</span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">
                        {taskCount}
                    </div>
                    <div className="text-sm text-dark-500">
                        {taskCount === 1 ? "task" : "tasks"} created
                    </div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <Timer className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Status</span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">
                        {getStatusLabel(status)}
                    </div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <Calendar className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">Due Date</span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">
                        {formatDate(project.due_date)}
                    </div>
                    {dueDays !== null && project.due_date && (
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
                                Project Details
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Client Email
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {project.client_email}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <CalendarClock className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Start Date
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {formatDate(startDate)}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <CalendarCheck className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            End Date
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {formatDate(endDate)}
                                    </span>
                                </div>
                                <div className="border-t border-dark-300" />

                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-4 h-4 text-dark-500" />
                                        <span className="text-sm text-dark-500">
                                            Due Date
                                        </span>
                                    </div>
                                    <span className="text-dark-900 text-sm">
                                        {formatDate(project.due_date)}
                                    </span>
                                </div>
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
                                        {formatDateTime(project.created_at)}
                                    </div>
                                </div>
                                <div className="border-t border-dark-300" />
                                <div>
                                    <div className="text-sm text-dark-500 mb-1">
                                        Last Updated
                                    </div>
                                    <div className="text-sm text-dark-900">
                                        {formatDateTime(project.updated_at)}
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
                                    navigate(
                                        `/dashboard/projects/${id}/edit`,
                                    )
                                }
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-dark-900 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
                            >
                                <Pencil className="w-4 h-4 text-primary-600" />
                                <span>Edit Project</span>
                            </button>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/dashboard/projects/${id}/tasks`,
                                    )
                                }
                                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-dark-900 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors"
                            >
                                <CheckSquare className="w-4 h-4 text-primary-600" />
                                <span>View Tasks</span>
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
