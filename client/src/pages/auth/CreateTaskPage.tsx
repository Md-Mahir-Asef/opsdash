import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/forms/TaskForm";

export default function CreateTaskPage() {
    const navigate = useNavigate();

    const handleSuccess = (task: any) => {
        const id = task?.id;
        if (id) {
            navigate(`/dashboard/tasks/${id}`);
        } else {
            navigate(`/dashboard/tasks`);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-dark-900">
                    Create Task
                </h1>
                <p className="text-dark-600">
                    Create a new task for your organization.
                </p>
            </div>
            <div className="bg-dark-100 border border-dark-300 rounded-lg p-6">
                <TaskForm mode="create" onSuccess={handleSuccess} />
            </div>
        </div>
    );
}