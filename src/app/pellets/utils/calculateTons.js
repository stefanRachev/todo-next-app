export const calculateTons = (pelletsData) => {
  let totalBags = 0;
  let totalTons = 0;
  let weightPerTon = 1005;

  let datesList = [];

  pelletsData.forEach((item) => {
    totalBags += item.bags;

    while (totalBags >= 67) {
      totalBags += item.bags;

      while (totalBags >= 67) {
        totalTons += weightPerTon;
        totalBags -= 67;

        datesList.push(new Date().toLocaleDateString());
      }
    }
  });

  return {
    bags: totalBags,
    tons: totalTons,
    dates: datesList,
  };
};
