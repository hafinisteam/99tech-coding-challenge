import clsx from 'clsx'

import NiceModal from '@ebay/nice-modal-react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import ButtonTransfer from './components/composite/ButtonTransfer'
import Exchanger from './components/composite/Exchanger'
import Switcher from './components/composite/Switcher'
import { getTokenList } from './services/token'
import { QueryKey } from './type/query'
import Spinner from './components/base/Spinner'

function App() {
  const { isLoading } = useQuery({
    queryKey: [QueryKey.TokenList],
    queryFn: getTokenList,
  })

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className={clsx(
          'flex flex-col space-y-4 items-center',
          'p-6 bg-white border-dimed',
          'border rounded-lg max-sm:w-full w-[450px]'
        )}
      >
        <Exchanger />
        <Switcher />
        <Exchanger disabledInput />
        <ButtonTransfer />
      </div>
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </QueryClientProvider>
  )
}

export default Main
