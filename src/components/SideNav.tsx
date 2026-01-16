import { Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider, IconButton } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from '../contexts/ThemeContext'

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
  },
}))

const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: 'center',
    justifyContent: 'center',
}))

const DrawerTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#f3f4f6',
  marginBottom: theme.spacing(0.5),
}))

const DrawerSubtitle = styled(Typography)({
  color: '#9ca3af',
})

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: '#f3f4f6',
  '&.Mui-selected': {
    backgroundColor: '#374151',
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#374151',
    },
  },
  '&:hover': {
    backgroundColor: '#2d3748',
  },
})) as typeof ListItemButton

const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const FooterText = styled(Typography)({
  color: '#9ca3af',
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
            sx={{ color: '#f3f4f6' }}
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
          </IconButton>
        </Box>
      </DrawerFooter>
    </StyledDrawer>
  )
}
