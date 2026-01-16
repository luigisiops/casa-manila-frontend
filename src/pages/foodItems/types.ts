export interface FoodItem {
  id: number
  name: string
  description: string
  price: number
  category: string[]
  sizes: string[]
}

export interface FoodItemStats {
  total: number
  filtered: number
  categories: number
}
