export interface FarmerData {
  name: string;
  phone: string;
  email: string;
  village: string;
  state: string;
  district: string;
  pincode: string;
  totalLand: string;
  memberSince: string;
  farmerID: string;
  farms: Farm[];
}

export interface Farm {
  id: number;
  name: string;
  size: string;
  crop: string;
  location: string;
  health: string;
  lastUpdate: string;
  soilType: string;
  irrigationType: string;
}
