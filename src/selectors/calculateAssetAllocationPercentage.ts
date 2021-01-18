import Asset from "../types/Asset.type";

const calculateAssetAllocationPercentage = (
  asset: Asset,
  totalAssetsInPortfolio: number
) => (asset.balance / totalAssetsInPortfolio) * 100;

export default calculateAssetAllocationPercentage;
