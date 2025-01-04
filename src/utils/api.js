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
        throw new Error(errorData.message || "Грешка при изтриването на продукта");
      }
  
      return true; 
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw error;
    }
  };
  
  