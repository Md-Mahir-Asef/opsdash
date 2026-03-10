import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Features", href: "#features" },
        { label: "Demo", href: "#demo" },
        { label: "Use Cases", href: "#use-cases" },
        { label: "Pricing", href: "#pricing" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-dark-50/95 backdrop-blur-sm border-b border-dark-300"
                    : "bg-transparent"
            }`}
        >
            <div className="container-max">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/logo-no-bg.png"
                            alt="OpsDash"
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-bold text-dark-900">
                            OpsDash
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-dark-600 hover:text-primary-500 transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                        <Button size="sm" onClick={() => navigate("/sign-in")}>
                            Get Started
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-dark-600 hover:text-primary-500 transition-colors"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-dark-50 border-t border-dark-300">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block px-3 py-2 text-dark-600 hover:text-primary-500 hover:bg-dark-100 rounded-md transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="px-3 py-2">
                                <Button
                                    size="sm"
                                    className="w-full"
                                    onClick={() => navigate("/sign-in")}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
