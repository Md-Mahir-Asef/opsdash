import React from 'react';
import { ArrowRight, BarChart3, Users, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-50 via-dark-100 to-dark-50 pt-16">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-dark-900 leading-tight">
                Streamline Your
                <span className="text-gradient"> Agency Operations</span>
                <br />
                with OpsDash
              </h1>
              <p className="text-xl text-dark-600 leading-relaxed">
                Centralized client, project, and task management for small agencies. 
                Get real-time insights, comprehensive reporting, and role-based access control.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-dark-900">Role-Based Access</p>
                  <p className="text-sm text-dark-600">Admin, Staff & Client roles</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-dark-900">Real-Time Dashboards</p>
                  <p className="text-sm text-dark-600">KPIs & analytics</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-dark-900">Activity Logging</p>
                  <p className="text-sm text-dark-600">Complete audit trail</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-dark-100 rounded-2xl p-8 border border-dark-300 shadow-2xl">
              <div className="space-y-4">
                <div className="bg-dark-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-dark-900">Dashboard Overview</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-dark-100 p-3 rounded border border-dark-300">
                      <p className="text-2xl font-bold text-primary-600">24</p>
                      <p className="text-sm text-dark-600">Total Clients</p>
                    </div>
                    <div className="bg-dark-100 p-3 rounded border border-dark-300">
                      <p className="text-2xl font-bold text-primary-600">18</p>
                      <p className="text-sm text-dark-600">Active Projects</p>
                    </div>
                    <div className="bg-dark-100 p-3 rounded border border-dark-300">
                      <p className="text-2xl font-bold text-primary-600">142</p>
                      <p className="text-sm text-dark-600">Completed Tasks</p>
                    </div>
                    <div className="bg-dark-100 p-3 rounded border border-dark-300">
                      <p className="text-2xl font-bold text-primary-600">8</p>
                      <p className="text-sm text-dark-600">Team Members</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-200 rounded-lg p-4">
                  <h4 className="font-medium text-dark-900 mb-2">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-dark-600">New project created for Client A</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-dark-600">Task completed by John Doe</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-dark-600">Report generated successfully</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-600 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
