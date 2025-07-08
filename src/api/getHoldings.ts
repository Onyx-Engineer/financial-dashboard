export const getHoldings = async () => {
  const response = await fetch("/api/holdings");
  return response.json();
};
