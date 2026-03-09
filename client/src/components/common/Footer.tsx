import React from "react";
import { Zap, Mail, Phone } from "lucide-react";
import { Button } from "./Button";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-100 border-t border-dark-300">
            <div className="container-max section-padding">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Zap className="h-8 w-8 text-primary-500" />
                            <span className="text-xl font-bold text-dark-900">
                                OpsDash
                            </span>
                        </div>
                        <p className="text-dark-600 mb-6 max-w-md">
                            Streamline your agency operations with our
                            comprehensive dashboard. Manage clients, projects,
                            tasks, and team members efficiently.
                        </p>
                        <div className="flex space-x-4">
                            <Button size="sm">Get Started Free</Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-dark-900 mb-4">
                            Product
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#features"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#use-cases"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    Use Cases
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#pricing"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-dark-900 mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#about"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#privacy"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#terms"
                                    className="text-dark-600 hover:text-primary-500 transition-colors"
                                >
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-dark-300 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-dark-600 text-sm">
                            © 2026 OpsDash. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <div className="flex items-center space-x-2 text-dark-600 text-sm">
                                <Mail className="h-4 w-4" />
                                <span>mdmahirasef.dev@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-dark-600 text-sm">
                                <Phone className="h-4 w-4" />
                                <span>+8801832055053</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
