import React, { FormEvent, FormEventHandler } from "react";
import Asset from "../../types/Asset.type";
import "./styles.css";

interface AssetFormProps {
  readonly onSubmit: (newAsset: Asset) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({ onSubmit }) => {
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
      onSubmit({
        ticker: tickerInputValue,
        balance: Number(balanceInputValue),
        targetAllocation: Number(targetAllocationInputValue),
      });

      setTargetAllocationInputValue("");
      setTickerInputValue("");
      setBalanceInputValue("");
    }
  };

  return (
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
  );
};

export default AssetForm;
