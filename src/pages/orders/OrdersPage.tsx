import AddIcon from '@mui/icons-material/Add'
import Tab from '@mui/material/Tab'
import { TextField, Box, Typography } from '@mui/material'
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
    selectedDate,
    setSelectedDate,
    allStores,
    handleEdit,
    handleDelete,
    handleStatusChange,
  } = useOrders(mockOrders)

  const formatDisplayDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

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

      {/* Date Picker and Display */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {formatDisplayDate(selectedDate)}
        </Typography>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          size="small"
          sx={{ width: '180px' }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>

      {/* Tab Navigation */}
      <StyledTabs
        value={{ active: 0, packed: 1, completed: 2, all: 3 }[activeTab]}
        onChange={(_, newValue) => setActiveTab(['active', 'packed', 'completed', 'all'][newValue] as 'active' | 'packed' | 'completed' | 'all')}
      >
        <Tab label="Active" />
        <Tab label="Packed" />
        <Tab label="Completed" />
        <Tab label="View All" />
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
