import AddIcon from '@mui/icons-material/Add'
import { memo } from 'react'
import { PageContainer, PageTitle, HeaderBox, AddButton, StatsBox, StatCard, StatNumber, StatLabel } from './styles'
import { FoodItemsFilters } from './FoodItemsFilters'
import { FoodItemsTable } from './FoodItemsTable'
import { useFoodItems } from './useFoodItems'
import { mockFoodItems } from './constants'

export default memo(function FoodItemsPage() {
  const { filteredItems, stats, searchTerm, setSearchTerm, selectedCategories, setSelectedCategories, allCategories, handleEdit, handleDelete } = useFoodItems(mockFoodItems)

  return (
    <PageContainer maxWidth="lg">
      <HeaderBox>
        <PageTitle variant="h4">Food Items Inventory</PageTitle>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Open modal or navigate to add food item form
            console.log('Add new food item')
          }}
        >
          Add Item
        </AddButton>
      </HeaderBox>

      {/* Statistics Bar */}
      <StatsBox>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total Items</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.filtered}</StatNumber>
          <StatLabel>Showing</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.categories}</StatNumber>
          <StatLabel>Categories</StatLabel>
        </StatCard>
      </StatsBox>

      {/* Filter Section */}
      <FoodItemsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        categories={allCategories}
      />

      {/* Table */}
      <FoodItemsTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
    </PageContainer>
  )
})
