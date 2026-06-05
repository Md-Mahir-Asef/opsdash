import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FolderKanban } from "lucide-react";
import { config } from "../../utils/config";
import { Button } from "../../components/common/Button";

export default function ProjectDetailPage() {
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

    if (loading) return <div className="p-8">Loading...</div>;
    if (!project) return <div className="p-8">Project not found.</div>;

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-dark-900">
                        {project.title}
                    </h1>
                    <p className="text-dark-600">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/dashboard/projects")}
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate(`/dashboard/projects/${id}/edit`)
                        }
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <FolderKanban className="w-8 h-8 text-primary-600" />
                    <div>
                        <div className="text-sm text-dark-500">Client</div>
                        <div className="text-dark-900">
                            {project.client_email}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-dark-500">Budget</div>
                        <div className="text-dark-900">
                            $
                            {project.budget?.toLocaleString?.() ??
                                project.budget}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-dark-500">Due</div>
                        <div className="text-dark-900">
                            {project.due_date
                                ? new Date(
                                      project.due_date,
                                  ).toLocaleDateString()
                                : "TBD"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
