import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../components/forms/ProjectForm";
import { config } from "../../utils/config";

export default function CreateProjectPage() {
    const navigate = useNavigate();
    const [memberRole, setMemberRole] = useState<"org:admin" | "org:client">(
        "org:admin",
    );
    const [email, setEmail] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchAuthMemberRole = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/auth/member-role`,
                    { withCredentials: true },
                );
                setMemberRole(
                    response.data?.data?.[0]?.role as
                        | "org:admin"
                        | "org:client",
                );
                setEmail(response.data?.data?.[0]?.publicUserData.identifier);
                console.log("Auth member role:", response.data?.data?.[0]?.publicUserData.identifier);
            } catch (err) {
                console.error("Auth member role request failed:", err);
            }
        };

        fetchAuthMemberRole();
    }, []);

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
                <ProjectForm
                    mode="create"
                    role={memberRole}
                    email={email}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
}
