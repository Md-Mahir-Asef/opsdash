import { Users, Plus, Search, Filter, Mail, Shield } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../utils/config";
import { Pagination } from "../../components/common/Pagination";

interface Member {
    id: string;
    role: string;
    publicUserData?: {
        firstName?: string;
        lastName?: string;
        identifier?: string;
        imageUrl?: string;
        userName?: string;
    };
    role_name?: string;
}

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalMembers, setTotalMembers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const load_organization_members = async () => {
            try {
                setLoading(true);

                const membersCount = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/organization/members/count`,
                    { withCredentials: true },
                );
                const totalCount = membersCount.data.data.count;
                setTotalMembers(totalCount);

                // Calculate total pages
                const calculatedTotalPages = Math.ceil(
                    totalCount / itemsPerPage,
                );
                setTotalPages(calculatedTotalPages);

                const membersByPage = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/organization/members/page?page=${currentPage}`,
                    { withCredentials: true },
                );
                console.info(
                    `/organization/members/page: Got Response`,
                    membersByPage.data.data,
                );

                // Handle both response formats (with and without pagination wrapper)
                const membersData =
                    membersByPage.data.data.members || membersByPage.data.data;
                const membersWithRoleName = membersData.map(
                    (member: Member) => ({
                        ...member,
                        role_name: member.role.slice(4),
                        publicUserData: member.publicUserData,
                    }),
                );
                setMembers(membersWithRoleName);
            } catch (error) {
                console.error(
                    `/organization/members: Got Error Response \n\n`,
                    error,
                );
            } finally {
                setLoading(false);
            }
        };
        load_organization_members();
    }, [currentPage]);

    // Handle page changes
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // To see if members state is really updated or not
    useEffect(() => {
        console.log(members.length);
        console.log("Members state updated:", members[0]);
    }, [members]);

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

            {loading ? (
                <div className="bg-dark-100 border border-dark-300 rounded-lg p-12">
                    <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                        <p className="text-dark-600 text-lg">
                            Loading members...
                        </p>
                    </div>
                </div>
            ) : (
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
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-300">
                            {members.map((member) => (
                                <tr
                                    key={member.id}
                                    className="hover:bg-dark-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                                                <img
                                                    src={`${member.publicUserData?.imageUrl}`}
                                                    alt="Member"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-dark-900">
                                                    {`${member.publicUserData?.firstName} ${member.publicUserData?.lastName}`}
                                                </div>
                                                <div className="text-sm text-dark-500">
                                                    {
                                                        member.publicUserData
                                                            ?.identifier
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                member.role_name === "admin"
                                                    ? "bg-green-100 text-green-800"
                                                    : member.role_name ===
                                                        "staff"
                                                      ? "bg-blue-100 text-blue-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {member.role_name}
                                        </span>
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
            )}

            {/* Pagination Component */}
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

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-dark-900">
                            {totalMembers}
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
                            {
                                members.filter((m) => m.role_name === "admin")
                                    .length
                            }
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
                            {
                                members.filter((m) => m.role_name === "staff")
                                    .length
                            }
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900">
                        Staff Members
                    </h3>
                    <p className="text-sm text-dark-600">Staff users</p>
                </div>
            </div>
        </div>
    );
}
