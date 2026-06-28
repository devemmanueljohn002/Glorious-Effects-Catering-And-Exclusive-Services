export type Booking = { id: string; client: string; event: string; date: string; guests: number; amount: string; status: string }
export type Customer = { id: string; name: string; email: string; phone: string; bookings: number; spent: string; status: string }
export type MenuItem = { id: string; name: string; category: string; price: string; stock: string; status: string }
export type Order = { id: string; customer: string; item: string; date: string; total: string; status: string }

export const bookings: Booking[] = [
  { id: 'BK-1048', client: 'Amara Okafor', event: 'Wedding Reception', date: '12 Jul 2026', guests: 250, amount: '₦850,000', status: 'Confirmed' },
  { id: 'BK-1047', client: 'Tobi Adeyemi', event: 'Corporate Dinner', date: '18 Jul 2026', guests: 80, amount: '₦420,000', status: 'Pending' },
  { id: 'BK-1046', client: 'Nkechi Eze', event: '50th Birthday', date: '25 Jul 2026', guests: 120, amount: '₦615,000', status: 'Confirmed' },
  { id: 'BK-1045', client: 'Damilola James', event: 'Anniversary', date: '02 Aug 2026', guests: 45, amount: '₦280,000', status: 'In review' },
]
export const customers: Customer[] = [
  { id: 'CU-2081', name: 'Amara Okafor', email: 'amara@example.com', phone: '+234 803 234 1180', bookings: 4, spent: '₦1,480,000', status: 'VIP' },
  { id: 'CU-2080', name: 'Tobi Adeyemi', email: 'tobi@example.com', phone: '+234 812 566 2041', bookings: 2, spent: '₦620,000', status: 'Active' },
  { id: 'CU-2079', name: 'Nkechi Eze', email: 'nkechi@example.com', phone: '+234 706 981 4472', bookings: 3, spent: '₦940,000', status: 'Active' },
  { id: 'CU-2078', name: 'Zainab Musa', email: 'zainab@example.com', phone: '+234 809 123 8804', bookings: 1, spent: '₦215,000', status: 'New' },
]
export const menuItems: MenuItem[] = [
  { id: 'MN-101', name: 'Celebration Cake', category: 'Cakes', price: '₦68,500', stock: 'Made to order', status: 'Available' },
  { id: 'MN-102', name: 'Premium Small Chops', category: 'Snacks', price: '₦42,000', stock: '24 portions', status: 'Available' },
  { id: 'MN-103', name: 'Executive Lunch Pack', category: 'Catering', price: '₦12,500', stock: 'Made to order', status: 'Available' },
  { id: 'MN-104', name: 'Dessert Collection', category: 'Desserts', price: '₦35,000', stock: '8 boxes', status: 'Low stock' },
]
export const orders: Order[] = [
  { id: 'GE-1048', customer: 'Amara Okafor', item: 'Celebration cake', date: '28 Jun, 10:42', total: '₦68,500', status: 'Processing' },
  { id: 'GE-1047', customer: 'Tobi Adeyemi', item: 'Small chops platter', date: '28 Jun, 09:18', total: '₦42,000', status: 'Paid' },
  { id: 'GE-1046', customer: 'Nkechi Eze', item: 'Dessert package', date: '27 Jun, 16:05', total: '₦115,000', status: 'Ready' },
  { id: 'GE-1045', customer: 'Damilola James', item: 'Catering deposit', date: '27 Jun, 12:31', total: '₦250,000', status: 'Paid' },
  { id: 'GE-1044', customer: 'Zainab Musa', item: 'Pastry box × 4', date: '26 Jun, 14:22', total: '₦32,000', status: 'Delivered' },
]
