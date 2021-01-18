import AssetAllocation from "../types/AssetAllocation.type";
import calculateTotalAssets from "./calculateTotalAssets";

describe("calculateTotalAssets", () => {
  it("returns 0 for an empty asset allocation", () => {
    const assetAllocation: AssetAllocation = [];
    const expectedTotalAssets: number = 0;

    const actualRemainingAssets = calculateTotalAssets(assetAllocation);

    expect(actualRemainingAssets).toEqual(expectedTotalAssets);
  });

  it("returns the sum of all the asset's balances", () => {
    const assetAllocation: AssetAllocation = [
      {
        ticker: "foo",
        targetAllocation: 30,
        balance: 225,
      },
      {
        ticker: "bar",
        targetAllocation: 60,
        balance: 95,
      },
    ];
    const expectedTotalAssets: number = 320;

    const actualRemainingAssets = calculateTotalAssets(assetAllocation);

    expect(actualRemainingAssets).toEqual(expectedTotalAssets);
  });
});
