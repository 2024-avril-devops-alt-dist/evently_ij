import axiosInstance from "../utils/axios";

export const getEvents = async () => {
  const response = await axiosInstance.get("/events");
  return response.data;
};


export const getEventById = async (id: string) => {
  const response = await axiosInstance.get(`/events/${id}`);
  const event = response.data;

  if (typeof event.adress === "string") {
    try {
      event.adress = JSON.parse(event.adress);
    } catch (error) {
      console.error("Erreur de parsing de l'adresse:", error);
      event.adress = null; 
    }
  }

  return event;
};
// export const getEventById = async (id: string) => {
//   const response = await axiosInstance.get(`/events/${id}`);
//   return response.data;
// };

// export const createEvent = async (eventData: any) => {
//   const response = await axiosInstance.post("/events", eventData);
//   return response.data;
// };

// export const updateEvent = async (id: string, eventData: any) => {
//   const response = await axiosInstance.put(`/events/${id}`, eventData);
//   return response.data;
// };

export const deleteEvent = async (id: string) => {
  const response = await axiosInstance.delete(`/events/${id}`);
  return response.data;
};
