import React from "react";

interface TickerWithAllocation {
  readonly ticker: string;
  readonly allocation: string;
}

type AssetAllocation = TickerWithAllocation[];

const TargetAssetAllocation: React.FC = () => {
  const [assetAllocation, setAssetAllocation] = React.useState<AssetAllocation>(
    []
  );

  const onAllocationChangeForTicker = (tickerToUpdate: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAssetAllocation(
      assetAllocation.map(({ ticker, allocation }) => ({
        ticker,
        allocation: tickerToUpdate === ticker ? e.target.value : allocation,
      }))
    );
  };

  const onTickerChangeForCurrentTicker = (
    params: Readonly<{
      currentTicker: string;
      allocation: string;
    }>
  ) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAssetAllocation(
      assetAllocation.reduce<AssetAllocation>(
        (acc: AssetAllocation, tickerWithAllocation: TickerWithAllocation) =>
          params.currentTicker === tickerWithAllocation.ticker
            ? [
                ...acc,
                {
                  ticker: e.target.value,
                  allocation: tickerWithAllocation.allocation,
                },
              ]
            : acc,
        []
      )
    );
  };

  const addAssetAllocation = () => {
    setAssetAllocation([
      ...assetAllocation.filter(
        (tickerWithAllocation) => tickerWithAllocation.allocation !== ""
      ),
      {
        allocation: "",
        ticker: "",
      },
    ]);
  };

  return (
    <>
      <button onClick={addAssetAllocation}>+</button>
      {assetAllocation.map(({ ticker, allocation }) => {
        const onAllocationChange = onAllocationChangeForTicker(ticker);
        const onTickerChange = onTickerChangeForCurrentTicker({
          currentTicker: ticker,
          allocation,
        });

        return (
          <div>
            <label>Ticker:</label>
            <input value={ticker} onChange={onTickerChange} />
            <label>Allocation:</label>
            <input
              onChange={onAllocationChange}
              value={allocation}
              type="number"
            />
          </div>
        );
      })}
    </>
  );
};
export default TargetAssetAllocation;
