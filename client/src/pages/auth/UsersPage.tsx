import { Users, Plus, Search, Filter, Mail, Shield } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">Users</h1>
                <p className="text-dark-600">
                    Manage staff/clients and permissions
                </p>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search users..."
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
                    <span>Invite User</span>
                </button>
            </div>

            <div className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-dark-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                Permissions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-300">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <tr key={i} className="hover:bg-dark-200">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-dark-900">
                                                User {i}
                                            </div>
                                            <div className="text-sm text-dark-500">
                                                user{i}@example.com
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${
                                            i === 1
                                                ? "bg-purple-100 text-purple-800"
                                                : i <= 3
                                                  ? "bg-blue-100 text-blue-800"
                                                  : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {i === 1
                                            ? "Admin"
                                            : i <= 3
                                              ? "Manager"
                                              : "Member"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${
                                            i <= 6
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {i <= 6 ? "Active" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-500">
                                    {i === 1
                                        ? "Full Access"
                                        : i <= 3
                                          ? "Read & Write"
                                          : "Read Only"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-primary-600 hover:text-primary-900">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            8
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Total Users
                    </h3>
                    <p className="text-sm text-dark-600">
                        All registered users
                    </p>
                </div>

                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Shield className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            2
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Admins
                    </h3>
                    <p className="text-sm text-dark-600">
                        Users with full access
                    </p>
                </div>

                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Mail className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            2
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Pending Invites
                    </h3>
                    <p className="text-sm text-dark-600">Awaiting response</p>
                </div>
            </div>
        </div>
    );
}
