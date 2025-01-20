

export const calculateTons = (pelletsData) => {
  let totalBags = 0;
  let totalTons = 0;
  let weightPerTon = 1005; 

  pelletsData.forEach((item) => {
    totalBags += item.bags;

    while (totalBags >= 67) {
      totalTons += weightPerTon; 
      totalBags -= 67;
    }
  });

  return {
    bags: totalBags,
    tons: totalTons,
  };
};
