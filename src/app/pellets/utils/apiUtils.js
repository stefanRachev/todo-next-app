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
    const response = await fetch(`/api/pellets/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: pelletId }),
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

export const editPellet = async (pelletId, updatedData, accessToken) => {
  try {
    const response = await fetch(`/api/pellets`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: pelletId, ...updatedData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Грешка при редактиране на задачата"
      );
    }

    const { pellet } = await response.json();
    return pellet;
  } catch (error) {
    console.error("Error editing task:", error.message);
    throw error;
  }
};