export const deleteProduct = async (productId, accessToken) => {
  try {
    const response = await fetch(`/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Грешка при изтриването на продукта"
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
};

export const editProduct = async (productId, updatedData, accessToken) => {
  try {
    const response = await fetch(`/api/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: productId, ...updatedData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Грешка при редактиране на продукта"
      );
    }

    const { product } = await response.json();
    return product;
  } catch (error) {
    console.error("Error editing product:", error.message);
    throw error;
  }
};

export const deleteTask = async (taskId, accessToken) => {
  try {
    const response = await fetch(`/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: taskId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Грешка при изтриването на продукта"
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
};

export const editTask = async (taskId, updatedData, accessToken) => {
  try {
    const response = await fetch(`/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: taskId, ...updatedData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Грешка при редактиране на задачата"
      );
    }

    const { task } = await response.json();
    return task;
  } catch (error) {
    console.error("Error editing task:", error.message);
    throw error;
  }
};
