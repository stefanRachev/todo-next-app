export const calculateTons = (pelletsData) => {
    let totalBags = 0; // Общ брой чували
    let totalTons = 0; // Общ тонаж
  
    pelletsData.forEach((item) => {
      totalBags += item.bags; // Добавяме чувалите за текущия обект
  
      // Проверка дали достигаме точно 1 тон (66 чувала)
      while (totalBags >= 66) {
        totalTons++; // Увеличаваме общия тонаж
        totalBags -= 66; // Намаляваме чувалите с 1 тон
      }
    });
  
    return {
      bags: totalBags,
      tons: totalTons,
    };
  };

