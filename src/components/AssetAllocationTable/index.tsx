import React from "react";
import AssetAllocation from "../../types/AssetAllocation.type";
import calculateTotalAssets from "../../selectors/calculateTotalAssets";
import calculateAssetAllocationPercentage from "../../selectors/calculateAssetAllocationPercentage";
import calculateAllocationAdjustment from "../../selectors/calculateAllocationAdjustment";
import "./styles.css";

interface AssetAllocationTableProps {
  readonly onAssetRemove: (assetTicker: string) => void;
  readonly assetAllocation: AssetAllocation;
}

const AssetAllocationTable: React.FC<AssetAllocationTableProps> = ({
  onAssetRemove,
  assetAllocation,
}) => {
  const totalAssets = calculateTotalAssets(assetAllocation);

  return (
    <div className="assets-table">
      <h4 className="is-size-5 has-text-weight-bold">Ticker</h4>
      <h4 className="is-size-5 has-text-weight-bold">Balance</h4>
      <h4 className="is-size-5 has-text-weight-bold">Target Allocation</h4>
      <h4 className="is-size-5 has-text-weight-bold">Current Allocation</h4>
      <h4 className="is-size-5 has-text-weight-bold">Adjustment</h4>
      <div />
      {assetAllocation.map((asset) => {
        const { ticker, balance, targetAllocation } = asset;
        const assetAllocationPercentage = Number(
          calculateAssetAllocationPercentage(asset, totalAssets)
        ).toFixed(2);
        const adjustment = calculateAllocationAdjustment(asset, totalAssets);
        const adjustmentToDisplay = Number(Math.abs(adjustment)).toFixed(2);

        return (
          <>
            <div className="is-size-5 assets-table__asset-value">{ticker}</div>
            <div className="is-size-5 assets-table__asset-value">{balance}</div>
            <div className="is-size-5 assets-table__asset-value">
              {targetAllocation}%
            </div>
            <div className="is-size-5 assets-table__asset-value">
              {assetAllocationPercentage}%
            </div>
            <div
              className={`is-size-5 assets-table__asset-value ${
                adjustment < 0 ? "has-text-danger" : "has-text-success"
              }`}
            >
              {adjustment < 0 ? "-" : "+"}${adjustmentToDisplay}
            </div>
            <button
              type="button"
              className="button"
              onClick={() => onAssetRemove(ticker)}
            >
              Remove
            </button>
          </>
        );
      })}
    </div>
  );
};

export default AssetAllocationTable;
