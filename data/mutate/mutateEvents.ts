import useToast from "@/hooks/toast";
import { AddEventType, EventType } from "@/types/eventTypes";
import axiosInstance from "@/utilities/axiosInstance";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { QUERY_EVENTS } from "../queryKeys";

const add = async (event: AddEventType) => {
  return await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_URL}/events`,
    event
  );
};

const update = async (event: EventType) => {
  return await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`,
    event
  );
};

const eventDelete = async (eventId: number) => {
  return await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`
  );
};

export const useAddEvent = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const addEvent = useMutation({
    mutationFn: async (event: AddEventType) => add(event),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_EVENTS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Added Event",
        message: `${res.data.event.name} has been created`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Adding Event",
        message: "Please try again",
        color: "red",
      }),
  });

  return addEvent;
};

export const useUpdateEvent = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const updateEvent = useMutation({
    mutationFn: async (event: EventType) => update(event),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_EVENTS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Updated Request",
        message: `Your request has been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Updating Event",
        message: "Please try again",
        color: "red",
      }),
  });

  return updateEvent;
};

export const useDeleteEvent = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const deleteEvent = useMutation({
    mutationFn: async (eventId: number) => eventDelete(eventId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_EVENTS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Deleted Event",
        message: "Event has been removed successfully",
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Deleting Event",
        message: "Please try again",
        color: "red",
      }),
  });

  return deleteEvent;
};
