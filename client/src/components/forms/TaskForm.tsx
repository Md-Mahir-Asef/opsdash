import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../common/Button";
import { createTaskSchema } from "../../utils/validation";
import type { CreateTaskInput } from "../../utils/validation";
import { z } from "zod";
import { config } from "../../utils/config";

interface Props {
    mode?: "create" | "edit";
    initialData?: Partial<CreateTaskInput> & {
        id?: number;
        assigned_staff_email?: string;
        project?: { id: number; title: string };
    };
    projectId?: number;
    onSuccess?: (task: any) => void;
}

export const TaskForm: React.FC<Props> = ({
    mode = "create",
    initialData = {},
    projectId,
    onSuccess,
}) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | "">(
        initialData.project_id ?? "",
    );
    const [title, setTitle] = useState(initialData.title ?? "");
    const [description, setDescription] = useState(
        initialData.description ?? "",
    );
    const [status, setStatus] = useState(
        (initialData.status as string) ?? "Unconfirmed",
    );
    const [assignedStaffEmail, setAssignedStaffEmail] = useState(
        initialData.assigned_staff_email ?? "",
    );
    const [priority, setPriority] = useState(
        (initialData.priority as string) ?? "NotSet",
    );
    const [dueDate, setDueDate] = useState<string | undefined>(
        initialData.due_date
            ? new Date(initialData.due_date).toISOString().slice(0, 10)
            : undefined,
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<
        { id: number; title: string }[]
    >([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project/all`,
                    { withCredentials: true },
                );
                console.log("Projects loaded:", response.data);
                const responseData = response.data?.data?.data;
                const loadedProjects = responseData?.projects || [];
                const merged = [...loadedProjects];
                if (
                    initialData.project?.id &&
                    !merged.some(
                        (p: { id: number }) =>
                            p.id === initialData.project!.id,
                    )
                ) {
                    merged.push({
                        id: initialData.project!.id,
                        title: initialData.project!.title,
                    });
                }
                setProjects(
                    merged.map(
                        (p: { id: number; title: string }) => ({
                            id: p.id,
                            title: p.title,
                        }),
                    ),
                );
            } catch (error) {
                console.error("Error loading projects:", error);
            }
        };

        loadProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const payload = {
            project_id:
                selectedProjectId === ""
                    ? undefined
                    : Number(selectedProjectId),
            title,
            description,
            status,
            assigned_staff_email: assignedStaffEmail,
            priority,
            due_date: dueDate,
        } as unknown as CreateTaskInput;

        try {
            const parsed = createTaskSchema.parse(payload);
            setLoading(true);
            const url = `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/task`;
            let response;
            if (mode === "create") {
                response = await axios.post(
                    url,
                    { data: parsed },
                    { withCredentials: true },
                );
            } else {
                response = await axios.put(
                    `${url}/${projectId}`,
                    { data: parsed },
                    { withCredentials: true },
                );
            }

            const created = response?.data?.data?.data ?? response?.data?.data;
            onSuccess?.(created);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues.map((i) => i.message).join(", "));
            } else if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm text-dark-600 mb-1">
                    Project
                </label>
                {projects.length === 0 && (
                    <div className="text-sm text-yellow-600 bg-yellow-50 border border-yellow-100 p-3 rounded mb-2">
                        No projects found. Please create a project first.
                    </div>
                )}
                <select
                    value={selectedProjectId}
                    onChange={(e) =>
                        setSelectedProjectId(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value),
                        )
                    }
                    className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm text-dark-600 mb-1">
                    Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm text-dark-600 mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                    rows={4}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-dark-600 mb-1">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                    >
                        <option value="Unconfirmed">Unconfirmed</option>
                        <option value="Todo">Todo</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-dark-600 mb-1">
                        Priority
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="NotSet">Not Set</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm text-dark-600 mb-1">
                    Assigned Staff Email
                </label>
                <input
                    type="email"
                    value={assignedStaffEmail}
                    onChange={(e) => setAssignedStaffEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm text-dark-600 mb-1">
                    Due Date
                </label>
                <input
                    type="date"
                    value={dueDate ?? ""}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                />
            </div>

            <div className="flex items-center justify-end">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="px-6"
                >
                    {loading
                        ? "Saving..."
                        : mode === "create"
                          ? "Create Task"
                          : "Update Task"}
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;