import { User, Bell, Shield, Palette, Globe, Database } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                    Settings
                </h1>
                <p className="text-dark-600">
                    Profile, preferences, notifications, integrations
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        <button className="w-full flex items-center space-x-3 px-4 py-2 bg-primary-600 text-white rounded-lg">
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-dark-600 hover:bg-dark-200 rounded-lg">
                            <Bell className="w-5 h-5" />
                            <span>Notifications</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-dark-600 hover:bg-dark-200 rounded-lg">
                            <Shield className="w-5 h-5" />
                            <span>Security</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-dark-600 hover:bg-dark-200 rounded-lg">
                            <Palette className="w-5 h-5" />
                            <span>Appearance</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-dark-600 hover:bg-dark-200 rounded-lg">
                            <Globe className="w-5 h-5" />
                            <span>Language</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-dark-600 hover:bg-dark-200 rounded-lg">
                            <Database className="w-5 h-5" />
                            <span>Integrations</span>
                        </button>
                    </nav>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-dark-900 mb-6">
                            Profile Settings
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    JD
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                                        Change Avatar
                                    </button>
                                    <p className="text-sm text-dark-500 mt-1">
                                        JPG, PNG or GIF. Max 2MB
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="John"
                                        className="w-full px-4 py-2 bg-dark-50 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Doe"
                                        className="w-full px-4 py-2 bg-dark-50 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="john.doe@example.com"
                                    className="w-full px-4 py-2 bg-dark-50 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    rows={4}
                                    defaultValue="Senior developer with expertise in React and TypeScript."
                                    className="w-full px-4 py-2 bg-dark-50 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-dark-300">
                                <div>
                                    <h3 className="text-lg font-medium text-dark-900">
                                        Email Notifications
                                    </h3>
                                    <p className="text-sm text-dark-500">
                                        Receive email updates about your
                                        activity
                                    </p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-dark-900">
                                        Two-Factor Authentication
                                    </h3>
                                    <p className="text-sm text-dark-500">
                                        Add an extra layer of security to your
                                        account
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-dark-200 hover:bg-dark-300 rounded-lg">
                                    Enable
                                </button>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
                                <button className="px-6 py-2 bg-dark-200 hover:bg-dark-300 rounded-lg">
                                    Cancel
                                </button>
                                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
