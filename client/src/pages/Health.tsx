import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/config";
import {
    Activity,
    HardDrive,
    Clock,
    Server,
    CheckCircle,
    AlertCircle,
    Loader2,
} from "lucide-react";

interface HealthData {
    status: string;
    timestamp: string;
    uptime: number;
    version: string;
    environment: string;
    memory: {
        used: string;
        total: string;
        external: string;
        rss: string;
    };
}

export default function Health() {
    const [healthData, setHealthData] = useState<HealthData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                console.log("before");
                const response = await axios.get(
                    `${config.VITE_SERVER_DEVELOPMENT_BASE_URL}/health`,
                );
                console.log("after");
                setHealthData(response.data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch health data",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHealthData();
    }, []);

    const formatUptime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    const getMemoryPercentage = (used: string, total: string) => {
        const usedNum = parseFloat(used);
        const totalNum = parseFloat(total);
        return totalNum > 0 ? ((usedNum / totalNum) * 100).toFixed(1) : "0";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading health data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">
                        Health Check Failed
                    </h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-blue-500" />
                        System Health
                    </h1>
                    <p className="text-gray-400">
                        Real-time monitoring of server performance and status
                    </p>
                </div>

                {healthData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Status
                                </h3>
                                <CheckCircle
                                    className={`w-6 h-6 ${healthData.status === "healthy" ? "text-green-500" : "text-red-500"}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Health
                                    </span>
                                    <span
                                        className={`font-medium ${healthData.status === "healthy" ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {healthData.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Environment
                                    </span>
                                    <span className="text-blue-400 font-medium">
                                        {healthData.environment}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Version
                                    </span>
                                    <span className="text-gray-300">
                                        {healthData.version}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Uptime
                                </h3>
                                <Clock className="w-6 h-6 text-purple-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="text-2xl font-bold text-purple-400">
                                    {formatUptime(healthData.uptime)}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {healthData.uptime.toLocaleString()} seconds
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Memory Usage
                                </h3>
                                <HardDrive className="w-6 h-6 text-orange-500" />
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">
                                            Heap Used
                                        </span>
                                        <span className="text-gray-300">
                                            {healthData.memory.used} MB
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${getMemoryPercentage(healthData.memory.used, healthData.memory.total)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Heap Total
                                    </span>
                                    <span className="text-gray-300">
                                        {healthData.memory.total} MB
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">RSS</span>
                                    <span className="text-gray-300">
                                        {healthData.memory.rss} MB
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        External
                                    </span>
                                    <span className="text-gray-300">
                                        {healthData.memory.external} MB
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 md:col-span-2 lg:col-span-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    System Information
                                </h3>
                                <Server className="w-6 h-6 text-cyan-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-gray-700/50 rounded p-3">
                                    <div className="text-sm text-gray-400 mb-1">
                                        Last Updated
                                    </div>
                                    <div className="text-white font-medium">
                                        {new Date(
                                            healthData.timestamp,
                                        ).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded p-3">
                                    <div className="text-sm text-gray-400 mb-1">
                                        Memory Usage
                                    </div>
                                    <div className="text-white font-medium">
                                        {getMemoryPercentage(
                                            healthData.memory.used,
                                            healthData.memory.total,
                                        )}
                                        %
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded p-3">
                                    <div className="text-sm text-gray-400 mb-1">
                                        Process ID
                                    </div>
                                    <div className="text-white font-medium">
                                        Browser Client
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded p-3">
                                    <div className="text-sm text-gray-400 mb-1">
                                        Platform
                                    </div>
                                    <div className="text-white font-medium">
                                        {navigator.platform || "Web"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
