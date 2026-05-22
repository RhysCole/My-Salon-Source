
export interface ISunbedData {
  id: string | null;
  name: string | null;
  type: string | null;
  model: string | null;
  oporational: boolean | null;
  purchaseDate: Date | null;
  nickname: string | null;
  location: string | null;
}

export interface UserProfile {
  firstName: string | null;
  role: string | null;
  staffId: string | null,
  companyId: string | null;
  salonId: string | null;
}

export interface IBedObject {
  bedInfo: ISunbedData | null;
  status: "Available" | "In Use" | "Cleaning" | "Ready" | "Maintenance";
  times: ITimes | null;
  currentUser: UserProfile | null;
}

export interface ITimes {
  startTime: string;
  endTime: string;
}

export interface ICustomer {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string | null;
  email: string | null;
  skin_type: string | null;
  notes: string | null;
  packages: IPackage[] | null;
  minutes: number;
}

export interface ISalonObject{
  id: string,
  name: string,
  address: string,
  phone_number: string | null,
}

export interface IBooking {
  id: string;
  customer: ICustomer;
  booking_creator: UserProfile,
  booking_time: string,
  duration: number,
  status: 'scheduled'| 'Completed' | 'In Progress',
  notes: string | null,
  salon: ISalonObject,
}

export interface IQueueItem{
  id: string,
  item: ICustomer | IBooking,
}

export interface IPackage{
  id: string,
  name: string,
  minutes_remaining: number,
  sessions_remaining: number,
  expiry_date: string,
  price: number,
}

export interface IProduct {
    id: string;
    sku: string | null;
    name: string;
    description: string | null;
    sale_price: number;
    cost_price: number | null;
    stock_quantity: number;
    reorder_level: number | null;
}

export interface IStock{
  products: IProduct[];
  packages: IPackage[];
}

export interface IMinuteItem{
  value: number,
  price: number,
}