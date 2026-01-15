import AddIcon from '@mui/icons-material/Add'
import { PageContainer, PageTitle, HeaderBox, AddButton, StatsBox, StatCard, StatNumber, StatLabel } from './styles'
import { FoodItemsFilters } from './FoodItemsFilters'
import { FoodItemsTable } from './FoodItemsTable'
import { useFoodItems } from './useFoodItems'
import { mockFoodItems } from './constants'

export default function FoodItemsPage() {
  const { filteredItems, stats, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, allCategories, handleEdit, handleDelete } = useFoodItems(mockFoodItems)

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
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={allCategories}
      />

      {/* Table */}
      <FoodItemsTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
    </PageContainer>
  )
}
