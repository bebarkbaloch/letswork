import React from 'react';
import {
    Route,
    Routes,
} from "react-router-dom";
import Dashboard from "../view/dashboard/Dashboard";

function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
}

export default Navigation;