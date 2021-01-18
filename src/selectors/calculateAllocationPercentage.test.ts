import calculateAssetAllocationPercentage from "./calculateAssetAllocationPercentage";
import Asset from "../types/Asset.type";

const TICKER: string = "GOOGL";
const TARGET_ALLOCATION: number = 23;

describe("calculateAssetAllocationPercentage", () => {
  it.each`
    balance | totalAssetsInPortfolio | expectedPercentage
    ${40}   | ${100}                 | ${40}
    ${50}   | ${100}                 | ${50}
    ${60}   | ${100}                 | ${60}
  `(
    "balance=$balance + totalAssetsInPortfolio=$totalAssetsInPortfolio should return a percentage of $expectedPercentage",
    ({ balance, totalAssetsInPortfolio, expectedPercentage }) => {
      const asset: Asset = {
        balance,
        targetAllocation: TARGET_ALLOCATION,
        ticker: TICKER,
      };
      expect(
        calculateAssetAllocationPercentage(asset, totalAssetsInPortfolio)
      ).toEqual(expectedPercentage);
    }
  );
});
