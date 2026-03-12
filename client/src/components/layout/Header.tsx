import { Bell, Settings } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/react-router";

export default function Header() {
    return (
        <header className="bg-dark-100 border-b border-dark-300 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left Section - Workspace Selector */}

                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            organizationSwitcherTriggerText: "text-white",
                        },
                    }}
                />

                {/* Right Section - Action Icons & User Profile */}
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-dark-200 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5 text-dark-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 hover:bg-dark-200 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-dark-600" />
                    </button>

                    {/* User Profile Avatar */}
                    <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-dark-300">
                        <button className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold relative">
                                MA
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-dark-100"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
