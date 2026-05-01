import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    return (
<<<<<<< HEAD
        <div className="h-screen bg-dark-50 flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-auto">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
=======
        <div className="flex h-screen bg-dark-50">
            <Sidebar />
            <main className="flex-1 overflow-auto flex flex-col">
                <Header />
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
>>>>>>> f098a74 (Feat(Dashboard): Make a Dummy Dashboard.)
        </div>
    );
}
