import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { ThemeContextProvider } from './contexts/ThemeContext'
import SideNav from './components/SideNav'
import { FoodItemsPage } from './pages/foodItems'
import Orders from './pages/Orders'
import './App.css'

function AppContent() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SideNav />
        <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/foodItems" element={<FoodItemsPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Navigate to="/foodItems" replace />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  )
}

export default App
