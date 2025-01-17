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



export const deletePellet = async (pelletId, accessToken) => {
  try {
    const response = await fetch(`/api/pellets/${pelletId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Неуспешно изтриване на пелет.");
    }

    return await response.json();
  } catch (error) {
    console.error("Грешка при изтриване на пелет:", error.message);
    throw error;
  }
};




