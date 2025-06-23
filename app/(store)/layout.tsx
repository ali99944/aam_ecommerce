import React from "react";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-50">
            {children}
        </div>
    )
}