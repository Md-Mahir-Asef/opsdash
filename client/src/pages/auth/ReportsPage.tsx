import { BarChart3, Calendar, TrendingUp, Clock, AlertCircle } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Reports & Analytics</h1>
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <p className="text-dark-600">Coming Soon - Advanced analytics and reporting features</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Feature in Development</h2>
            <p className="text-yellow-700 mb-4">
              Our comprehensive Reports & Analytics module is currently under development. 
              This feature will provide you with detailed insights, customizable dashboards, 
              and powerful analytics tools to help you make data-driven decisions.
            </p>
            <div className="space-y-2">
              <h3 className="font-medium text-yellow-800">What to expect:</h3>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                <li>Customizable dashboards and reports</li>
                <li>Real-time data visualization</li>
                <li>Performance metrics and KPIs</li>
                <li>Export capabilities (PDF, Excel, CSV)</li>
                <li>Scheduled report generation</li>
                <li>Advanced filtering and segmentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-dark-100 border border-dark-300 rounded-lg p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-primary-600" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Soon</span>
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">Performance Reports</h3>
          <p className="text-dark-600">Track team and project performance metrics over time.</p>
        </div>

        <div className="bg-dark-100 border border-dark-300 rounded-lg p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-primary-600" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Soon</span>
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">Trend Analysis</h3>
          <p className="text-dark-600">Identify trends and patterns in your project data.</p>
        </div>

        <div className="bg-dark-100 border border-dark-300 rounded-lg p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-primary-600" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Soon</span>
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">Time Tracking</h3>
          <p className="text-dark-600">Monitor time spent on tasks and projects.</p>
        </div>

        <div className="bg-dark-100 border border-dark-300 rounded-lg p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-primary-600" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Soon</span>
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">Productivity Metrics</h3>
          <p className="text-dark-600">Measure and analyze team productivity.</p>
        </div>

        <div className="bg-dark-100 border border-dark-300 rounded-lg p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-primary-600" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Soon</span>
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">Risk Assessment</h3>
          <p className="text-dark-600">Identify and mitigate project risks.</p>
        </div>

        <div className="bg-dark-100 border border-dark-300 rounded-lg p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-primary-600" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Soon</span>
          </div>
          <h3 className="text-lg font-semibold text-dark-900 mb-2">Custom Reports</h3>
          <p className="text-dark-600">Build custom reports tailored to your needs.</p>
        </div>
      </div>

      <div className="mt-8 bg-dark-100 border border-dark-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-900 mb-4">Get Notified</h2>
        <p className="text-dark-600 mb-4">
          Be the first to know when Reports & Analytics is available. Leave your email and we'll notify you upon launch.
        </p>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-dark-50 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
          />
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
