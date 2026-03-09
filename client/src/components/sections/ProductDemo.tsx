import React from 'react';
import { Play, Monitor, Users, FileText, BarChart3, Eye } from 'lucide-react';
import { Button } from '../common/Button';

export const ProductDemo: React.FC = () => {
  const demoSteps = [
    {
      step: 1,
      title: "Admin Dashboard Overview",
      description: "Get a bird's eye view of your entire agency operations with real-time KPIs, project status, and team performance metrics.",
      icon: <Monitor className="h-6 w-6" />,
      features: ["Total clients and projects", "Active tasks overview", "Team performance metrics", "Revenue tracking"]
    },
    {
      step: 2,
      title: "Project Creation & Management",
      description: "Create new projects, assign team members, set budgets and timelines, and track progress through customizable workflows.",
      icon: <Users className="h-6 w-6" />,
      features: ["Project templates", "Budget tracking", "Timeline management", "Team collaboration"]
    },
    {
      step: 3,
      title: "Task Assignment Workflow",
      description: "Efficiently assign tasks to team members, set priorities and due dates, and track completion status in real-time.",
      icon: <FileText className="h-6 w-6" />,
      features: ["Drag & drop interface", "Priority levels", "Due date tracking", "Status updates"]
    },
    {
      step: 4,
      title: "Report Generation",
      description: "Generate comprehensive reports with customizable filters, export to CSV/PDF, and schedule automated reports.",
      icon: <BarChart3 className="h-6 w-6" />,
      features: ["Custom filters", "Multiple export formats", "Scheduled reports", "Data visualization"]
    },
    {
      step: 5,
      title: "Client Portal View",
      description: "Provide clients with secure access to view their projects, track progress, and communicate with your team.",
      icon: <Eye className="h-6 w-6" />,
      features: ["Secure client access", "Project visibility", "Progress tracking", "Communication hub"]
    }
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-dark-100 to-dark-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            See OpsDash in
            <span className="text-gradient"> Action</span>
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Experience how OpsDash transforms agency operations with our interactive demo. 
            Explore the key features that make OpsDash the perfect solution for your agency.
          </p>
        </div>

        <div className="bg-dark-200 rounded-2xl p-8 border border-dark-300 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-dark-100 rounded-xl p-6 border border-dark-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-dark-900">Interactive Demo</h3>
                  <Button size="sm" className="flex items-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Play Demo</span>
                  </Button>
                </div>
                <div className="aspect-video bg-dark-50 rounded-lg flex items-center justify-center border-2 border-dashed border-dark-300">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                    <p className="text-dark-600 font-medium">Click to play interactive demo</p>
                    <p className="text-dark-500 text-sm">5-minute walkthrough of key features</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark-900">
                What You'll See in the Demo
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Complete Dashboard Tour</h4>
                    <p className="text-dark-600">Navigate through Admin, Staff, and Client dashboards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Real-Time Data Updates</h4>
                    <p className="text-dark-600">See how live updates keep your team synchronized</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Mobile Responsive Design</h4>
                    <p className="text-dark-600">Access your agency operations from any device</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Advanced Reporting</h4>
                    <p className="text-dark-600">Generate and customize reports for stakeholders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {demoSteps.map((step, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="bg-primary-100 px-3 py-1 rounded-full">
                    <span className="text-primary-700 font-medium text-sm">Step {step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-dark-900">{step.title}</h3>
                <p className="text-dark-600 leading-relaxed">{step.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-dark-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-dark-100 rounded-xl p-6 border border-dark-300">
                <div className="aspect-video bg-dark-50 rounded-lg flex items-center justify-center border-2 border-dashed border-dark-300">
                  <div className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center text-primary-600 mx-auto mb-4">
                      {step.icon}
                    </div>
                    <p className="text-dark-600 font-medium">{step.title}</p>
                    <p className="text-dark-500 text-sm">Interactive demo preview</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience OpsDash Yourself?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Start your free 14-day trial today. No credit card required. 
              Full access to all features and unlimited users during trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary-600 hover:bg-primary-50">
                Start Free Trial
              </Button>
              <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-600">
                Schedule Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
