import { Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider, IconButton } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from '../contexts/ThemeContext'

// Sidebar Color Palette
const SIDEBAR_COLORS = {
  background: '#1f2937',
  text: '#f3f4f6',
  textSecondary: '#9ca3af',
  selectedBg: '#374151',
  hoverBg: '#2d3748',
  divider: '#2d3748',
}
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    backgroundColor: '#161c32',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    borderBottom: `1px solid ${SIDEBAR_COLORS.divider}`,
    alignItems: 'center',
    justifyContent: 'center',
}))

const DrawerTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
}))

const DrawerSubtitle = styled(Typography)({
  color: SIDEBAR_COLORS.textSecondary,
})

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: SIDEBAR_COLORS.text,
  '&.Mui-selected': {
    backgroundColor: SIDEBAR_COLORS.selectedBg,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: SIDEBAR_COLORS.selectedBg,
    },
  },
  '&:hover': {
    backgroundColor: SIDEBAR_COLORS.hoverBg,
  },
})) as typeof ListItemButton

const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const FooterText = styled(Typography)({
  color: SIDEBAR_COLORS.textSecondary,
})

export default function SideNav() {
  const location = useLocation()
  const { mode, toggleTheme } = useThemeMode()

  const navItems = [
    { name: 'Food Items', path: '/foodItems', icon: RestaurantMenuIcon },
    { name: 'Orders', path: '/orders', icon: ShoppingCartIcon },
  ]

  return (
    <StyledDrawer variant="permanent">
      {/* Header */}
      <DrawerHeader>
        <DrawerTitle variant="h5">
          Casa Manila
        </DrawerTitle>
        <DrawerSubtitle variant="caption">
          Restaurant Management
        </DrawerSubtitle>
      </DrawerHeader>

      {/* Navigation List */}
      <List sx={{ flex: 1, overflow: 'auto' }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <ListItem key={item.path} disablePadding>
              <StyledListItemButton
                component={Link as any}
                to={item.path}
                selected={isActive}
              >
                <Icon sx={{ mr: 2 }} />
                <ListItemText primary={item.name} />
              </StyledListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Footer */}
      <Divider />
      <DrawerFooter>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <FooterText variant="caption">
            © 2026 Casa Manila
          </FooterText>
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{ color: SIDEBAR_COLORS.text }}
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
          </IconButton>
        </Box>
      </DrawerFooter>
    </StyledDrawer>
  )
}
