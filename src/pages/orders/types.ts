export interface OrderItem {
  id: number
  food_name: string
  quantity: number
  size?: string // e.g., "Regular", "Large", "Half Tray", "Slice"
  price: number // price per unit
}

export type OrderStatus = 'active' | 'packed' | 'completed'

export type OrderTabStatus = OrderStatus | 'all'

export interface Order {
  id: number
  customer_name: string
  email?: string
  phone_number: string
  pickup_datetime: string // ISO 8601 format
  items: OrderItem[] // list of food items in the order
  subtotal: number
  store_id: string // "Location 1" or "Location 2"
  status: OrderStatus // 'active', 'packed', or 'completed'
}

export interface OrderStats {
  total: number
  active: number
  packed: number
  completed: number
}
