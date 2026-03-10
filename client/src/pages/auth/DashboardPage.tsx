import {
    LayoutDashboard,
    TrendingUp,
    Users,
    Activity,
    CheckSquare,
} from "lucide-react";

export default function DashboardPage() {
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
                        <div className="flex items-center space-x-3">
                            <Activity className="w-4 h-4 text-primary-600" />
                            <span className="text-dark-700">
                                New project "Website Redesign" created
                            </span>
                            <span className="text-sm text-dark-500 ml-auto">
                                2h ago
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Activity className="w-4 h-4 text-primary-600" />
                            <span className="text-dark-700">
                                Task "API Integration" completed
                            </span>
                            <span className="text-sm text-dark-500 ml-auto">
                                4h ago
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Activity className="w-4 h-4 text-primary-600" />
                            <span className="text-dark-700">
                                New team member added
                            </span>
                            <span className="text-sm text-dark-500 ml-auto">
                                1d ago
                            </span>
                        </div>
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
