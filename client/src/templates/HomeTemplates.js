import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomeTemplates({ children }) {
    return (
        <div className="overflow-hidden">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default HomeTemplates;
