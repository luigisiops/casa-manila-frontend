import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { FilterGrid, FilterSection, SearchField } from './styles'

interface OrdersFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedStore: string
  onStoreChange: (store: string) => void
  stores: string[]
}

export function OrdersFilters({
  searchTerm,
  onSearchChange,
  selectedStore,
  onStoreChange,
  stores,
}: OrdersFiltersProps) {
  return (
    <FilterSection>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Search & Filter
      </Typography>
      <FilterGrid>
        <SearchField
          placeholder="Search by customer, email, or phone..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Store</InputLabel>
          <Select
            value={selectedStore}
            onChange={(e) => onStoreChange(e.target.value)}
            label="Store"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#2d3748' : '#f5f8fc',
            }}
          >
            <MenuItem value="">All Stores</MenuItem>
            {stores.map((store) => (
              <MenuItem key={store} value={store}>
                {store}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterGrid>
    </FilterSection>
  )
}
