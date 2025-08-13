export interface Order {
  id: string;
  customerId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
