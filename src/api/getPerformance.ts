export const getPerformance = async (start: string, end: string) => {
  const response = await fetch(`/api/performance?start=${start}&end=${end}`);
  return response.json();
};
