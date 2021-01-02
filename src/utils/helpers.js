export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let uniqueValues = data.map((item) => item[type]);
  if (type === "colors") {
    uniqueValues = uniqueValues.flat();
  }
  return ["all", ...new Set(uniqueValues)];
};
