import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    Settings,
    BarChart3,
} from "lucide-react";

const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { path: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/dashboard/users", label: "Users", icon: Users },
    { path: "/dashboard/settings", label: "Settings", icon: Settings },
    {
        path: "/dashboard/reports",
        label: "Reports/Analytics",
        icon: BarChart3,
        comingSoon: true,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-dark-100 border-r border-dark-300">
            <div className="p-6">
                <h1 className="text-xl font-bold text-dark-900">OpsDash</h1>
            </div>

            <nav className="px-4 pb-6">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === "/dashboard"}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                            isActive
                                                ? "bg-primary-600 text-white"
                                                : "text-dark-600 hover:bg-dark-200 hover:text-dark-900"
                                        } ${item.comingSoon ? "opacity-60 cursor-not-allowed" : ""}`
                                    }
                                    onClick={(e) =>
                                        item.comingSoon && e.preventDefault()
                                    }
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                    {item.comingSoon && (
                                        <span className="ml-auto text-xs bg-dark-300 text-dark-600 px-2 py-1 rounded">
                                            Soon
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
