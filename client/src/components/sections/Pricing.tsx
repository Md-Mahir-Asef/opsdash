import React, { useState } from "react";
import { CheckCircle, Star, ArrowRight, CreditCard } from "lucide-react";
import { Card, CardHeader, CardContent } from "../common/Card";
import { Button } from "../common/Button";

export const Pricing: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const pricingTiers = [
        {
            name: "Starter",
            description: "Perfect for small agencies getting started",
            monthlyPrice: 29,
            annualPrice: 23,
            features: [
                "Up to 5 team members",
                "Unlimited projects",
                "Basic reporting",
                "Client portal access",
                "Email support",
                "1GB storage per user",
                "Mobile app access",
            ],
            popular: false,
            cta: "Start Free Trial",
        },
        {
            name: "Professional",
            description: "Ideal for growing agencies with advanced needs",
            monthlyPrice: 99,
            annualPrice: 79,
            features: [
                "Up to 20 team members",
                "Unlimited projects",
                "Advanced analytics & reporting",
                "Priority client support",
                "Custom workflows",
                "10GB storage per user",
                "API access",
                "Custom integrations",
                "Advanced permissions",
            ],
            popular: true,
            cta: "Start Free Trial",
        },
        {
            name: "Enterprise",
            description: "Complete solution for large agencies",
            monthlyPrice: 299,
            annualPrice: 239,
            features: [
                "Unlimited team members",
                "Unlimited projects",
                "White-label options",
                "Dedicated account manager",
                "Custom training & onboarding",
                "Unlimited storage",
                "Advanced security features",
                "SLA guarantee",
                "Custom development",
                "Priority feature requests",
            ],
            popular: false,
            cta: "Contact Sales",
        },
    ];

    const allPlansInclude = [
        "14-day free trial",
        "No credit card required",
        "Cancel anytime",
        "24/7 email support",
        "Data export anytime",
        "GDPR compliant",
        "99.9% uptime SLA",
    ];

    return (
        <section id="pricing" className="py-20 bg-dark-50">
            <div className="container-max">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <CreditCard className="h-8 w-8 text-primary-600" />
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
                            Simple, Transparent
                            <span className="text-gradient"> Pricing</span>
                        </h2>
                    </div>
                    <p className="text-xl text-dark-600 max-w-3xl mx-auto mb-8">
                        Choose the perfect plan for your agency. All plans
                        include our core features with no hidden fees or
                        surprise charges.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center space-x-4">
                        <span
                            className={`text-lg font-medium ${isAnnual ? "text-dark-500" : "text-dark-900"}`}
                        >
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative inline-flex h-8 w-14 items-center rounded-full bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                    isAnnual ? "translate-x-7" : "translate-x-1"
                                }`}
                            />
                        </button>
                        <span
                            className={`text-lg font-medium ${isAnnual ? "text-dark-900" : "text-dark-500"}`}
                        >
                            Annual
                            <span className="ml-2 text-sm text-primary-600 font-semibold">
                                (Save 20%)
                            </span>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pricingTiers.map((tier, index) => (
                        <Card
                            key={index}
                            className={`relative ${tier.popular ? "border-primary-500 shadow-xl scale-105" : "hover:border-primary-500 hover:shadow-lg transition-all duration-300"}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <CardHeader className="text-center">
                                <h3 className="text-2xl font-bold text-dark-900 mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-dark-600 mb-4">
                                    {tier.description}
                                </p>

                                <div className="mb-6">
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl font-bold text-dark-900">
                                            $
                                            {isAnnual
                                                ? tier.annualPrice
                                                : tier.monthlyPrice}
                                        </span>
                                        <span className="text-dark-600 ml-2">
                                            /month
                                        </span>
                                    </div>
                                    {isAnnual && (
                                        <p className="text-sm text-primary-600 font-medium mt-1">
                                            Billed annually ($
                                            {tier.annualPrice * 12}/year)
                                        </p>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <Button
                                    size="lg"
                                    className={`w-full mb-6 ${
                                        tier.popular
                                            ? "bg-primary-600 hover:bg-primary-700 text-white"
                                            : "bg-dark-200 hover:bg-dark-300 text-dark-800"
                                    }`}
                                >
                                    {tier.cta}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>

                                <ul className="space-y-3">
                                    {tier.features.map(
                                        (feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start space-x-3"
                                            >
                                                <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-dark-700">
                                                    {feature}
                                                </span>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* All Plans Include */}
                <div className="bg-dark-100 rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-bold text-dark-900 text-center mb-8">
                        All Plans Include
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allPlansInclude.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3"
                            >
                                <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                                <span className="text-dark-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-8 mb-6">
                        <div className="flex items-center space-x-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </div>
                        <span className="text-dark-700 font-semibold">
                            4.9/5
                        </span>
                        <span className="text-dark-600">from 500+ reviews</span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-green-800">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-semibold">
                                30-day money-back guarantee
                            </span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                            Try OpsDash risk-free. If you're not completely
                            satisfied, get a full refund.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
