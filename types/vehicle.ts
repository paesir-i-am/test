export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'lpg';
export type TransmissionType = 'manual' | 'automatic';
export type VehicleStatus = 'pending' | 'approved' | 'sold' | 'rejected' | 'deleted';

export interface Manufacturer {
  id: number;
  name: string;
  name_en?: string;
  logo_url?: string;
}

export interface Model {
  id: number;
  manufacturer_id: number;
  name: string;
  name_en?: string;
}

export interface VehicleImage {
  id: number;
  vehicle_id: number;
  image_url: string;
  image_order: number;
  is_thumbnail: boolean;
}

export interface Vehicle {
  id: number;
  seller_id: number;
  manufacturer: Manufacturer;
  model: Model;
  detail_model_name?: string;
  year: number;
  mileage: number;
  price: number;
  fuel_type: FuelType;
  transmission: TransmissionType;
  color?: string;
  region: string;
  options?: string[];
  accident_history: boolean;
  accident_details?: string;
  repair_history?: string;
  description?: string;
  vehicle_number?: string;
  status: VehicleStatus;
  view_count: number;
  thumbnail_image?: string;
  images?: VehicleImage[];
  created_at: string;
  updated_at?: string;
}

export interface VehicleFormData {
  manufacturer_id: number;
  model_id: number;
  detail_model_name?: string;
  year: number;
  mileage: number;
  price: number;
  fuel_type: FuelType;
  transmission: TransmissionType;
  color?: string;
  region: string;
  options?: string[];
  accident_history: boolean;
  accident_details?: string;
  repair_history?: string;
  description?: string;
  vehicle_number?: string;
  images: File[];
}

