import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "sonner";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster richColors position="top-right" />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
