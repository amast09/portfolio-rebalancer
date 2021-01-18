import AssetAllocation from "../types/AssetAllocation.type";

const calculateRemainingAllocations = (
  assetAllocation: AssetAllocation
): number =>
  assetAllocation.reduce(
    (remainingTotal, a) => remainingTotal - a.targetAllocation,
    100
  );

export default calculateRemainingAllocations;
