import { Routes, Route } from "react-router-dom";
import Health from "./pages/Health";

function App() {
    return (
        <Routes>
            <Route path="/health" element={<Health />} />
        </Routes>
    );
}

export default App;
