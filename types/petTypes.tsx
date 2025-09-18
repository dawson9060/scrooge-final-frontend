export type PetType = {
  id: number;
  name: string;
  breed: string;
  age: number | null;
  is_pet_friendly: boolean;
  is_kid_friendly: boolean;
  has_special_needs: boolean;
  has_medication_needs: boolean;
  description?: string;
};

export type AddPetType = {
  name: string;
  breed: string;
  age: number | null;
  is_pet_friendly: boolean;
  is_kid_friendly: boolean;
  has_special_needs: boolean;
  has_medication_needs: boolean;
  description?: string;
};
