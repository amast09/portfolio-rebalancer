import calculateAllocationAdjustment from "./calculateAllocationAdjustment";
import Asset from "../types/Asset.type";

const TICKER: string = "GOOGL";

describe("calculateAllocationAdjustment", () => {
  it.each`
    balance | targetAllocation | totalAssetsInPortfolio | expectedAdjustment
    ${40}   | ${50}            | ${100}                 | ${10}
    ${50}   | ${50}            | ${100}                 | ${0}
    ${60}   | ${50}            | ${100}                 | ${-10}
  `(
    "balance=$balance + targetAllocation=$targetAllocation + totalAssetsInPortfolio=$totalAssetsInPortfolio should return an adjustment of $expectedAdjustment",
    ({
      balance,
      targetAllocation,
      totalAssetsInPortfolio,
      expectedAdjustment,
    }) => {
      const asset: Asset = {
        balance,
        targetAllocation,
        ticker: TICKER,
      };
      expect(
        calculateAllocationAdjustment(asset, totalAssetsInPortfolio)
      ).toEqual(expectedAdjustment);
    }
  );
});
