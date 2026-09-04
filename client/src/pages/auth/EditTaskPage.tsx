import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskForm from "../../components/forms/TaskForm";
import { config } from "../../utils/config";

export default function EditTaskPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/task/${id}`,
                    { withCredentials: true },
                );
                const data = res?.data?.data?.data ?? res?.data?.data;
                setTask(data);
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
        navigate(`/dashboard/tasks/${newId}`);
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!task) {
        return <div className="p-8">Task not found.</div>;
    }

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-dark-900">
                    Edit Task
                </h1>
            </div>
            <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                <TaskForm
                    mode="edit"
                    initialData={task}
                    projectId={Number(id)}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
}