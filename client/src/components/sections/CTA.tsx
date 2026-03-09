import React from "react";
import { ArrowRight, Zap, CheckCircle, Star, Mail, Phone } from "lucide-react";
import { Button } from "../common/Button";

export const CTA: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
            <div className="container-max">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <Zap className="h-12 w-12 text-white" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Ready to Transform
                            <br />
                            Your Agency Operations?
                        </h2>
                    </div>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                        Join hundreds of agencies that have already streamlined
                        their operations with OpsDash. Start your free trial
                        today and see the difference in just 14 days.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button
                            size="lg"
                            className="bg-white text-primary-600 hover:bg-primary-50 shadow-xl"
                        >
                            Start Your Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <CheckCircle className="h-12 w-12 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                14-Day Free Trial
                            </h3>
                            <p className="text-primary-100">
                                Full access to all features. No credit card
                                required.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <Star className="h-12 w-12 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                5-Minute Setup
                            </h3>
                            <p className="text-primary-100">
                                Get started in minutes, not hours. Onboarding
                                included.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <Zap className="h-12 w-12 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                24/7 Support
                            </h3>
                            <p className="text-primary-100">
                                Our team is here to help you succeed every step
                                of the way.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                What Happens Next?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 mt-1">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">
                                            Sign Up Instantly
                                        </h4>
                                        <p className="text-primary-100 text-sm">
                                            Create your account in 30 seconds
                                            with email or Google SSO
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 mt-1">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">
                                            Onboard Your Team
                                        </h4>
                                        <p className="text-primary-100 text-sm">
                                            Invite team members and set roles in
                                            just a few clicks
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 mt-1">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">
                                            Import & Configure
                                        </h4>
                                        <p className="text-primary-100 text-sm">
                                            Import existing data or start fresh
                                            with our templates
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 mt-1">
                                        4
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">
                                            Start Managing
                                        </h4>
                                        <p className="text-primary-100 text-sm">
                                            Begin streamlining your agency
                                            operations immediately
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white rounded-xl p-6 text-dark-100">
                                <h4 className="text-xl font-bold mb-4">
                                    Need Help Getting Started?
                                </h4>
                                <p className="text-dark-100 mb-6">
                                    Our team is ready to help you make the most
                                    of OpsDash from day one.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 text-dark-100">
                                        <Mail className="h-5 w-5 text-primary-600" />
                                        <span>mdmahirasef.dev@gmail.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-dark-100">
                                        <Phone className="h-5 w-5 text-primary-600" />
                                        <span>+8801832055053</span>
                                    </div>
                                </div>
                                {/* <Button className="w-full mt-6 bg-primary-600 hover:bg-primary-700">
                  Schedule Onboarding Call
                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-primary-100 text-sm mb-4">
                        Trusted by 500+ agencies worldwide
                    </p>
                    <div className="flex items-center justify-center space-x-8">
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className="h-5 w-5 text-yellow-400 fill-current"
                                />
                            ))}
                        </div>
                        <span className="text-white font-semibold">4.9/5</span>
                        <span className="text-primary-100">
                            from 200+ reviews
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
