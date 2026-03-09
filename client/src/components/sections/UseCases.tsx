import React from 'react';
import { 
  Globe, 
  Briefcase, 
  Palette, 
  Camera, 
  Code, 
  TrendingUp,
  Users,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';

export const UseCases: React.FC = () => {
  const useCases = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Small Digital Agencies",
      description: "Manage multiple client projects simultaneously with clear visibility into progress, deadlines, and team workload.",
      color: "bg-blue-100 text-blue-600",
      benefits: [
        "Multi-client project tracking",
        "Team workload management", 
        "Deadline monitoring",
        "Client reporting"
      ]
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Consulting Firms",
      description: "Track billable hours, manage client engagements, and deliver professional reports with comprehensive audit trails.",
      color: "bg-green-100 text-green-600",
      benefits: [
        "Billable hours tracking",
        "Engagement management",
        "Professional reporting",
        "Compliance documentation"
      ]
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Marketing Agencies",
      description: "Coordinate campaigns, manage creative workflows, and track campaign performance across multiple channels.",
      color: "bg-purple-100 text-purple-600",
      benefits: [
        "Campaign coordination",
        "Creative workflow management",
        "Performance tracking",
        "Multi-channel management"
      ]
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Creative Studios",
      description: "Manage client approvals, project timelines, and resource allocation for creative projects and productions.",
      color: "bg-pink-100 text-pink-600",
      benefits: [
        "Approval workflow",
        "Timeline management",
        "Resource allocation",
        "Client collaboration"
      ]
    }
  ];

  const additionalScenarios = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Development Agencies",
      description: "Track sprints, manage development workflows, and coordinate with clients on technical projects."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Agencies",
      description: "Manage client growth strategies, track performance metrics, and report on ROI."
    }
  ];

  return (
    <section id="use-cases" className="py-20 bg-dark-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Perfect for
            <span className="text-gradient"> Modern Agencies</span>
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            OpsDash is designed to meet the unique needs of different types of agencies. 
            See how our platform adapts to your specific business model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} hover={true}>
              <CardHeader>
                <div className={`${useCase.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                  {useCase.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {useCase.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-dark-900 mb-2">Key Benefits</h4>
                    <ul className="space-y-1">
                      {useCase.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-dark-600 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-dark-100 rounded-2xl p-8 border border-dark-300 mb-16">
          <h3 className="text-2xl font-bold text-dark-900 mb-8 text-center">
            Additional Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalScenarios.map((scenario, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                  {scenario.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-2">
                    {scenario.title}
                  </h4>
                  <p className="text-dark-600">
                    {scenario.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Join Agencies Already Transforming Their Operations
              </h3>
              <p className="text-primary-100 mb-6">
                Hundreds of agencies trust OpsDash to streamline their operations, 
                improve client satisfaction, and drive growth. See why we're the 
                preferred choice for modern agencies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Users className="h-6 w-6" />
                    <span className="text-3xl font-bold">500+</span>
                  </div>
                  <p className="text-primary-100 text-sm">Active Agencies</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Target className="h-6 w-6" />
                    <span className="text-3xl font-bold">10K+</span>
                  </div>
                  <p className="text-primary-100 text-sm">Projects Managed</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Award className="h-6 w-6" />
                    <span className="text-3xl font-bold">98%</span>
                  </div>
                  <p className="text-primary-100 text-sm">Client Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Clock className="h-12 w-12 text-white mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Start in Minutes</h4>
                <p className="text-primary-100 text-sm mb-4">
                  No lengthy setup process. Get your agency up and running today.
                </p>
                <button className="bg-white text-primary-600 font-semibold py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors w-full">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
