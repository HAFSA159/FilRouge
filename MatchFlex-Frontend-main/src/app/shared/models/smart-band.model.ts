export interface SmartBand {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  imageUrl: string;
  inStock: boolean;
  rating: number;
  colors?: string[];
  groupName?: string;
  userEmail?: string;
  bandId?: number;
  serialNumber?: string;
  activationTime?: string;
  status?: string;
  userId?: number;
  userName?: string;
}

export interface SmartBandState {
  bands: SmartBand[];
  selectedBand: SmartBand | null;
  loading: boolean;
  error: string | null;
}
