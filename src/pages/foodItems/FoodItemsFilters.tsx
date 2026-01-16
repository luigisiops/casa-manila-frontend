import { FormControl, Typography, Autocomplete, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { memo } from 'react'
import { FilterGrid, FilterSection, SearchField } from './styles'

interface FoodItemsFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  categories: string[]
}

export const FoodItemsFilters = memo(function FoodItemsFilters({
  searchTerm,
  onSearchChange,
  selectedCategories,
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
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            },
          }}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <Autocomplete
            multiple
            options={categories}
            value={selectedCategories}
            onChange={(_, newValue) => onCategoryChange(newValue)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="Select categories..."
                size="small"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2d3748' : '#f5f8fc',
                }}
              />
            )}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#2d3748' : '#f5f8fc',
            }}
            slotProps={{
              paper: {
                sx: {
                  '& .MuiAutocomplete-listbox': {
                    fontSize: '0.875rem',
                  },
                },
              },
            }}
          />
        </FormControl>
      </FilterGrid>
    </FilterSection>
  )
})
