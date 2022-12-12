export const formatTemperature = (temp: number) => {
  const roundTemp = Math.round(temp);
  return roundTemp > 0 ? `+${roundTemp}` : String(roundTemp);
};
