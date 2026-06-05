import React, { useState } from "react";
import axios from "axios";
import { Button } from "../common/Button";
import { createProjectSchema } from "../../utils/validation";
import type { CreateProjectInput } from "../../utils/validation";
import { z } from "zod";
import { config } from "../../utils/config";

interface Props {
    mode?: "create" | "edit";
    initialData?: Partial<CreateProjectInput> & { id?: number };
    projectId?: number;
    onSuccess?: (project: any) => void;
}

export const ProjectForm: React.FC<Props> = ({
    mode = "create",
    initialData = {},
    projectId,
    onSuccess,
}) => {
    const [title, setTitle] = useState(initialData.title ?? "");
    const [description, setDescription] = useState(
        initialData.description ?? "",
    );
    const [status, setStatus] = useState(
        (initialData.status as string) ?? "Unconfirmed",
    );
    const [clientEmail, setClientEmail] = useState(
        initialData.client_email ?? "",
    );
    const [startDate, setStartDate] = useState<string | undefined>(
        initialData.start_date
            ? new Date(initialData.start_date).toISOString().slice(0, 10)
            : undefined,
    );
    const [dueDate, setDueDate] = useState<string | undefined>(
        initialData.due_date
            ? new Date(initialData.due_date).toISOString().slice(0, 10)
            : undefined,
    );
    const [endDate, setEndDate] = useState<string | undefined>(
        initialData.end_date
            ? new Date(initialData.end_date).toISOString().slice(0, 10)
            : undefined,
    );
    const [budget, setBudget] = useState<number | "">(
        typeof initialData.budget === "number" ? initialData.budget : "",
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const payload = {
            title,
            description,
            status,
            client_email: clientEmail,
            start_date: startDate,
            due_date: dueDate,
            end_date: endDate,
            budget: typeof budget === "number" ? budget : Number(budget),
        } as unknown as CreateProjectInput;

        try {
            const parsed = createProjectSchema.parse(payload);
            setLoading(true);
            const url = `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/project`;
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
                        Client Email
                    </label>
                    <input
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                        type="email"
                    />
                </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm text-dark-600 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate ?? ""}
                        onChange={(e) => setStartDate(e.target.value)}
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
                <div>
                    <label className="block text-sm text-dark-600 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate ?? ""}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-100 border border-dark-300 rounded-lg focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-dark-600 mb-1">
                    Budget
                </label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) =>
                        setBudget(
                            e.target.value === "" ? "" : Number(e.target.value),
                        )
                    }
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
                          ? "Create Project"
                          : "Update Project"}
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
