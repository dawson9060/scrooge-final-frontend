import { PetType } from "./petTypes";

export type EventType = {
  id: number;
  name: string;
  event_start: number;
  event_end: number;
  num_pets: number;
  num_days: number;
  num_credits: number;
  is_active: boolean;
  description: string;
  city?: string;
  state?: string;
  zip?: number;
  status?: string;
  pets: PetType[];
};

export type AddEventType = {
  name: string;
  description: string;
  pet_ids?: number[];
  event_start: number;
  event_end: number;
};
