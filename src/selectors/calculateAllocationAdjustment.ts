import Asset from "../types/Asset.type";
import calculateAssetAllocationPercentage from "./calculateAssetAllocationPercentage";

const calculateAllocationAdjustment = (
  asset: Asset,
  totalAssetsInPortfolio: number
) => {
  const currentAllocation = calculateAssetAllocationPercentage(
    asset,
    totalAssetsInPortfolio
  );

  return (
    ((asset.targetAllocation - currentAllocation) / 100) *
    totalAssetsInPortfolio
  );
};

export default calculateAllocationAdjustment;
