import axios from "axios";

export const updateExtintorDate = async (seguroId, newDate) => {
  try {
    const response = await axios.put(`/api/seguros/${seguroId}`, {
      fechaVencimientoExtintor: newDate,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating extintor date:", error);
    throw error;
  }
};