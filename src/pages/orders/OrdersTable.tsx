import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Box,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Order, OrderStatus } from './types'
import { StyledTableContainer, StyledTableHead, StyledTableRow, SubtotalCell } from './styles'

interface OrdersTableProps {
  orders: Order[]
  onEdit: (orderId: number) => void
  onDelete: (orderId: number) => void
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void
}

export function OrdersTable({ orders, onEdit, onDelete, onStatusChange }: OrdersTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrderId(orderId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedOrderId(null)
  }

  const handleEdit = () => {
    if (selectedOrderId) {
      onEdit(selectedOrderId)
    }
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedOrderId) {
      onDelete(selectedOrderId)
    }
    handleMenuClose()
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <StyledTableRow key={order.id}>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                      size="small"
                      variant="standard"
                      sx={{
                        textTransform: 'capitalize',
                        minWidth: '90px',
                        '& .MuiSelect-standard:after': {
                          borderBottomColor: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="packed">Packed</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {order.customer_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.email || '-'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.phone_number}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDateTime(order.pickup_datetime)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-start' }}>
                      {order.items.map((item) => (
                        <Typography key={item.id} variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.quantity}x {item.size ? `${item.size} ` : ''}{item.food_name}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <SubtotalCell align="right">
                    ${order.subtotal.toFixed(2)}
                  </SubtotalCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, order.id)}
                      title="More options"
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No orders found matching your filters
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
