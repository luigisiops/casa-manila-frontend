import { styled } from '@mui/material/styles'
import { TableContainer, TableHead, TableRow } from '@mui/material'

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}))

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#f5f8fc',
    color: theme.palette.text.primary,
    fontWeight: 600,
    borderBottom: `2px solid ${theme.palette.divider}`,
    textAlign: 'center',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td': {
    borderRight: `1px solid ${theme.palette.divider}`,
    verticalAlign: 'top',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& td:last-child': {
    borderRight: 'none',
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#f9fafb',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))
