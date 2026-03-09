import { Routes, Route } from "react-router-dom";
import Health from "./pages/Health";
import { Landing } from "./pages/Landing";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/health" element={<Health />} />
        </Routes>
    );
}

export default App;
