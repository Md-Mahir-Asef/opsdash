import { FolderKanban, Plus, Search, Filter } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Projects</h1>
        <p className="text-dark-600">Main workspace hub for everything project-related</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-dark-900"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-100 border border-dark-300 rounded-lg hover:bg-dark-200">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-dark-100 border border-dark-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <FolderKanban className="w-8 h-8 text-primary-600" />
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Project {i}</h3>
            <p className="text-dark-600 mb-4">Description for project {i} with key objectives and timeline.</p>
            <div className="flex items-center justify-between text-sm text-dark-500">
              <span>Due: Dec {20 + i}, 2024</span>
              <span>{5 + i * 2} tasks</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-dark-600">Progress</span>
                <span className="text-sm text-dark-600">{60 + i * 5}%</span>
              </div>
              <div className="w-full bg-dark-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${60 + i * 5}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
