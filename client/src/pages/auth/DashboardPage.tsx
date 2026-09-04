import {
    LayoutDashboard,
    TrendingUp,
    Users,
    Activity,
    CheckSquare,
    Plus,
    Pencil,
    Trash2,
    Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { CardSkeleton } from "../../components/common/LoadingSkeleton";
import axios from "axios";
import { config } from "../../utils/config";

interface DashboardActivity {
    id: number;
    action: string;
    entity: string;
    metadata: Record<string, unknown> | null;
    created_at: string;
}

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState<DashboardActivity[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/activity?limit=5`,
                    { withCredentials: true },
                );
                const responseData = response.data?.data?.data;
                setRecentActivities(responseData?.activities || []);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="mb-8">
                    <div className="h-10 bg-dark-200 rounded w-1/3 animate-pulse mb-2"></div>
                    <div className="h-5 bg-dark-200 rounded w-1/2 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <div className="h-6 bg-dark-200 rounded w-1/4 animate-pulse mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-4 h-4 bg-dark-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-dark-200 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-dark-200 rounded w-16 animate-pulse ml-auto"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <div className="h-6 bg-dark-200 rounded w-1/3 animate-pulse mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-12 bg-dark-200 rounded animate-pulse"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    Dashboard
                </h1>
                <p className="text-dark-600">
                    Overview of KPIs and recent activity
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <LayoutDashboard className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">
                            Total Projects
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">12</div>
                    <div className="text-sm text-green-600">+2 this week</div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <CheckSquare className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">
                            Active Tasks
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">47</div>
                    <div className="text-sm text-green-600">+8 this week</div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">
                            Team Members
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">24</div>
                    <div className="text-sm text-dark-600">No change</div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="w-8 h-8 text-primary-600" />
                        <span className="text-sm text-dark-500">
                            Completion Rate
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-dark-900">87%</div>
                    <div className="text-sm text-green-600">+5% this month</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <h2 className="text-xl font-semibold text-dark-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-3">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((log) => {
                                const meta = log.metadata as Record<string, unknown> | null;
                                const title = (meta?.title as string) || "Untitled";
                                const ActionIcon =
                                    log.action === "Created"
                                        ? Plus
                                        : log.action === "Updated"
                                          ? Pencil
                                          : log.action === "Deleted"
                                            ? Trash2
                                            : Activity;
                                return (
                                    <div
                                        key={log.id}
                                        className="flex items-center space-x-3"
                                    >
                                        <ActionIcon className="w-4 h-4 text-primary-600 shrink-0" />
                                        <span className="text-dark-700 truncate">
                                            {log.action} {log.entity.toLowerCase()} &quot;{title}&quot;
                                        </span>
                                        <span className="text-sm text-dark-500 ml-auto whitespace-nowrap flex items-center space-x-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(
                                                    log.created_at,
                                                ).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-dark-500 text-sm">
                                No recent activity
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-dark-100 p-6 rounded-lg border border-dark-300">
                    <h2 className="text-xl font-semibold text-dark-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors">
                            Create New Project
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors">
                            Add New Task
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors">
                            Invite Team Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
