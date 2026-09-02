import { FolderKanban, Plus, Search, Filter, Trash2 } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/common/Pagination";
import { Button } from "../../components/common/Button";
import { config } from "../../utils/config";
import { useNavigate } from "react-router-dom";

interface Project {
    id: number;
    title: string;
    description?: string | null;
    status: string;
    client_email: string;
    due_date?: string | null;
    budget: number;
    _count?: {
        tasks: number;
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

const formatDate = (value?: string | null) => {
    if (!value) return "TBD";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
        null,
    );
    const serverDefaultLimit = 10;
    const navigate = useNavigate();

    const handleDeleteProject = async (projectId: number) => {
        if (!window.confirm("Delete this project? This cannot be undone.")) {
            return;
        }

        setDeletingProjectId(projectId);

        try {
            await axios.delete(
                `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project/${projectId}`,
                { withCredentials: true },
            );
            setProjects((prev) =>
                prev.filter((project) => project.id !== projectId),
            );
        } catch (error) {
            console.error("Error deleting project:", error);
        } finally {
            setDeletingProjectId(null);
        }
    };

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project?page=${currentPage}`,
                    { withCredentials: true },
                );
                console.log(
                    `/project?page=${currentPage} Got Response: `,
                    response.data?.data?.data,
                );
                const responseData = response.data?.data?.data;
                const loadedProjects: Project[] = responseData?.projects || [];
                const returnedTotal = responseData?.totalProjects ?? 0;
                const returnedLimit = responseData?.limit ?? serverDefaultLimit;

                setProjects(loadedProjects);
                setTotalPages(
                    Math.max(1, Math.ceil(returnedTotal / returnedLimit)),
                );
            } catch (error) {
                console.error("Error loading projects:", error);
                setProjects([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    Projects
                </h1>
                <p className="text-dark-600">
                    Main workspace hub for everything project-related
                </p>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                        />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-dark-100 border border-dark-300 rounded-lg hover:bg-dark-200">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
                <button
                    onClick={() => navigate("/dashboard/projects/new")}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }, (_, index) => (
                        <div
                            key={index}
                            className="animate-pulse bg-dark-100 border border-dark-300 rounded-lg p-6"
                        >
                            <div className="h-6 mb-4 bg-dark-200 rounded-lg" />
                            <div className="h-5 mb-3 bg-dark-200 rounded-lg w-3/4" />
                            <div className="h-4 mb-4 bg-dark-200 rounded-lg w-full" />
                            <div className="h-4 mb-2 bg-dark-200 rounded-lg w-5/6" />
                            <div className="h-2 mt-4 bg-dark-200 rounded-full" />
                        </div>
                    ))
                ) : projects.length > 0 ? (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-dark-100 border border-dark-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
                            onClick={() =>
                                navigate(`/dashboard/projects/${project.id}`)
                            }
                        >
                            <div className="flex items-center justify-between mb-4">
                                <FolderKanban className="w-8 h-8 text-primary-600" />
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeStyles(
                                        project.status,
                                    )}`}
                                >
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-dark-900 mb-2">
                                {project.title}
                            </h3>
                            <div className="text-dark-600 mb-4 min-h-[72px] h-[72px] line-clamp-3">
                                {project.description ||
                                    "No description available."}
                            </div>
                            <div className="flex items-center justify-between text-sm text-dark-500">
                                <span>Due: {formatDate(project.due_date)}</span>
                                <span>{project._count?.tasks ?? 0} tasks</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-dark-600">
                                            Client
                                        </span>
                                        <span className="text-sm text-dark-600 truncate">
                                            {project.client_email}
                                        </span>
                                    </div>
                                    <div className="text-sm text-dark-500">
                                        Budget: $
                                        {project.budget.toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="min-w-[96px]"
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/projects/${project.id}/edit`,
                                            )
                                        }
                                    >
                                        Update
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteProject(project.id)
                                        }
                                        disabled={
                                            deletingProjectId === project.id
                                        }
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 disabled:opacity-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-dark-100 border border-dark-300 rounded-lg p-8 text-center text-dark-600">
                        No projects found for this page.
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
    );
}
