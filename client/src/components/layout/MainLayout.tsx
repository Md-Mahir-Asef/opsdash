import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-dark-50">
            <Sidebar />
            <main className="flex-1 overflow-auto flex flex-col">
                <Header />
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
