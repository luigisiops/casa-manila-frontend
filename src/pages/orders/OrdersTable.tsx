import { useState } from 'react'
import { IconButton, Menu, MenuItem, Select, Box, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataTable, type Column } from '../../components/DataTable'
import { SubtotalCell } from './styles'
import type { Order, OrderStatus } from './types'

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

  const formatPickupTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const columns: Column<Order>[] = [
    {
      id: 'status',
      label: 'Status',
      width: '90px',
      render: (_, order) => (
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
      ),
    },
    {
      id: 'customer_name',
      label: 'Customer Name',
      render: (_, order) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {order.customer_name}
        </Typography>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      render: (email) => <Typography variant="body2">{email || '-'}</Typography>,
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      render: (value) => <Typography variant="body2">{value}</Typography>,
    },
    {
      id: 'pickup_datetime',
      label: 'Pickup Time',
      render: (value) => <Typography variant="body2">{formatPickupTime(value)}</Typography>,
    },
    {
      id: 'items',
      label: 'Items',
      render: (_, order) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-start' }}>
          {order.items.map((item) => (
            <Typography key={item.id} variant="body2" sx={{ fontSize: '0.875rem' }}>
              <strong>{item.quantity}x</strong> {item.size ? `${item.size} ` : ''}{item.food_name}
            </Typography>
          ))}
        </Box>
      ),
    },
    {
      id: 'subtotal',
      label: 'Price ($)',
      align: 'right',
      render: (_, order) => (
        <SubtotalCell align="right">${order.subtotal.toFixed(2)}</SubtotalCell>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      render: (_, order) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, order.id)}
          title="More options"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <>
      <DataTable<Order>
        columns={columns}
        data={orders}
        emptyMessage="No orders found matching your filters"
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
