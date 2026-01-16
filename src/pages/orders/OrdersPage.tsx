import AddIcon from '@mui/icons-material/Add'
import Tab from '@mui/material/Tab'
import {
  PageContainer,
  PageTitle,
  HeaderBox,
  AddButton,
  StatsBox,
  StatCard,
  StatNumber,
  StatLabel,
  StyledTabs,
} from './styles'
import { OrdersFilters } from './OrdersFilters'
import { OrdersTable } from './OrdersTable'
import { useOrders } from './useOrders'
import { mockOrders } from './constants'

export default function OrdersPage() {
  const {
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
  } = useOrders(mockOrders)

  return (
    <PageContainer maxWidth="lg">
      <HeaderBox>
        <PageTitle variant="h4">Orders</PageTitle>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Open modal or navigate to create order form
            console.log('Create new order')
          }}
        >
          New Order
        </AddButton>
      </HeaderBox>

      {/* Statistics Bar */}
      <StatsBox>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.active}</StatNumber>
          <StatLabel>Active</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.packed}</StatNumber>
          <StatLabel>Packed</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.completed}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>
      </StatsBox>

      {/* Filter Section */}
      <OrdersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStore={selectedStore}
        onStoreChange={setSelectedStore}
        stores={allStores}
      />

      {/* Tab Navigation */}
      <StyledTabs
        value={{ active: 0, packed: 1, completed: 2 }[activeTab]}
        onChange={(_, newValue) => setActiveTab(['active', 'packed', 'completed'][newValue] as 'active' | 'packed' | 'completed')}
      >
        <Tab label="Active" />
        <Tab label="Packed" />
        <Tab label="Completed" />
      </StyledTabs>

      {/* Table */}
      <OrdersTable 
        orders={filteredOrders} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </PageContainer>
  )
}
