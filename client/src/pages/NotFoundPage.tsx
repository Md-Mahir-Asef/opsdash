import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import { Navigation } from "../components/common/Navigation";
import { Button } from "../components/common/Button";
import { Footer } from "../components/common/Footer";

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-dark-50 flex flex-col">
            <Navigation />
            
            <main className="flex-grow flex items-center justify-center section-padding">
                <div className="container-max">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                <h1 className="text-6xl md:text-8xl font-bold text-gradient animate-fade-in">
                                    404
                                </h1>
                                <h2 className="text-3xl md:text-4xl font-bold text-dark-900 animate-slide-up">
                                    Oops! Page Not Found
                                </h2>
                                <p className="text-lg md:text-xl text-dark-600 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
                                    The page you're looking for seems to have vanished into the digital void. 
                                    Don't worry, even the best operations dashboards have their moments!
                                </p>
                            </div>

                            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                                <p className="text-dark-600">
                                    Here are some helpful options to get you back on track:
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Button
                                        size="lg"
                                        onClick={() => navigate("/")}
                                        className="group"
                                    >
                                        <Home className="mr-2 h-5 w-5" />
                                        Back to Dashboard
                                        <ArrowLeft className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={() => navigate("/sign-in")}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                                <div className="bg-dark-100 p-4 rounded-lg border border-dark-300 hover:border-primary-500 transition-colors duration-200">
                                    <Search className="h-6 w-6 text-primary-600 mb-2" />
                                    <h3 className="font-semibold text-dark-900 mb-1">Search</h3>
                                    <p className="text-sm text-dark-600">Try searching for what you need</p>
                                </div>
                                <div className="bg-dark-100 p-4 rounded-lg border border-dark-300 hover:border-primary-500 transition-colors duration-200">
                                    <Home className="h-6 w-6 text-primary-600 mb-2" />
                                    <h3 className="font-semibold text-dark-900 mb-1">Homepage</h3>
                                    <p className="text-sm text-dark-600">Return to the main dashboard</p>
                                </div>
                                <div className="bg-dark-100 p-4 rounded-lg border border-dark-300 hover:border-primary-500 transition-colors duration-200">
                                    <Mail className="h-6 w-6 text-primary-600 mb-2" />
                                    <h3 className="font-semibold text-dark-900 mb-1">Support</h3>
                                    <p className="text-sm text-dark-600">Contact our help team</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Visual Elements */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative bg-dark-100 rounded-2xl p-8 border border-dark-300 shadow-2xl animate-fade-in">
                                <div className="space-y-6">
                                    {/* 404 Visual Representation */}
                                    <div className="text-center space-y-4">
                                        <div className="relative">
                                            <div className="text-6xl md:text-7xl font-bold text-primary-600 opacity-20">
                                                404
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-primary-500 rounded-full opacity-30 animate-bounce-slow"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="h-2 bg-dark-200 rounded-full w-3/4 mx-auto"></div>
                                            <div className="h-2 bg-dark-200 rounded-full w-1/2 mx-auto"></div>
                                            <div className="h-2 bg-dark-200 rounded-full w-2/3 mx-auto"></div>
                                        </div>
                                    </div>

                                    {/* Error Code Display */}
                                    <div className="bg-dark-200 rounded-lg p-4 font-mono text-sm">
                                        <div className="text-dark-600">// Error: Page Missing</div>
                                        <div className="text-primary-600">status_code: 404</div>
                                        <div className="text-dark-600">message: "Endpoint not found"</div>
                                        <div className="text-dark-600">solution: "Navigate to homepage"</div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <div className="flex-1 h-8 bg-primary-600 rounded animate-pulse"></div>
                                        <div className="flex-1 h-8 bg-dark-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 blur-xl"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-600 rounded-full opacity-20 blur-xl"></div>
                            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-dark-300 rounded-full opacity-30 blur-lg"></div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
