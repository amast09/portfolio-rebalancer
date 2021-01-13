import React, { FormEvent, FormEventHandler } from "react";

interface Asset {
  readonly ticker: string;
  readonly balance: string;
  readonly targetAllocation: string;
}

type AssetAllocation = Asset[];

const TargetAssetAllocation: React.FC = () => {
  const [assetAllocation, setAssetAllocation] = React.useState<AssetAllocation>(
    []
  );
  const [tickerInputValue, setTickerInputValue] = React.useState<string>("");
  const [
    targetAllocationInputValue,
    setTargetAllocationInputValue,
  ] = React.useState<string>("");
  const [balanceInputValue, setBalanceInputValue] = React.useState<string>("");

  const onTargetAllocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTargetAllocationInputValue(e.target.value);
  };

  const onTickerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTickerInputValue(e.target.value);
  };

  const onBalanceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBalanceInputValue(e.target.value);
  };

  const onTickerAdd: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();

    if (tickerInputValue && balanceInputValue && targetAllocationInputValue) {
      setAssetAllocation([
        ...assetAllocation,
        {
          ticker: tickerInputValue,
          balance: balanceInputValue,
          targetAllocation: targetAllocationInputValue,
        },
      ]);

      setTargetAllocationInputValue("");
      setTickerInputValue("");
      setBalanceInputValue("");
    }
  };

  const onRemoveAsset = (ticker: string) => () => {
    setAssetAllocation(assetAllocation.filter((a) => a.ticker !== ticker));
  };

  return (
    <>
      <form onSubmit={onTickerAdd}>
        <label htmlFor="ticker">Ticker:</label>
        <input
          id="ticker"
          name="ticker"
          value={tickerInputValue}
          onChange={onTickerChange}
        />
        <label htmlFor="allocation">Allocation:</label>
        <input
          id="allocation"
          name="allocation"
          onChange={onTargetAllocationChange}
          value={targetAllocationInputValue}
          type="number"
        />
        <label htmlFor="balance">Current Balance:</label>
        <input
          id="balance"
          name="balance"
          onChange={onBalanceChange}
          value={balanceInputValue}
          type="number"
        />
        <button onClick={onTickerAdd}>Add Ticker</button>
      </form>
      <hr />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)" }}>
        <div>Ticker</div>
        <div>Balance</div>
        <div>Allocation</div>
        <div />
        {assetAllocation.map(({ ticker, balance, targetAllocation }) => (
          <>
            <div>{ticker}</div>
            <div>{balance}</div>
            <div>{targetAllocation}</div>
            <button type="button" onClick={onRemoveAsset(ticker)}>
              Remove
            </button>
          </>
        ))}
      </div>
    </>
  );
};

export default TargetAssetAllocation;
