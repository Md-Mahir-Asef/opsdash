import React from "react";
import { Navigation } from "../components/common/Navigation";
import { Hero } from "../components/sections/Hero";
import { Solution } from "../components/sections/Solution";
import { Features } from "../components/sections/Features";
import { ProductDemo } from "../components/sections/ProductDemo";
import { UseCases } from "../components/sections/UseCases";
import { TechTrust } from "../components/sections/TechTrust";
import { FAQ } from "../components/sections/FAQ";
import { Pricing } from "../components/sections/Pricing";
import { CTA } from "../components/sections/CTA";
import { Footer } from "../components/common/Footer";

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-dark-50">
            <Navigation />
            <main>
                <Hero />
                <Solution />
                <Features />
                <ProductDemo />
                <UseCases />
                <TechTrust />
                <FAQ />
                <Pricing />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};
