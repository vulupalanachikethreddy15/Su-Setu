import { MilletType, Product, Recipe, Submission, SubmissionStatus, User, UserRole, Payment } from './types';

export const LAB_NAME = "FARE Labs Pvt. Ltd. (NABL Accredited)";

export const ESTIMATED_PRICES: Record<MilletType, number> = {
  [MilletType.FOXTAIL]: 28,
  [MilletType.FINGER]: 35,
  [MilletType.SORGHUM]: 26,
  [MilletType.PEARL]: 24,
  [MilletType.LITTLE]: 30,
  [MilletType.KODO]: 27,
  [MilletType.BARNYARD]: 32,
};

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Ramesh Farmer', email: 'farmer@susetu.com', role: UserRole.FARMER, password_hash: 'pass' },
  { id: 'u2', name: 'Anita Buyer', email: 'buyer@susetu.com', role: UserRole.BUYER, password_hash: 'pass' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', sourceSubmissionId: 's1', milletType: MilletType.FOXTAIL, pricePerKg: 30, availableQuantity: 500, imageUrl: 'https://picsum.photos/400/400?random=1', description: 'Premium organic Foxtail millet.' },
  { id: 'p2', sourceSubmissionId: 's2', milletType: MilletType.FINGER, pricePerKg: 38, availableQuantity: 200, imageUrl: 'https://picsum.photos/400/400?random=2', description: 'Rich in iron Ragi.' },
  { id: 'p3', sourceSubmissionId: 's3', milletType: MilletType.SORGHUM, pricePerKg: 28, availableQuantity: 1000, imageUrl: 'https://picsum.photos/400/400?random=3', description: 'Fresh Jowar from Karnataka.' },
  { id: 'p4', sourceSubmissionId: 's4', milletType: MilletType.PEARL, pricePerKg: 26, availableQuantity: 800, imageUrl: 'https://picsum.photos/400/400?random=4', description: 'High quality Bajra.' },
];

export const MOCK_RECIPES: Recipe[] = [
  { id: 'r1', title: 'Foxtail Millet Upma', imageUrl: 'https://picsum.photos/400/300?random=10', ingredients: ['1 cup Foxtail Millet', '1 onion', 'Green chilies', 'Mustard seeds'], steps: ['Wash millet.', 'Sauté veggies.', 'Cook millet with water.'], cookTimeMinutes: 20 },
  { id: 'r2', title: 'Millet Dosa', imageUrl: 'https://picsum.photos/400/300?random=11', ingredients: ['1 cup Urad dal', '3 cups Millet', 'Salt'], steps: ['Soak ingredients.', 'Grind to batter.', 'Ferment overnight.', 'Make dosas.'], cookTimeMinutes: 15 },
  { id: 'r3', title: 'Ragi Malt', imageUrl: 'https://picsum.photos/400/300?random=12', ingredients: ['2 tbsp Ragi flour', '1 cup Milk/Water', 'Jaggery'], steps: ['Mix flour in water.', 'Boil until thick.', 'Add sweetener.'], cookTimeMinutes: 10 },
  { id: 'r4', title: 'Jowar Cutlets', imageUrl: 'https://picsum.photos/400/300?random=13', ingredients: ['1 cup boiled Jowar', 'Potatoes', 'Spices'], steps: ['Mash everything.', 'Shape into cutlets.', 'Shallow fry.'], cookTimeMinutes: 30 },
  { id: 'r5', title: 'Millet Lemon Rice', imageUrl: 'https://picsum.photos/400/300?random=14', ingredients: ['Cooked Millet', 'Lemon juice', 'Turmeric', 'Peanuts'], steps: ['Temper spices.', 'Mix with cooked millet.', 'Add lemon juice.'], cookTimeMinutes: 15 },
  { id: 'r6', title: 'Millet Biryani', imageUrl: 'https://picsum.photos/400/300?random=15', ingredients: ['Mixed Millets', 'Biryani masala', 'Vegetables', 'Curd'], steps: ['Marinate veggies.', 'Layer with millet.', 'Dum cook.'], cookTimeMinutes: 45 },
  { id: 'r7', title: 'Millet Laddu', imageUrl: 'https://picsum.photos/400/300?random=16', ingredients: ['Millet flour', 'Ghee', 'Jaggery', 'Nuts'], steps: ['Roast flour.', 'Mix with ghee and jaggery.', 'Shape laddus.'], cookTimeMinutes: 40 },
  { id: 'r8', title: 'Ragi Chikki', imageUrl: 'https://picsum.photos/400/300?random=17', ingredients: ['Ragi puffs', 'Jaggery syrup'], steps: ['Melt jaggery.', 'Mix puffs.', 'Set in tray.'], cookTimeMinutes: 20 },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub1',
    farmerId: 'u1',
    milletType: MilletType.FOXTAIL,
    quantity: 500,
    unit: 'kg',
    photoUrl: 'https://picsum.photos/200/200?random=20',
    marketPricePerKg: 28,
    status: SubmissionStatus.APPROVED,
    submittedAt: Date.now() - 10000000,
    labName: LAB_NAME,
    approvedAt: Date.now() - 500000,
  },
  {
    id: 'sub2',
    farmerId: 'u1',
    milletType: MilletType.FINGER,
    quantity: 120,
    unit: 'kg',
    photoUrl: 'https://picsum.photos/200/200?random=21',
    marketPricePerKg: 35,
    status: SubmissionStatus.SAMPLE_SENT,
    submittedAt: Date.now() - 200000,
    labName: LAB_NAME,
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', farmerId: 'u1', amount: 14000, status: 'Paid', date: Date.now() - 10000000, milletType: 'Foxtail', quantity: 500 },
];
