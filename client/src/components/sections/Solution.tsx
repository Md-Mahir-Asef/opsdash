import React from "react";
import {
    CheckCircle,
    Shield,
    BarChart3,
    Users,
    FileText,
    Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export const Solution: React.FC = () => {
    const navigate = useNavigate();
    const benefits = [
        {
            icon: <CheckCircle className="h-6 w-6" />,
            title: "Single Platform",
            description:
                "All your agency operations in one place - no more switching between multiple tools.",
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Role-Based Access",
            description:
                "Secure access control for Admin, Staff, and Client users with appropriate permissions.",
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Real-Time Dashboards",
            description:
                "KPIs and charts for data-driven decisions with live project and team insights.",
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: "Comprehensive Reports",
            description:
                "Generate CSV and PDF reports with filtering by client, project, status, or date range.",
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Activity Logging",
            description:
                "Complete audit trail of all user actions for compliance and accountability.",
        },
        {
            icon: <Lock className="h-6 w-6" />,
            title: "Enterprise Security",
            description:
                "Bank-level security with encrypted data and secure authentication via Clerk.",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-dark-100 to-dark-50">
            <div className="container-max">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        OpsDash: Your
                        <span className="text-gradient">
                            {" "}
                            Complete Operations Hub
                        </span>
                    </h2>
                    <p className="text-xl text-dark-600 max-w-3xl mx-auto">
                        Transform how your agency operates with a comprehensive
                        solution designed specifically for small agencies that
                        need enterprise-grade capabilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-dark-50 border border-dark-300 rounded-xl p-6 hover:border-primary-500 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-dark-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-dark-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-dark-200 rounded-2xl p-8 border border-dark-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-dark-900 mb-6">
                                Everything You Need to Run Your Agency
                                Efficiently
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-dark-900">
                                            Centralized Client Management
                                        </h4>
                                        <p className="text-dark-600">
                                            Store all client information,
                                            projects, and communications in one
                                            place
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-dark-900">
                                            Project & Task Tracking
                                        </h4>
                                        <p className="text-dark-600">
                                            Complete visibility into project
                                            progress and task completion
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-dark-900">
                                            Team Collaboration
                                        </h4>
                                        <p className="text-dark-600">
                                            Assign tasks, track progress, and
                                            improve team coordination
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-dark-900">
                                            Data-Driven Insights
                                        </h4>
                                        <p className="text-dark-600">
                                            Make informed decisions with
                                            real-time dashboards and reports
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    onClick={() => navigate("/sign-in")}
                                >
                                    Start Your Free Trial
                                </Button>
                            </div>
                        </div>
                        <div className="bg-dark-100 rounded-xl p-6 border border-dark-300">
                            <h4 className="font-semibold text-dark-900 mb-4">
                                Quick Setup Process
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                                        1
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-dark-900">
                                            Sign Up
                                        </h5>
                                        <p className="text-sm text-dark-600">
                                            Create your account in 2 minutes
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                                        2
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-dark-900">
                                            Import Data
                                        </h5>
                                        <p className="text-sm text-dark-600">
                                            Import existing clients and projects
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                                        3
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-dark-900">
                                            Invite Team
                                        </h5>
                                        <p className="text-sm text-dark-600">
                                            Add team members with appropriate
                                            roles
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                                        4
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-dark-900">
                                            Start Managing
                                        </h5>
                                        <p className="text-sm text-dark-600">
                                            Begin streamlining your operations
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
