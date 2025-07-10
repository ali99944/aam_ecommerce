// src/app/providers.tsx (Example)
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "./notification-provider";

// Create React Query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


export function AppProviders({ children }: { children: React.ReactNode }) {

  return (
    
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </NotificationProvider>

  );
}
