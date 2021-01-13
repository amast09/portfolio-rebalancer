import React, { FormEvent, FormEventHandler } from "react";
import "./App.css";
import "bulma/css/bulma.css";

interface Asset {
  readonly ticker: string;
  readonly balance: number;
  readonly targetAllocation: number;
}

type AssetAllocation = Asset[];

const App: React.FC = () => {
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
          balance: Number(balanceInputValue),
          targetAllocation: Number(targetAllocationInputValue),
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

  const userHasAddedAssets = assetAllocation.length > 0;
  const remainingAllocation = assetAllocation.reduce(
    (remainingTotal, a) => remainingTotal - a.targetAllocation,
    100
  );
  const totalAssets = assetAllocation.reduce(
    (total, a) => total + a.balance,
    0
  );

  return (
    <div className="app container">
      <header>
        <h1 className="title">Portfolio Re-balancer!</h1>
      </header>
      <p className="py-2">
        This tool is intended to determine the buys/sells required to re-balance
        a portfolio to a targeted asset allocation. You can learn more about
        what an asset allocation is{" "}
        <a
          href="https://www.bogleheads.org/wiki/Asset_allocation"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <hr />
      <form className="asset-form" onSubmit={onTickerAdd}>
        <div className="field">
          <label className="label" htmlFor="ticker">
            Ticker
          </label>
          <div className="control">
            <input
              id="ticker"
              name="ticker"
              className="input"
              placeholder="GOOGL"
              value={tickerInputValue}
              onChange={onTickerChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="balance">
            Current Balance in Portfolio
          </label>
          <div className="control has-icons-left">
            <input
              id="balance"
              name="balance"
              className="input"
              placeholder="3240"
              type="number"
              value={balanceInputValue}
              onChange={onBalanceChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-dollar-sign" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="allocation">
            Target Allocation for Asset
          </label>
          <div className="control has-icons-right">
            <input
              id="allocation"
              name="allocation"
              className="input"
              placeholder="90"
              type="number"
              value={targetAllocationInputValue}
              onChange={onTargetAllocationChange}
            />
            <span className="icon is-small is-right">
              <i className="fas fa-percentage" />
            </span>
          </div>
        </div>
        <button className="button" onClick={onTickerAdd}>
          Add Ticker
        </button>
      </form>
      {userHasAddedAssets && (
        <>
          <hr />
          <div className="assets-table">
            <h4 className="is-size-5 has-text-weight-bold">Ticker</h4>
            <h4 className="is-size-5 has-text-weight-bold">Balance</h4>
            <h4 className="is-size-5 has-text-weight-bold">
              Target Allocation
            </h4>
            <h4 className="is-size-5 has-text-weight-bold">
              Current Allocation
            </h4>
            <h4 className="is-size-5 has-text-weight-bold">Adjustment</h4>
            <div />
            {assetAllocation.map(({ ticker, balance, targetAllocation }) => {
              const currentAllocation = (balance / totalAssets) * 100;
              const adjustment =
                ((targetAllocation - currentAllocation) / 100) * totalAssets;

              return (
                <>
                  <div className="is-size-5 asset-value">{ticker}</div>
                  <div className="is-size-5 asset-value">{balance}</div>
                  <div className="is-size-5 asset-value">
                    {targetAllocation}%
                  </div>
                  <div className="is-size-5 asset-value">
                    {currentAllocation}%
                  </div>
                  <div
                    className={`is-size-5 asset-value ${
                      adjustment < 0 ? "has-text-danger" : "has-text-success"
                    }`}
                  >
                    {adjustment < 0 ? "-" : "+"}${Math.abs(adjustment)}
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={onRemoveAsset(ticker)}
                  >
                    Remove
                  </button>
                </>
              );
            })}
          </div>
        </>
      )}
      <hr />
      <div className="summary">
        <div className="summary__element">
          <p className="has-text-weight-bold">
            Remaining in Target Allocation:{" "}
          </p>
          <span
            className={
              remainingAllocation < 0
                ? "has-text-danger"
                : remainingAllocation === 0
                ? "has-text-success"
                : "has-text-dark"
            }
          >
            {remainingAllocation}
          </span>
        </div>
        <div className="summary__element">
          <p className="has-text-weight-bold">Total Assets: </p>
          <span>${totalAssets}</span>
        </div>
      </div>
      <a
        className="source-code-link"
        href="https://github.com/amast09/portfolio-rebalancer"
        target="_blank"
        rel="noreferrer"
      >
        Source Code
      </a>
    </div>
  );
};

export default App;
