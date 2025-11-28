export enum UserRole {
  FARMER = 'farmer',
  BUYER = 'buyer',
}

export enum MilletType {
  FOXTAIL = 'Foxtail',
  FINGER = 'Finger (Ragi)',
  LITTLE = 'Little',
  KODO = 'Kodo',
  BARNYARD = 'Barnyard',
  SORGHUM = 'Sorghum (Jowar)',
  PEARL = 'Pearl (Bajra)',
}

export enum SubmissionStatus {
  SUBMITTED = 'Submitted to Collection Hub',
  SAMPLE_SENT = 'Sample Sent to Lab',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum OrderStatus {
  PICKUP_SCHEDULED = 'Pickup Scheduled',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password_hash?: string; // stored for simulation
}

export interface Submission {
  id: string;
  farmerId: string;
  milletType: MilletType;
  quantity: number;
  unit: string;
  photoUrl: string;
  marketPricePerKg: number;
  status: SubmissionStatus;
  submittedAt: number;
  labName: string;
  approvedAt?: number;
}

export interface Product {
  id: string;
  sourceSubmissionId: string;
  milletType: MilletType;
  pricePerKg: number;
  availableQuantity: number;
  imageUrl: string;
  description: string;
}

export interface OrderItem {
  productId: string;
  qtyKg: number;
}

export interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: number;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  cookTimeMinutes: number;
  createdBy?: string;
}

export interface Payment {
  id: string;
  farmerId: string;
  amount: number;
  status: 'Paid' | 'Pending';
  date: number;
  milletType: string;
  quantity: number;
}
