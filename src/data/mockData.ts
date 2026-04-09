export interface Village {
  id: string;
  name: string;
  wasteAmount: number; // kg
  distanceFromHub: number; // km
  coordinates: [number, number]; // [lat, lng]
  predictedWaste: number; // kg
  greenPoints: number;
}

export const hubLocation: [number, number] = [21.330, 81.600];

export const villages: Village[] = [
  { id: 'v01', name: 'Amgaon', wasteAmount: 28, distanceFromHub: 2.45, coordinates: [21.315868, 81.581796], predictedWaste: 32, greenPoints: 280 },
  { id: 'v02', name: 'Bharni', wasteAmount: 34, distanceFromHub: 6.03, coordinates: [21.321509, 81.657483], predictedWaste: 38, greenPoints: 340 },
  { id: 'v03', name: 'Chandli', wasteAmount: 22, distanceFromHub: 14.21, coordinates: [21.319154, 81.463348], predictedWaste: 25, greenPoints: 220 },
  { id: 'v04', name: 'Dharampura', wasteAmount: 40, distanceFromHub: 3.57, coordinates: [21.355024, 81.578389], predictedWaste: 45, greenPoints: 400 },
  { id: 'v05', name: 'Ekta Nagar', wasteAmount: 25, distanceFromHub: 2.54, coordinates: [21.309845, 81.611557], predictedWaste: 28, greenPoints: 250 },
  { id: 'v06', name: 'Fulwari', wasteAmount: 18, distanceFromHub: 11.12, coordinates: [21.349572, 81.705242], predictedWaste: 22, greenPoints: 180 },
  { id: 'v07', name: 'Ghoghra', wasteAmount: 31, distanceFromHub: 5.59, coordinates: [21.379565, 81.608955], predictedWaste: 35, greenPoints: 310 },
  { id: 'v08', name: 'Hirapur', wasteAmount: 26, distanceFromHub: 11.83, coordinates: [21.267405, 81.507651], predictedWaste: 30, greenPoints: 260 },
  { id: 'v09', name: 'Ishwarpur', wasteAmount: 35, distanceFromHub: 12.63, coordinates: [21.350973, 81.71983], predictedWaste: 40, greenPoints: 350 },
  { id: 'v10', name: 'Jaitpuri', wasteAmount: 19, distanceFromHub: 2.12, coordinates: [21.336957, 81.580937], predictedWaste: 22, greenPoints: 190 },
  { id: 'v11', name: 'Karanji', wasteAmount: 30, distanceFromHub: 14.59, coordinates: [21.375087, 81.467696], predictedWaste: 35, greenPoints: 300 },
  { id: 'v12', name: 'Lohara', wasteAmount: 24, distanceFromHub: 4.81, coordinates: [21.306778, 81.639146], predictedWaste: 28, greenPoints: 240 },
  { id: 'v13', name: 'Manpur', wasteAmount: 38, distanceFromHub: 8.07, coordinates: [21.399993, 81.579298], predictedWaste: 42, greenPoints: 380 },
  { id: 'v14', name: 'Nawagaon', wasteAmount: 27, distanceFromHub: 3.75, coordinates: [21.35814, 81.61991], predictedWaste: 30, greenPoints: 270 },
  { id: 'v15', name: 'Odgi', wasteAmount: 21, distanceFromHub: 12.89, coordinates: [21.396651, 81.498184], predictedWaste: 24, greenPoints: 210 },
  { id: 'v16', name: 'Parsa', wasteAmount: 33, distanceFromHub: 15.16, coordinates: [21.377899, 81.462949], predictedWaste: 38, greenPoints: 330 },
  { id: 'v17', name: 'Quara', wasteAmount: 17, distanceFromHub: 19.55, coordinates: [21.158715, 81.557405], predictedWaste: 20, greenPoints: 170 },
  { id: 'v18', name: 'Ramgarh', wasteAmount: 36, distanceFromHub: 11.96, coordinates: [21.252289, 81.6798], predictedWaste: 42, greenPoints: 360 },
  { id: 'v19', name: 'Sarangpur', wasteAmount: 29, distanceFromHub: 13.15, coordinates: [21.386612, 81.488464], predictedWaste: 32, greenPoints: 290 },
  { id: 'v20', name: 'Tilda', wasteAmount: 23, distanceFromHub: 12.41, coordinates: [21.402082, 81.508477], predictedWaste: 26, greenPoints: 230 },
  { id: 'v21', name: 'Udaypur', wasteAmount: 41, distanceFromHub: 2.83, coordinates: [21.322834, 81.573785], predictedWaste: 46, greenPoints: 410 },
  { id: 'v22', name: 'Vijaynagar', wasteAmount: 20, distanceFromHub: 7.22, coordinates: [21.33899, 81.66905], predictedWaste: 22, greenPoints: 200 },
  { id: 'v23', name: 'Wardha', wasteAmount: 32, distanceFromHub: 6.2, coordinates: [21.378905, 81.628773], predictedWaste: 36, greenPoints: 320 },
  { id: 'v24', name: 'Yashpur', wasteAmount: 26, distanceFromHub: 7.02, coordinates: [21.38081, 81.640157], predictedWaste: 30, greenPoints: 260 },
  { id: 'v25', name: 'Dharampura-2', wasteAmount: 25, distanceFromHub: 3.8, coordinates: [21.3585, 81.5765], predictedWaste: 28, greenPoints: 250 },
];

export const plasticTypes = [
  'PET Bottles',
  'Plastic Bags',
  'Packaging Plastic',
  'Mixed Plastic'
];

export interface WasteReport {
  id: string;
  villageId: string;
  plasticType: string;
  weight: number;
  date: string;
  imageUrl?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export const initialReports: WasteReport[] = [
  { id: 'r1', villageId: 'v_a', plasticType: 'PET Bottles', weight: 15, date: new Date().toISOString() },
  { id: 'r2', villageId: 'v_b', plasticType: 'Plastic Bags', weight: 20, date: new Date().toISOString() },
  { id: 'r3', villageId: 'v_c', plasticType: 'Mixed Plastic', weight: 10, date: new Date().toISOString() },
];

export const vehicleCapacity = 120; // kg
