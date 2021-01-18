import AssetAllocation from "../types/AssetAllocation.type";

const calculateTotalAssets = (assetAllocation: AssetAllocation): number =>
  assetAllocation.reduce((total, a) => total + a.balance, 0);

export default calculateTotalAssets;
