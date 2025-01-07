import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import TokenSwapContext from './context/TokenSwapContext.tsx'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <TokenSwapContext.Provider>
          <App />
          <Toaster />
        </TokenSwapContext.Provider>
      </NiceModal.Provider>
    </QueryClientProvider>
  </StrictMode>
)
