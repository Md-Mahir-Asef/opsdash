import { Plus, Search, Filter, Calendar, User } from "lucide-react";

export default function TasksPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">Tasks</h1>
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
                            className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                        />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-dark-100 border border-dark-300 rounded-lg hover:bg-dark-200">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    <span>New Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg">
                        <div className="p-4 border-b border-dark-300">
                            <h2 className="text-lg font-semibold text-dark-900">
                                All Tasks
                            </h2>
                        </div>
                        <div className="divide-y divide-dark-300">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div
                                    key={i}
                                    className="p-4 hover:bg-dark-200 transition-colors"
                                >
                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            className="mt-1 rounded border-dark-300"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-dark-900">
                                                Task {i}: Complete feature
                                                implementation
                                            </h3>
                                            <p className="text-sm text-dark-600 mt-1">
                                                Description of the task and
                                                requirements for completion.
                                            </p>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-dark-500">
                                                <span className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        Dec {15 + i}, 2024
                                                    </span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>
                                                        Assigned to User {i}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                i <= 3
                                                    ? "bg-red-100 text-red-800"
                                                    : i <= 6
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {i <= 3
                                                ? "High"
                                                : i <= 6
                                                  ? "Medium"
                                                  : "Low"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                    24
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Completed</span>
                                <span className="font-medium text-green-600">
                                    8
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">
                                    In Progress
                                </span>
                                <span className="font-medium text-yellow-600">
                                    12
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Pending</span>
                                <span className="font-medium text-red-600">
                                    4
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
                                    High Priority: 4
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-dark-600">
                                    Medium Priority: 12
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-dark-600">
                                    Low Priority: 8
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
