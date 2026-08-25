import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import RedirectHandler from "./components/RedirectHandler.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/"             element={<HomePage/>}       />
                <Route path="/:shortCode"   element={<RedirectHandler/>}/>
            </Routes>
        </>
    )
}

export default App
