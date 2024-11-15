// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
 import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import {
  QueryClient,
  QueryClientProvider,
 
} from 'react-query'
 
import { AppContextProvider } from '../context/AppContext.tsx'
import { SearchContextProvider } from '../context/SearchContext.tsx'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:0
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
<AppContextProvider>
<SearchContextProvider>
    <App />
</SearchContextProvider>
</AppContextProvider>
</QueryClientProvider>
  </BrowserRouter>,
)
