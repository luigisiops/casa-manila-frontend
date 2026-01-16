import { useState } from 'react'
import { IconButton, Menu, MenuItem, Box, Chip, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataTable, type Column } from '../../components/DataTable'
import { PriceCell } from './styles'
import type { FoodItem } from './types'

interface FoodItemsTableProps {
  items: FoodItem[]
  onEdit: (itemId: number) => void
  onDelete: (itemId: number) => void
}

export function FoodItemsTable({ items, onEdit, onDelete }: FoodItemsTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, itemId: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedItemId(itemId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItemId(null)
  }

  const handleEdit = () => {
    if (selectedItemId) {
      onEdit(selectedItemId)
    }
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedItemId) {
      onDelete(selectedItemId)
    }
    handleMenuClose()
  }

  const columns: Column<FoodItem>[] = [
    {
      id: 'name',
      label: 'Name',
      render: (_, item) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {item.name}
        </Typography>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      render: (value) => (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'price',
      label: 'Price ($)',
      align: 'right',
      render: (_, item) => <PriceCell align="right">${item.price.toFixed(2)}</PriceCell>,
    },
    {
      id: 'category',
      label: 'Category',
      render: (_, item) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {item.category.map((cat) => (
            <Chip key={cat} label={cat} size="small" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      id: 'sizes',
      label: 'Sizes',
      render: (_, item) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {item.sizes.map((size) => (
            <Chip
              key={size}
              label={size}
              size="small"
              color="primary"
              variant="filled"
            />
          ))}
        </Box>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      render: (_, item) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, item.id)}
          title="More options"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <>
      <DataTable<FoodItem>
        columns={columns}
        data={items}
        emptyMessage="No items found matching your filters"
        getRowId={(row) => row.id}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
