import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import store from  '@/contexts/store'

import { ConfigProvider } from "@/contexts/config.tsx";
import App from '@/App'
import "./styles/app.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Provider store={store}>
          <ConfigProvider>
            <App />
          </ConfigProvider>
        </Provider>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>
);
