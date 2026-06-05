import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../components/forms/ProjectForm";
import { config } from "../../utils/config";

export default function EditProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project/${id}`,
                    { withCredentials: true },
                );
                const data = res?.data?.data?.data ?? res?.data?.data;
                setProject(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleSuccess = (updated: any) => {
        const newId = updated?.id ?? id;
        navigate(`/dashboard/projects/${newId}`);
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!project) {
        return <div className="p-8">Project not found.</div>;
    }

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-dark-900">
                    Edit Project
                </h1>
            </div>
            <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                <ProjectForm
                    mode="edit"
                    initialData={project}
                    projectId={Number(id)}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
}
