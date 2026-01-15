import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { FoodItem } from './types'
import { StyledTableContainer, StyledTableHead, StyledTableRow, PriceCell } from './styles'

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

  return (
    <>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sizes</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </TableCell>
                  <PriceCell align="right">${item.price.toFixed(2)}</PriceCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.category.map((cat) => (
                        <Chip key={cat} label={cat} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, item.id)}
                      title="More options"
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No items found matching your filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

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
