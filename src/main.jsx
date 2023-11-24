import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import routes from './routes'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ThemeProvider>
     <RouterProvider router={routes} />
     <Toaster/>
    </ThemeProvider>
    </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
