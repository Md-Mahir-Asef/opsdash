import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How is OpsDash different from other project management tools?",
      answer: "OpsDash is specifically designed for agencies with role-based access control (Admin, Staff, Client), comprehensive activity logging, and agency-specific features like client management and reporting. Unlike generic project tools, we provide a complete operations hub tailored to agency workflows."
    },
    {
      question: "Can clients access their own projects?",
      answer: "Yes! OpsDash includes a dedicated Client Portal where clients can view their projects, track progress, and communicate with your team. Client access is restricted to only their assigned projects and information, ensuring data privacy and security."
    },
    {
      question: "What reporting capabilities are available?",
      answer: "OpsDash offers comprehensive reporting with customizable filters by client, project, status, or date range. You can generate reports in both CSV and PDF formats, schedule automated reports, and create custom dashboards with real-time KPIs and analytics."
    },
    {
      question: "Is my data secure with OpsDash?",
      answer: "Absolutely. We use bank-level encryption for all data, implement role-based access controls, maintain complete audit trails, and comply with GDPR, CCPA, and other regulations. Our infrastructure includes regular security audits, penetration testing, and 99.9% uptime SLA."
    },
    {
      question: "Can I customize user roles and permissions?",
      answer: "OpsDash comes with predefined roles (Admin, Staff, Viewer, Client) that cover most agency needs. Admin users have granular control over permissions and can customize access levels. Future updates will include fully customizable role creation."
    },
    {
      question: "How long does it take to set up OpsDash?",
      answer: "Setup is quick and easy. Most agencies are fully operational within 30 minutes. The process includes creating your account, importing existing data (optional), inviting team members, and configuring your workspace. We also provide onboarding assistance for larger teams."
    },
    {
      question: "What's included in the free trial?",
      answer: "The 14-day free trial includes full access to all features, unlimited users, unlimited projects, and complete functionality. No credit card is required to start. You can import data, customize workflows, and experience everything OpsDash has to offer."
    },
    {
      question: "Can I integrate OpsDash with other tools?",
      answer: "Yes, OpsDash features API-first architecture with RESTful APIs for easy integration. We also support integrations with popular tools like Slack, Google Workspace, and accounting software. Custom integrations can be developed using our comprehensive API documentation."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 email support, comprehensive documentation, video tutorials, and a knowledge base. Premium plans include priority support, dedicated account managers, and custom onboarding sessions for larger teams."
    },
    {
      question: "Can I export my data if I need to leave?",
      answer: "Yes, you own your data. OpsDash allows you to export all your data at any time in multiple formats including CSV, JSON, and PDF. We believe in data portability and make it easy to take your information with you."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-dark-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
              Frequently Asked
              <span className="text-gradient"> Questions</span>
            </h2>
          </div>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Got questions about OpsDash? We've got answers. 
            Browse our FAQ or contact our support team for more information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <Card key={index} className="cursor-pointer hover:border-primary-500 transition-colors">
              <CardHeader 
                className="flex items-center justify-between p-6"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-dark-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary-600" />
                  )}
                </div>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0 px-6 pb-6">
                  <p className="text-dark-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Whether you need technical assistance, 
              want to schedule a demo, or have questions about pricing, we're here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
                Schedule Demo
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">24/7</div>
                <p className="text-primary-100 text-sm">Email Support</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">&lt;2hrs</div>
                <p className="text-primary-100 text-sm">Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">98%</div>
                <p className="text-primary-100 text-sm">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
