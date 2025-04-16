// src/app/providers.tsx (Example)
"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

// Create React Query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false, // Optional: disable auto refetch
    },
  },
});


export function Providers({ children }: { children: React.ReactNode }) {
  // Optional: Dispatch fetchUser on initial load if token exists
  // useEffect(() => {
  //   const token = store.getState().auth.token; // Direct access for setup
  //   if (token && store.getState().auth.user === null) {
  //       store.dispatch(fetchUser());
  //   }
  // }, []);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              {children}
          </QueryClientProvider>
      </Provider>
    </PersistGate>
  );
}

// Then wrap your layout's children with <Providers> in layout.tsx
// app/layout.tsx
// import { Providers } from './providers';
// ...
// export default function RootLayout({ children }: ...) {
//   return (
//     <html lang="ar" dir="rtl">
//       <body>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }