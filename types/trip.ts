export interface Trip {
  id: string;
  name: string;
  description?: string;
  members: import("./expense").Member[];
  expenseIds: string[];
  createdAt: string;
  settled: boolean;
}

export interface TripFormData {
  name: string;
  description?: string;
  members: import("./expense").Member[];
}
