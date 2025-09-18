import useToast from "@/hooks/toast";
import { AddPetType, PetType } from "@/types/petTypes";
import axiosInstance from "@/utilities/axiosInstance";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { QUERY_PETS } from "../queryKeys";

const add = async (pet: AddPetType) => {
  return await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_URL}/pets`,
    pet
  );
};

const update = async (pet: PetType) => {
  return await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/pets/${pet.id}`,
    pet
  );
};

const petDelete = async (petId: number) => {
  return await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/pets/${petId}`
  );
};

export const useAddPet = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const addPet = useMutation({
    mutationFn: async (pet: AddPetType) => add(pet),
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_PETS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Added Pet",
        message: `${res.data.pet.name} has been added to your pets`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Adding Pet",
        message: "Please try again",
        color: "red",
      }),
  });

  return addPet;
};

export const useUpdatePet = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const updatePet = useMutation({
    mutationFn: async (pet: PetType) => update(pet),
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_PETS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Updated Pet",
        message: `${res.data.pet.name} has been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Updating Pet",
        message: "Please try again",
        color: "red",
      }),
  });

  return updatePet;
};

export const useDeletePet = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const deletePet = useMutation({
    mutationFn: async (petId: number) => petDelete(petId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_PETS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Deleted Pet",
        message: "pet has been removed successfully",
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Deleting Pet",
        message: "Please try again",
        color: "red",
      }),
  });

  return deletePet;
};
