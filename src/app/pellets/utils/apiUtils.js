// src/app/pellets/utils/apiUtils.js
export async function fetchPellets(accessToken) {
    try {
      const response = await fetch("/api/pellets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Грешка при зареждане на данните!");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Грешка:", error.message);
      throw error;  
    }
  }



