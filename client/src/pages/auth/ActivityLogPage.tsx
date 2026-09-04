import {
    Activity,
    Search,
    Filter,
    Plus,
    Pencil,
    Trash2,
    FolderKanban,
    CheckSquare,
    Clock,
    AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../utils/config";
import { Pagination } from "../../components/common/Pagination";

interface ActivityLog {
    id: number;
    action: "Created" | "Updated" | "Deleted";
    entity: "Project" | "Task";
    entity_id: number | null;
    org_id: string;
    actor_id: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
}

const getActionBadgeStyles = (action: string) => {
    switch (action) {
        case "Created":
            return "bg-green-100 text-green-800";
        case "Updated":
            return "bg-blue-100 text-blue-800";
        case "Deleted":
            return "bg-red-100 text-red-800";
        default:
            return "bg-dark-200 text-dark-700";
    }
};

const getActionIcon = (action: string) => {
    switch (action) {
        case "Created":
            return Plus;
        case "Updated":
            return Pencil;
        case "Deleted":
            return Trash2;
        default:
            return Activity;
    }
};

const getEntityBadgeStyles = (entity: string) => {
    switch (entity) {
        case "Project":
            return "bg-purple-100 text-purple-800";
        case "Task":
            return "bg-amber-100 text-amber-800";
        default:
            return "bg-dark-200 text-dark-700";
    }
};

const formatDateTime = (value?: string | null) => {
    if (!value) return "N/A";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const buildDescription = (log: ActivityLog) => {
    const meta = log.metadata as Record<string, unknown> | null;
    const changes = meta?.changes as
        | Record<string, { from: unknown; to: unknown }>
        | undefined;

    switch (`${log.action}_${log.entity}`) {
        case "Created_Project":
            return `Created project "${meta?.title ?? "Untitled"}"`;
        case "Updated_Project": {
            const count = changes ? Object.keys(changes).length : 0;
            return `Updated project "${meta?.title ?? "Untitled"}" \u2014 ${count} field${count !== 1 ? "s" : ""} changed`;
        }
        case "Deleted_Project":
            return `Deleted project "${meta?.title ?? "Untitled"}"`;
        case "Created_Task":
            return `Created task "${meta?.title ?? "Untitled"}" in project #${meta?.project_id ?? "?"}`;
        case "Updated_Task": {
            const count = changes ? Object.keys(changes).length : 0;
            return `Updated task "${meta?.title ?? "Untitled"}" \u2014 ${count} field${count !== 1 ? "s" : ""} changed`;
        }
        case "Deleted_Task":
            return `Deleted task "${meta?.title ?? "Untitled"}" from project #${meta?.project_id ?? "?"}`;
        default:
            return `${log.action} ${log.entity}`;
    }
};

export default function ActivityLogPage() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalActivities, setTotalActivities] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [entityFilter, setEntityFilter] = useState<string>("All");
    const [actionFilter, setActionFilter] = useState<string>("All");
    const limit = 25;

    useEffect(() => {
        const loadActivities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/activity?page=${currentPage}&limit=${limit}`,
                    { withCredentials: true },
                );
                const responseData = response.data?.data?.data;
                const loadedActivities: ActivityLog[] =
                    responseData?.activities || [];
                const returnedTotal = responseData?.totalActivities ?? 0;
                const returnedLimit = responseData?.limit ?? limit;

                setActivities(loadedActivities);
                setTotalActivities(returnedTotal);
                setTotalPages(
                    Math.max(1, Math.ceil(returnedTotal / returnedLimit)),
                );
            } catch (error) {
                console.error("Error loading activities:", error);
                setActivities([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        loadActivities();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredActivities = activities.filter((log) => {
        const term = searchTerm.toLowerCase();
        const description = buildDescription(log).toLowerCase();
        const matchesSearch =
            !term ||
            description.includes(term) ||
            (log.actor_id || "").toLowerCase().includes(term);
        const matchesEntity =
            entityFilter === "All" || log.entity === entityFilter;
        const matchesAction =
            actionFilter === "All" || log.action === actionFilter;
        return matchesSearch && matchesEntity && matchesAction;
    });

    const createdCount = activities.filter(
        (l) => l.action === "Created",
    ).length;
    const updatedCount = activities.filter(
        (l) => l.action === "Updated",
    ).length;
    const deletedCount = activities.filter(
        (l) => l.action === "Deleted",
    ).length;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    Activity Log
                </h1>
                <p className="text-dark-600">
                    Audit trail of all changes across projects and tasks
                </p>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-dark-500" />
                        {["All", "Project", "Task"].map((entity) => (
                            <button
                                key={entity}
                                onClick={() => setEntityFilter(entity)}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                    entityFilter === entity
                                        ? "bg-primary-600 text-white"
                                        : "bg-dark-100 border border-dark-300 text-dark-600 hover:bg-dark-200"
                                }`}
                            >
                                {entity === "All" ? "All Entities" : entity}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        {["All", "Created", "Updated", "Deleted"].map(
                            (action) => (
                                <button
                                    key={action}
                                    onClick={() => setActionFilter(action)}
                                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                        actionFilter === action
                                            ? "bg-primary-600 text-white"
                                            : "bg-dark-100 border border-dark-300 text-dark-600 hover:bg-dark-200"
                                    }`}
                                >
                                    {action === "All"
                                        ? "All Actions"
                                        : action}
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-dark-300">
                    <h2 className="text-lg font-semibold text-dark-900">
                        All Activities
                    </h2>
                </div>

                {loading ? (
                    <div className="divide-y divide-dark-300">
                        {Array.from({ length: 8 }, (_, index) => (
                            <div
                                key={index}
                                className="p-4 animate-pulse"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-6 bg-dark-200 rounded-full"></div>
                                    <div className="w-16 h-6 bg-dark-200 rounded-full"></div>
                                    <div className="flex-1 h-4 bg-dark-200 rounded"></div>
                                    <div className="w-24 h-4 bg-dark-200 rounded"></div>
                                    <div className="w-32 h-4 bg-dark-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredActivities.length > 0 ? (
                    <table className="w-full">
                        <thead className="bg-dark-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                    Action
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                    Entity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                    Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                    Actor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-300">
                            {filteredActivities.map((log) => {
                                const ActionIcon = getActionIcon(log.action);
                                return (
                                    <tr
                                        key={log.id}
                                        className="hover:bg-dark-200 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${getActionBadgeStyles(log.action)}`}
                                            >
                                                <ActionIcon className="w-3.5 h-3.5" />
                                                <span>{log.action}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${getEntityBadgeStyles(log.entity)}`}
                                            >
                                                {log.entity === "Project" ? (
                                                    <FolderKanban className="w-3.5 h-3.5" />
                                                ) : (
                                                    <CheckSquare className="w-3.5 h-3.5" />
                                                )}
                                                <span>{log.entity}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-dark-700">
                                                {buildDescription(log)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">
                                            {log.actor_id
                                                ? log.actor_id.length > 16
                                                    ? `${log.actor_id.slice(0, 16)}...`
                                                    : log.actor_id
                                                : "System"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">
                                            <span className="flex items-center space-x-1.5">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    {formatDateTime(
                                                        log.created_at,
                                                    )}
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-dark-600">
                        <AlertCircle className="w-8 h-8 text-dark-400 mx-auto mb-3" />
                        {searchTerm || entityFilter !== "All" || actionFilter !== "All"
                            ? "No activities match your filters."
                            : "No activity logs found."}
                    </div>
                )}
            </div>

            {!loading && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        isLoading={loading}
                    />
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Activity className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            {totalActivities}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Total Activities
                    </h3>
                    <p className="text-sm text-dark-600">
                        All recorded events
                    </p>
                </div>

                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Plus className="w-8 h-8 text-green-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            {createdCount}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Created
                    </h3>
                    <p className="text-sm text-dark-600">
                        New projects & tasks
                    </p>
                </div>

                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Pencil className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            {updatedCount}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Updated
                    </h3>
                    <p className="text-sm text-dark-600">
                        Modified records
                    </p>
                </div>

                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            {deletedCount}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Deleted
                    </h3>
                    <p className="text-sm text-dark-600">
                        Removed records
                    </p>
                </div>
            </div>
        </div>
    );
}
