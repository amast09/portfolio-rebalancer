import AssetAllocation from "../../types/AssetAllocation.type";
import React from "react";
import calculateTotalAssets from "../../selectors/calculateTotalAssets";
import calculateRemainingAllocations from "../../selectors/calculateRemainingAllocations";
import "./styles.css";

interface AssetAllocationSummaryProps {
  readonly assetAllocation: AssetAllocation;
}

const getRemainingAllocationClasses = (remainingAllocation: number): string => {
  if (remainingAllocation < 0) {
    return "has-text-danger";
  } else if (remainingAllocation === 0) {
    return "has-text-success";
  } else {
    return "has-text-dark";
  }
};

const AssetAllocationSummary: React.FC<AssetAllocationSummaryProps> = ({
  assetAllocation,
}) => {
  const totalAssets = calculateTotalAssets(assetAllocation);
  const remainingAllocation = calculateRemainingAllocations(assetAllocation);

  return (
    <div className="asset-allocation-summary">
      <div className="asset-allocation-summary__element">
        <p className="has-text-weight-bold">Remaining in Target Allocation: </p>
        <span className={getRemainingAllocationClasses(remainingAllocation)}>
          {remainingAllocation}
        </span>
      </div>
      <div className="asset-allocation-summary__element">
        <p className="has-text-weight-bold">Total Assets: </p>
        <span>${totalAssets}</span>
      </div>
    </div>
  );
};
export default AssetAllocationSummary;
