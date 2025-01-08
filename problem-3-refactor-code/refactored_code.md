```js
interface WalletBalance {
  currency: string;
  amount: number;
  formatted?: string;
}

interface Props extends BoxProps {
  children: React.ReactNode
}

type BlockchainType = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

enum BlockchainPriority {
 Osmosis = 100,
 Ethereum = 50,
 Arbitrum = 30,
 ZilliqaNeo = 20,
 Default = -99
}

// Might remove children since it does not use anywhere in the code
// Just keep it for the sake of explanation
const WalletPage = ({ children }: Props) => {
  const prices = usePrices();
  const balances = useWalletBalances();

  const getPriority = useCallback((blockchain: BlockchainType) => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return BlockchainPriority.Osmosis
	    case 'Ethereum':
	      return BlockchainPriority.Ethereum
	    case 'Arbitrum':
	      return BlockchainPriority.Arbitrum
	    case 'Zilliqa':
	    case 'Neo':
	      return BlockchainPriority.ZilliqaNeo
	    default:
	      return BlockchainPriority.Default
	  }
	}, [])

  const sortedBalances = useMemo(() => 
     balances.filter((balance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  return lhsPriority > -99 && balance.amount <= 0
		}).sort((lhs, rhs) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  return rightPriority - leftPriority
    }).map((balance) => ({ ...balance, formatted: balance.amount.toFixed() }));
  , [balances, prices]);

  return (
    <div>
      {
        sortedBalances.map((balance) => (
          <WalletRow 
            key={balance.currency}
            amount={balance.amount}
            usdValue={prices[balance.currency] * balance.amount}
            formattedAmount={balance.formatted}
          />
        ))
      }
    </div>
  )
}
```
