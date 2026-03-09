import React from 'react';
import { AlertTriangle, FolderOpen, EyeOff, FileText, Users2, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';

export const Problem: React.FC = () => {
  const problems = [
    {
      icon: <FolderOpen className="h-6 w-6" />,
      title: "Scattered Client Information",
      description: "Client data spread across multiple tools, spreadsheets, and email threads making it impossible to get a complete view."
    },
    {
      icon: <EyeOff className="h-6 w-6" />,
      title: "No Clear Visibility",
      description: "Lack of real-time insights into project progress, team performance, and overall agency health."
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Inefficient Task Management",
      description: "Poor task assignment, missed deadlines, and no clear accountability across team members."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Manual Reporting Hell",
      description: "Hours spent manually compiling reports from different sources instead of focusing on client work."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Security Concerns",
      description: "Inadequate access controls and no audit trail for sensitive client and project data."
    },
    {
      icon: <TrendingDown className="h-6 w-6" />,
      title: "Poor Decision Making",
      description: "Making business decisions based on incomplete or outdated information."
    }
  ];

  return (
    <section className="py-20 bg-dark-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Managing Agency Operations is
            <span className="text-gradient"> Fragmented</span>
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Small agencies face significant challenges when trying to manage operations efficiently. 
            These problems cost time, money, and client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} hover={true}>
              <CardHeader>
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center text-red-600 mb-4">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark-900">
                  {problem.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-dark-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-dark-100 rounded-2xl p-8 border border-dark-300 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-dark-900 mb-4">
              The Cost of Poor Operations Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
                <p className="text-dark-600">Time wasted on administrative tasks</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">25%</div>
                <p className="text-dark-600">Projects miss deadlines due to poor coordination</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">30%</div>
                <p className="text-dark-600">Client satisfaction drops from poor communication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
