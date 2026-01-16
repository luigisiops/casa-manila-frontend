import { styled } from '@mui/material/styles'
import {
  Box,
  Container,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
  Typography,
  Tabs,
} from '@mui/material'

// Page Layout
export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
}))

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}))

// Filter & Search
export const FilterSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}))

export const FilterGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}))

export const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#f5f8fc',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}))

// Statistics
export const StatsBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}))

export const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}))

export const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
}))

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}))

// Table
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

export const SubtotalCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  borderBottom: 'none !important',
}))

// Tabs
export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}))

// Buttons
export const AddButton = styled(Button)({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
  padding: '6px 14px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
  },
})
