import React from "react";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen">
            {children}
        </div>
    )
}