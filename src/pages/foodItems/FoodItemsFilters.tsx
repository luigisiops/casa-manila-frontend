import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { FilterGrid, FilterSection, SearchField } from './styles'

interface FoodItemsFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categories: string[]
}

export function FoodItemsFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: FoodItemsFiltersProps) {
  return (
    <FilterSection>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Search & Filter
      </Typography>
      <FilterGrid>
        <SearchField
          placeholder="Search by name or description..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            label="Category"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#2d3748' : '#f5f8fc',
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterGrid>
    </FilterSection>
  )
}
