import { Bell, Settings } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/react-router";

export default function Header() {
    return (
        <header className="bg-dark-100 border-b border-dark-300 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left Section - Workspace Selector */}
                <div className="bg-white rounded-md px-4 py-2">
                    <OrganizationSwitcher
                        appearance={{
                            elements: {
                                organizationPreviewAvatarBox: "w-6 h-6",
                            },
                        }}
                    />
                </div>

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
                    <div>
                        <UserButton />
                    </div>
                </div>
            </div>
        </header>
    );
}
