import React from 'react';
import { 
  Database, 
  Shield, 
  Lock, 
  Server, 
  Code, 
  Users,
  CheckCircle,
  Award,
  Globe,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';

export const TechTrust: React.FC = () => {
  const techStack = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Modern Frontend",
      description: "React + Vite + TypeScript for fast, responsive user interfaces",
      color: "bg-blue-100 text-blue-600",
      features: ["React 18", "TypeScript", "Vite", "Responsive Design"]
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Robust Backend",
      description: "Node.js + Express + TypeScript for scalable API architecture",
      color: "bg-green-100 text-green-600",
      features: ["Node.js", "Express", "TypeScript", "REST API"]
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Reliable Database",
      description: "PostgreSQL for secure, reliable data storage and management",
      color: "bg-purple-100 text-purple-600",
      features: ["PostgreSQL", "ACID Compliance", "Backups", "Scaling"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Secure Authentication",
      description: "Clerk for enterprise-grade authentication and user management",
      color: "bg-yellow-100 text-yellow-600",
      features: ["Clerk Auth", "SSO Support", "Multi-factor", "Session Management"]
    }
  ];

  const trustIndicators = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols to protect your data"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Role-Based Access Control",
      description: "Granular permissions ensure users only see what they should"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Activity Audit Logs",
      description: "Complete audit trail for compliance and accountability"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "99.9% Uptime SLA",
      description: "Reliable service with guaranteed uptime and performance"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Compliance Ready",
      description: "Built to meet GDPR, CCPA, and other regulatory requirements"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "API-First Architecture",
      description: "RESTful APIs enable easy integration and extensibility"
    }
  ];

  const compliance = [
    "SOC 2 Type II Certified",
    "GDPR Compliant",
    "CCPA Compliant", 
    "ISO 27001 Aligned",
    "Regular Security Audits",
    "Penetration Testing"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-dark-100 to-dark-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Built with
            <span className="text-gradient"> Modern Technology</span>
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            OpsDash leverages cutting-edge technology and enterprise-grade security 
            to provide a reliable, scalable platform for your agency operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techStack.map((tech, index) => (
            <Card key={index} hover={true}>
              <CardHeader>
                <div className={`${tech.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-3">
                  {tech.title}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {tech.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-dark-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-dark-200 rounded-2xl p-8 border border-dark-300 mb-16">
          <h3 className="text-2xl font-bold text-dark-900 mb-8 text-center">
            Why Trust OpsDash?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                  {indicator.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-2">
                    {indicator.title}
                  </h4>
                  <p className="text-dark-600 text-sm">
                    {indicator.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-dark-900 mb-6">
              Security & Compliance
            </h3>
            <p className="text-dark-600 mb-6">
              We take security seriously. OpsDash is built with enterprise-grade 
              security measures and complies with major data protection regulations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {compliance.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-dark-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-dark-100 rounded-xl p-6 border border-dark-300">
            <h4 className="text-xl font-bold text-dark-900 mb-4">
              Data Protection Features
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-dark-900">Regular Backups</h5>
                  <p className="text-dark-600 text-sm">Automated daily backups with point-in-time recovery</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-dark-900">Access Controls</h5>
                  <p className="text-dark-600 text-sm">Multi-factor authentication and role-based permissions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-dark-900">Global Infrastructure</h5>
                  <p className="text-dark-600 text-sm">CDN and distributed architecture for reliability</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Production-Ready & Scalable
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              OpsDash is built to scale with your agency. From startup to enterprise, 
              our infrastructure grows with you while maintaining performance and reliability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <p className="text-primary-100 text-sm">Uptime SLA</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">&lt;200ms</div>
                <p className="text-primary-100 text-sm">Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p className="text-primary-100 text-sm">Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
