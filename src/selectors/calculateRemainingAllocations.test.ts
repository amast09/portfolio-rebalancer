import AssetAllocation from "../types/AssetAllocation.type";
import calculateRemainingAllocations from "./calculateRemainingAllocations";

describe("calculateRemainingAllocations", () => {
  it("returns 100 for an empty asset allocation", () => {
    const assetAllocation: AssetAllocation = [];
    const expectedRemainingAssets: number = 100;

    const actualRemainingAssets = calculateRemainingAllocations(
      assetAllocation
    );

    expect(actualRemainingAssets).toEqual(expectedRemainingAssets);
  });

  it("returns a positive number when the assets total allocations add up to less than 100", () => {
    const assetAllocation: AssetAllocation = [
      {
        ticker: "foo",
        targetAllocation: 30,
        balance: 95,
      },
      {
        ticker: "bar",
        targetAllocation: 60,
        balance: 95,
      },
    ];
    const expectedRemainingAssets: number = 10;

    const actualRemainingAssets = calculateRemainingAllocations(
      assetAllocation
    );

    expect(actualRemainingAssets).toEqual(expectedRemainingAssets);
  });

  it("returns 0 when the assets total allocations add up to 100", () => {
    const assetAllocation: AssetAllocation = [
      {
        ticker: "foo",
        targetAllocation: 30,
        balance: 95,
      },
      {
        ticker: "bar",
        targetAllocation: 70,
        balance: 95,
      },
    ];
    const expectedRemainingAssets: number = 0;

    const actualRemainingAssets = calculateRemainingAllocations(
      assetAllocation
    );

    expect(actualRemainingAssets).toEqual(expectedRemainingAssets);
  });

  it("returns a negative number when the assets total allocations add up to less than 100", () => {
    const assetAllocation: AssetAllocation = [
      {
        ticker: "foo",
        targetAllocation: 90,
        balance: 95,
      },
      {
        ticker: "bar",
        targetAllocation: 60,
        balance: 95,
      },
    ];
    const expectedRemainingAssets: number = -50;

    const actualRemainingAssets = calculateRemainingAllocations(
      assetAllocation
    );

    expect(actualRemainingAssets).toEqual(expectedRemainingAssets);
  });
});
