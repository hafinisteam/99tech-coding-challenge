```js
// WalletBalance and FormattedWalletBalance have duplicated properties, leading to type redundancy
// FormattedWalletBalance should extend from WalletBalance
// Recommend to put formatted property to WalletBalance
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// React.FC does not provide children props
// Should add children: React.ReactNode to Props
interface Props extends BoxProps {}

// Unnecessary declaration at component params since it has been in React.FC<Props>
// From React 18, don't need to use React.FC anymore
const WalletPage: React.FC<Props> = (props: Props) => {
// Can use destructing assignment in above parameters
// Avoid using rest and spread since rest can contain many property
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

// Avoid any, in case of comparision blockchain should be extract to a type BlockchainType 
// Can also declare enum BlockchainPriority for numbers
// Must wrap in useCallback since this is called in usedMemo
// Can remove return type since always return number
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
// Assuming that balances: WalletBallance[]
// Can remove WalletBalance infer type
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
// Redudant nested condition, replace number with enum
// No need to return boolean, just directly return condition result of lhsPriority > -99 && balance.amount <= 0
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		})
// Can remove type infer since TS will auto infer type      
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
// Redundant Checks, less concise and harder to read
// Can just return result from rightPriority - leftPriority
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

// Can remove type declaration
// Recommend to wrap in useMemo since this loop will run on every render, impacting performance
// If putting formatted into WalletBalance then we can data for it in sortedBalances creation by another map
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

// Should render in UI, if want to use it as variable
// This should be wrapped in useMemo to avoid looping over in every render
// Wrong type infer, should be WalletBalance
// Can also remove type for index
// Should this be formattedBalances ?
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
// Is this valid prop ?
        className={classes.row}
// Using index is not recommended for key, can impact performance
// Recommend to use something unique like ID, if ID is not available, can use balance.currency
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    // Redundant spread, should state exactly which props should be for the div
    // classNames for example
    <div {...rest}>
      {rows}
    </div>
  )
}
```
