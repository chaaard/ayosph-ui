export const getDateStatus = (count: number) => {
  if (count >= 4) return "red";
  if (count >= 2) return "orange";
  return "green";
};

export const isDateDisabled = (count: number) => {
  return count >= 4;
};