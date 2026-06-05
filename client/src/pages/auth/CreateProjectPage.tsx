import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/forms/ProjectForm";

export default function CreateProjectPage() {
    const navigate = useNavigate();

    const handleSuccess = (project: any) => {
        const id = project?.id;
        if (id) {
            navigate(`/dashboard/projects/${id}`);
        } else {
            navigate(`/dashboard/projects`);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-dark-900">
                    Create Project
                </h1>
                <p className="text-dark-600">
                    Create a new project for your organization.
                </p>
            </div>
            <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                <ProjectForm mode="create" onSuccess={handleSuccess} />
            </div>
        </div>
    );
}
