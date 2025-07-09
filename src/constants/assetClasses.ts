// Define interface for asset class options
export interface AssetClassOption {
  value: string;
  label: string;
}

// Define asset class options array with both display labels and filter values
export const assetClassOptions: AssetClassOption[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "equities",
    label: "Equities",
  },
  {
    value: "bonds",
    label: "Bonds",
  },
  {
    value: "crypto",
    label: "Crypto",
  },
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "real-estate",
    label: "Real Estate",
  },
  {
    value: "commodities",
    label: "Commodities",
  },
];

// Helper function to get asset class label by value
export const getAssetClassLabel = (value: string): string => {
  const option = assetClassOptions.find((option) => option.value === value);
  return option?.label || value;
};

// Export asset class values for direct usage
export const assetClassValues = assetClassOptions.map((option) => option.value);

export default assetClassOptions;
