import { useState, useMemo } from 'react'
import type { Order, OrderStats, OrderStatus } from './types'

export interface UseOrdersReturn {
  orders: Order[]
  filteredOrders: Order[]
  stats: OrderStats
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedStore: string
  setSelectedStore: (store: string) => void
  activeTab: 'active' | 'packed' | 'completed'
  setActiveTab: (tab: 'active' | 'packed' | 'completed') => void
  allStores: string[]
  handleEdit: (orderId: number) => void
  handleDelete: (orderId: number) => void
  handleStatusChange: (orderId: number, newStatus: OrderStatus) => void
}

export function useOrders(initialOrders: Order[]): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'active' | 'packed' | 'completed'>('active')

  // Get unique stores
  const allStores = useMemo(() => {
    return Array.from(new Set(orders.map((order) => order.store_id))).sort()
  }, [orders])

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone_number.includes(searchTerm)

      const matchesStore = !selectedStore || order.store_id === selectedStore

      // Filter by active tab
      const matchesTab = order.status === activeTab

      return matchesSearch && matchesStore && matchesTab
    })
  }, [orders, searchTerm, selectedStore, activeTab])

  // Calculate statistics
  const stats: OrderStats = {
    total: orders.length,
    active: orders.filter((o) => o.status === 'active').length,
    packed: orders.filter((o) => o.status === 'packed').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  }

  const handleEdit = (orderId: number) => {
    console.log('Edit order:', orderId)
    // TODO: Open edit modal
  }

  const handleDelete = (orderId: number) => {
    console.log('Delete order:', orderId)
    // TODO: Delete order from list
  }

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  return {
    orders,
    filteredOrders,
    stats,
    searchTerm,
    setSearchTerm,
    selectedStore,
    setSelectedStore,
    activeTab,
    setActiveTab,
    allStores,
    handleEdit,
    handleDelete,
    handleStatusChange,
  }
}
