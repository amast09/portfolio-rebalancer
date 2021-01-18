import React from "react";
import "./App.css";
import "bulma/css/bulma.css";
import Asset from "./types/Asset.type";
import AssetForm from "./components/AssetForm";
import AssetAllocation from "./types/AssetAllocation.type";
import AssetAllocationTable from "./components/AssetAllocationTable";
import AssetAllocationSummary from "./components/AssetAllocationSummary";

const App: React.FC = () => {
  const [assetAllocation, setAssetAllocation] = React.useState<AssetAllocation>(
    []
  );

  const onNewAssetAdd = (newAsset: Asset) => {
    setAssetAllocation([...assetAllocation, newAsset]);
  };

  const onRemoveAsset = (ticker: string) => {
    setAssetAllocation(assetAllocation.filter((a) => a.ticker !== ticker));
  };

  const userHasAddedAssets = assetAllocation.length > 0;

  return (
    <div className="app container">
      <header>
        <h1 className="title">Portfolio Re-balancer!</h1>
      </header>
      <p className="py-2">
        This tool is intended to determine the buys/sells required to re-balance
        a portfolio to a targeted asset allocation. You can learn more about
        what an asset allocation is{" "}
        <a
          href="https://www.bogleheads.org/wiki/Asset_allocation"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <hr />
      <AssetForm onSubmit={onNewAssetAdd} />
      {userHasAddedAssets && (
        <>
          <hr />
          <AssetAllocationTable
            onAssetRemove={onRemoveAsset}
            assetAllocation={assetAllocation}
          />
        </>
      )}
      <hr />
      <AssetAllocationSummary assetAllocation={assetAllocation} />
      <a
        className="source-code-link"
        href="https://github.com/amast09/portfolio-rebalancer"
        target="_blank"
        rel="noreferrer"
      >
        Source Code
      </a>
    </div>
  );
};

export default App;
