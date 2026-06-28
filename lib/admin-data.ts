export type Booking = { id: string; client: string; event: string; date: string; guests: number; amount: string; status: string }
export type Customer = { id: string; name: string; email: string; phone: string; bookings: number; spent: string; status: string }
export type MenuItem = { id: string; name: string; category: string; price: string; stock: string; status: string }
export type Order = { id: string; customer: string; item: string; date: string; total: string; status: string }

// These collections intentionally start empty. API responses will populate them.
export const bookings: Booking[] = []
export const customers: Customer[] = []
export const menuItems: MenuItem[] = []
export const orders: Order[] = []
