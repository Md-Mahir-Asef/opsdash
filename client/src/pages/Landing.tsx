import React from "react";
import { Navigation } from "../components/common/Navigation";
import { Hero } from "../components/sections/Hero";
import { Problem } from "../components/sections/Problem";
import { Solution } from "../components/sections/Solution";
import { Features } from "../components/sections/Features";
import { ProductDemo } from "../components/sections/ProductDemo";
import { UseCases } from "../components/sections/UseCases";
import { TechTrust } from "../components/sections/TechTrust";
import { FAQ } from "../components/sections/FAQ";
import { CTA } from "../components/sections/CTA";
import { Footer } from "../components/common/Footer";

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-dark-50">
            <Navigation />
            <main>
                <Hero />
                <Problem />
                <Solution />
                <Features />
                <ProductDemo />
                <UseCases />
                <TechTrust />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};
