import React from "react";
import {
    Users,
    FolderKanban,
    CheckSquare,
    Shield,
    BarChart3,
    FileText,
    Search,
    Download,
    Clock,
    Target,
    TrendingUp,
    Settings,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "../common/Card";

export const Features: React.FC = () => {
    const features = [
        {
            icon: <Users className="h-8 w-8" />,
            title: "Client Management",
            description:
                "Centralized client database with detailed profiles, contact information, company details, and project history.",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: <FolderKanban className="h-8 w-8" />,
            title: "Project Tracking",
            description:
                "Full project lifecycle management with status tracking, priority levels, budgets, and timeline management.",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: <CheckSquare className="h-8 w-8" />,
            title: "Task Management",
            description:
                "Assign, track, and complete tasks efficiently with due dates, priorities, and team member assignments.",
            color: "bg-purple-100 text-purple-600",
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Role-Based Access",
            description:
                "Secure access control for Admin, Staff, Viewer, and Client roles with appropriate permissions.",
            color: "bg-red-100 text-red-600",
        },
        {
            icon: <BarChart3 className="h-8 w-8" />,
            title: "Real-Time Dashboards",
            description:
                "KPIs and charts for data-driven decisions with live project and team performance insights.",
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: "Activity Logging",
            description:
                "Complete audit trail of all user actions for compliance, accountability, and performance analysis.",
            color: "bg-indigo-100 text-indigo-600",
        },
        {
            icon: <FileText className="h-8 w-8" />,
            title: "Advanced Reporting",
            description:
                "Generate comprehensive CSV and PDF reports with filtering by client, project, status, or date range.",
            color: "bg-pink-100 text-pink-600",
        },
        {
            icon: <Search className="h-8 w-8" />,
            title: "Search & Filter",
            description:
                "Quickly find clients, projects, and tasks with advanced search and filtering capabilities.",
            color: "bg-teal-100 text-teal-600",
        },
    ];

    const advancedFeatures = [
        {
            icon: <Target className="h-6 w-6" />,
            title: "Customizable Workflows",
            description:
                "Adapt the system to your agency's unique processes and workflows.",
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "Performance Analytics",
            description:
                "Track team productivity, project profitability, and client satisfaction metrics.",
        },
        {
            icon: <Settings className="h-6 w-6" />,
            title: "Flexible Configuration",
            description:
                "Customize statuses, priorities, and fields to match your agency's needs.",
        },
        {
            icon: <Download className="h-6 w-6" />,
            title: "Data Export",
            description:
                "Export your data anytime in multiple formats for backup and analysis.",
        },
    ];

    return (
        <section id="features" className="py-20 bg-dark-50">
            <div className="container-max">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        Powerful Features for
                        <span className="text-gradient"> Modern Agencies</span>
                    </h2>
                    <p className="text-xl text-dark-600 max-w-3xl mx-auto">
                        Everything you need to manage your agency operations
                        efficiently, from client onboarding to project delivery
                        and team collaboration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <Card key={index} hover={true}>
                            <CardHeader>
                                <div
                                    className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-dark-900">
                                    {feature.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-dark-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="bg-dark-100 rounded-2xl p-8 border border-dark-300">
                    <h3 className="text-2xl font-bold text-dark-900 mb-8 text-center">
                        Advanced Capabilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {advancedFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start space-x-4"
                            >
                                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-dark-900 mb-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-dark-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
