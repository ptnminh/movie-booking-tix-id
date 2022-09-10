import React from "react";
import AdminHeader from "../pages/admin/Users/AdminHeader";
function AdminHomeTemplate({ children }) {
    return (
        <div>
            <AdminHeader />
            {children}
            {/* <ModalTemplate /> */}
        </div>
    );
}

export default AdminHomeTemplate;
