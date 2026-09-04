import {
    CheckSquare,
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    FolderKanban,
    Trash2,
    AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { Pagination } from "../../components/common/Pagination";
import { Button } from "../../components/common/Button";
import { config } from "../../utils/config";
import { useNavigate } from "react-router-dom";

interface Task {
    id: number;
    project_id: number;
    title: string;
    description?: string | null;
    status: string;
    assigned_staff_email: string;
    priority: string;
    due_date?: string | null;
    created_at?: string;
    updated_at?: string;
    project?: {
        id: number;
        title: string;
    };
}

const getStatusBadgeStyles = (status: string) => {
    switch (status) {
        case "Todo":
            return "bg-blue-100 text-blue-800";
        case "InProgress":
            return "bg-amber-100 text-amber-800";
        case "Done":
            return "bg-green-100 text-green-800";
        default:
            return "bg-dark-200 text-dark-700";
    }
};

const getPriorityBadgeStyles = (priority: string) => {
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
};

const formatDate = (value?: string | null) => {
    if (!value) return "TBD";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [projects, setProjects] = useState<{ id: number; title: string }[]>(
        [],
    );
    const [selectedProjectId, setSelectedProjectId] = useState<
        number | ""
    >("");
    const serverDefaultLimit = 10;
    const navigate = useNavigate();

    const handleDeleteTask = async (taskId: number) => {
        if (!window.confirm("Delete this task? This cannot be undone.")) {
            return;
        }

        setDeletingTaskId(taskId);

        try {
            await axios.delete(
                `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/task/${taskId}`,
                { withCredentials: true },
            );
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setDeletingTaskId(null);
        }
    };

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project/all`,
                    { withCredentials: true },
                );
                const responseData = response.data?.data?.data;
                setProjects(responseData?.projects || []);
            } catch (error) {
                console.error("Error loading projects:", error);
                setProjects([]);
            }
        };

        loadProjects();
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setLoading(true);
                const query = new URLSearchParams({
                    page: String(currentPage),
                });
                if (selectedProjectId) {
                    query.set("projectId", String(selectedProjectId));
                }
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/task?${query.toString()}`,
                    { withCredentials: true },
                );
                console.log(
                    `/task?${query.toString()} Got Response: `,
                    response.data?.data?.data,
                );
                const responseData = response.data?.data?.data;
                const loadedTasks: Task[] = responseData?.tasks || [];
                const returnedTotal = responseData?.totalTasks ?? 0;
                const returnedLimit = responseData?.limit ?? serverDefaultLimit;

                setTasks(loadedTasks);
                setTotalPages(
                    Math.max(1, Math.ceil(returnedTotal / returnedLimit)),
                );
            } catch (error) {
                console.error("Error loading tasks:", error);
                setTasks([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [currentPage, selectedProjectId]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleProjectFilterChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value;
        setSelectedProjectId(value === "" ? "" : parseInt(value));
        setCurrentPage(1);
    };

    const filteredTasks = tasks.filter((task) => {
        const term = searchTerm.toLowerCase();
        return (
            task.title.toLowerCase().includes(term) ||
            (task.project?.title || "").toLowerCase().includes(term) ||
            task.assigned_staff_email.toLowerCase().includes(term)
        );
    });

    const totalTasks = tasks.length;
    const doneCount = tasks.filter((task) => task.status === "Done").length;
    const inProgressCount = tasks.filter(
        (task) => task.status === "InProgress",
    ).length;
    const pendingCount = tasks.filter(
        (task) => task.status === "Todo" || task.status === "Unconfirmed",
    ).length;
    const highPriorityCount = tasks.filter(
        (task) => task.priority === "High",
    ).length;
    const mediumPriorityCount = tasks.filter(
        (task) => task.priority === "Medium",
    ).length;
    const lowPriorityCount = tasks.filter(
        (task) => task.priority === "Low",
    ).length;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    Tasks
                </h1>
                <p className="text-dark-600">
                    Quick access to all tasks across projects
                </p>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="w-4 h-4 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <select
                            value={
                                selectedProjectId === ""
                                    ? ""
                                    : String(selectedProjectId)
                            }
                            onChange={handleProjectFilterChange}
                            className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900 appearance-none cursor-pointer"
                        >
                            <option value="">
                                {projects.length > 0
                                    ? "All Projects"
                                    : "No Projects"}
                            </option>
                            {projects.map((project) => (
                                <option
                                    key={project.id}
                                    value={project.id}
                                >
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={() => navigate("/dashboard/tasks/new")}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-dark-300">
                            <h2 className="text-lg font-semibold text-dark-900">
                                All Tasks
                            </h2>
                        </div>

                        {loading ? (
                            Array.from({ length: 5 }, (_, index) => (
                                <div
                                    key={index}
                                    className="p-4 border-b border-dark-300 animate-pulse"
                                >
                                    <div className="h-5 bg-dark-200 rounded-lg mb-2 w-2/3" />
                                    <div className="h-4 bg-dark-200 rounded-lg w-1/2" />
                                </div>
                            ))
                        ) : filteredTasks.length > 0 ? (
                            <div className="divide-y divide-dark-300">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="p-4 hover:bg-dark-200 transition-colors cursor-pointer"
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/tasks/${task.id}`,
                                            )
                                        }
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <h3 className="font-medium text-dark-900">
                                                        {task.title}
                                                    </h3>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusBadgeStyles(task.status)}`}
                                                    >
                                                        {task.status}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getPriorityBadgeStyles(task.priority)}`}
                                                    >
                                                        {task.priority}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-dark-600 mt-1 line-clamp-2">
                                                    {task.description ||
                                                        "No description provided."}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-dark-500">
                                                    {task.project && (
                                                        <span className="flex items-center space-x-1">
                                                            <FolderKanban className="w-4 h-4" />
                                                            <span>
                                                                {
                                                                    task.project
                                                                        .title
                                                                }
                                                            </span>
                                                        </span>
                                                    )}
                                                    <span className="flex items-center space-x-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>
                                                            Due:{" "}
                                                            {formatDate(
                                                                task.due_date,
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <User className="w-4 h-4" />
                                                        <span>
                                                            {
                                                                task.assigned_staff_email
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2 shrink-0">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(
                                                            `/dashboard/tasks/${task.id}/edit`,
                                                        );
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteTask(
                                                            task.id,
                                                        );
                                                    }}
                                                    disabled={
                                                        deletingTaskId ===
                                                        task.id
                                                    }
                                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-dark-600">
                                <AlertCircle className="w-8 h-8 text-dark-400 mx-auto mb-3" />
                                {selectedProjectId
                                    ? "No tasks found for the selected project."
                                    : searchTerm
                                      ? `No tasks match "${searchTerm}" for this page.`
                                      : "No tasks found for this page."}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            isLoading={loading}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-dark-900 mb-4">
                            Task Summary
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-dark-600">
                                    Total Tasks
                                </span>
                                <span className="font-medium text-dark-900">
                                    {totalTasks}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Done</span>
                                <span className="font-medium text-green-600">
                                    {doneCount}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">
                                    In Progress
                                </span>
                                <span className="font-medium text-yellow-600">
                                    {inProgressCount}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Pending</span>
                                <span className="font-medium text-red-600">
                                    {pendingCount}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-dark-900 mb-4">
                            Quick Stats
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-dark-600">
                                    High Priority: {highPriorityCount}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-dark-600">
                                    Medium Priority: {mediumPriorityCount}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-dark-600">
                                    Low Priority: {lowPriorityCount}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-dark-900 mb-4">
                            What's a Task?
                        </h3>
                        <p className="text-sm text-dark-600 leading-relaxed">
                            Tasks are scoped to a single project and help your
                            team track delivery. Assign a staff member, set a
                            priority, and update the status as work progresses
                            from Todo to Done.
                        </p>
                        <button
                            onClick={() => navigate("/dashboard/tasks/new")}
                            className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            <CheckSquare className="w-4 h-4" />
                            <span>Create a Task</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}