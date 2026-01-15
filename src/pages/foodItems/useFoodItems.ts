import { useState, useMemo } from 'react'
import type { FoodItem, FoodItemStats } from './types'

export interface UseFoodItemsReturn {
  items: FoodItem[]
  filteredItems: FoodItem[]
  stats: FoodItemStats
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  allCategories: string[]
  handleEdit: (itemId: number) => void
  handleDelete: (itemId: number) => void
}

export function useFoodItems(initialItems: FoodItem[]): UseFoodItemsReturn {
  const [items] = useState<FoodItem[]>(initialItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Get unique categories from all items
  const allCategories = useMemo(() => {
    return Array.from(new Set(items.flatMap((item) => item.category))).sort()
  }, [items])

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory || item.category.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [items, searchTerm, selectedCategory])

  // Calculate statistics
  const stats: FoodItemStats = {
    total: items.length,
    filtered: filteredItems.length,
    categories: allCategories.length,
  }

  const handleEdit = (itemId: number) => {
    console.log('Edit item:', itemId)
    // TODO: Open edit modal or navigate to edit form
  }

  const handleDelete = (itemId: number) => {
    console.log('Delete item:', itemId)
    // TODO: Delete item from list
  }

  return {
    items,
    filteredItems,
    stats,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    allCategories,
    handleEdit,
    handleDelete,
  }
}
