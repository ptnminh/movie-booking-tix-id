import React from "react";
import { Outlet } from "react-router-dom";
function PrivateOutlet() {
    return <Outlet />;
}

export default PrivateOutlet;
