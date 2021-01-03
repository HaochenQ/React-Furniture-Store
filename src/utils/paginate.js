const paginate = (items, itemsPerPage = 6) => {
  const pages = Math.ceil(items.length / itemsPerPage);
  //array of arraies
  const newItems = Array.from({ length: pages }, (_, index) => {
    const startIndex = index * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  });
  return newItems;
};
export default paginate;
