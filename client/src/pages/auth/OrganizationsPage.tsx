import { Building2, Plus, Search, Filter, Settings, Users } from "lucide-react";

export default function OrganizationsPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    Organizations
                </h1>
                <p className="text-dark-600">
                    Multi-organization support and admin control
                </p>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search organizations..."
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
                    <span>New Organization</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="bg-dark-100 border border-dark-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Building2 className="w-8 h-8 text-primary-600" />
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                    i === 1
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                {i === 1 ? "Active" : "Trial"}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-dark-900 mb-2">
                            Organization {i}
                        </h3>
                        <p className="text-dark-600 mb-4">
                            Description for organization {i} with details about
                            their operations.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-dark-500">Members</span>
                                <span className="font-medium text-dark-900">
                                    {10 + i * 5}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-dark-500">Projects</span>
                                <span className="font-medium text-dark-900">
                                    {5 + i * 2}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-dark-500">Created</span>
                                <span className="font-medium text-dark-900">
                                    Jan {i}, 2024
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dark-300">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-dark-500">
                                    Plan
                                </span>
                                <span className="text-sm font-medium text-dark-900">
                                    {i === 1
                                        ? "Enterprise"
                                        : i <= 3
                                          ? "Professional"
                                          : "Starter"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-2">
                            <button className="flex-1 px-3 py-2 bg-dark-200 hover:bg-dark-300 rounded text-sm transition-colors">
                                <Settings className="w-4 h-4 inline mr-1" />
                                Settings
                            </button>
                            <button className="flex-1 px-3 py-2 bg-dark-200 hover:bg-dark-300 rounded text-sm transition-colors">
                                <Users className="w-4 h-4 inline mr-1" />
                                Members
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-dark-100 border border-dark-300 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-dark-900 mb-4">
                    Organization Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                            6
                        </div>
                        <div className="text-sm text-dark-600">
                            Total Organizations
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            4
                        </div>
                        <div className="text-sm text-dark-600">
                            Active Organizations
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            2
                        </div>
                        <div className="text-sm text-dark-600">
                            Trial Organizations
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                            1
                        </div>
                        <div className="text-sm text-dark-600">
                            Enterprise Plans
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
