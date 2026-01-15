import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeContextProvider')
  }
  return context
}

interface ThemeContextProviderProps {
  children: ReactNode
}

const THEME_STORAGE_KEY = 'themeMode'
const LIGHT_MODE: ThemeMode = 'light'
const DARK_MODE: ThemeMode = 'dark'

// Color Palette
const COLOR_PALETTE = {
  sidebar: '#1f2937',
  lightBackground: '#f0f4f8',
  lightPaper: '#f5f8fc',
  darkBackground: '#111827',
  darkPaper: '#1f2937',
  primary: '#1976d2',
  divider: '#e0e0e0',
  darkDivider: '#2d3748',
  // Text Colors
  lightText: '#1a1a1a',
  lightTextSecondary: '#666666',
  darkText: '#ffffff',
  darkTextSecondary: '#d1d5db',
  sidebarText: '#f3f4f6',
  sidebarTextSecondary: '#9ca3af',
}

const getSavedTheme = (): ThemeMode => {
    try {
        const savedMode = localStorage.getItem(THEME_STORAGE_KEY)
        if (!isValidMode(savedMode)) {
            return LIGHT_MODE
        }
        return (savedMode === LIGHT_MODE || savedMode === DARK_MODE) ? savedMode : LIGHT_MODE
    } catch {
        return LIGHT_MODE
    }
}

const isValidMode = (val: unknown): val is ThemeMode => 
  val === 'light' || val === 'dark'

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Get theme from localStorage on initial load
    return getSavedTheme()
  })

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prev) => (prev === LIGHT_MODE ? DARK_MODE : LIGHT_MODE))
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: COLOR_PALETTE.primary,
      },
      background: {
        default: mode === LIGHT_MODE ? COLOR_PALETTE.lightBackground : COLOR_PALETTE.darkBackground,
        paper: mode === LIGHT_MODE ? COLOR_PALETTE.lightPaper : COLOR_PALETTE.darkPaper,
      },
      text: {
        primary: mode === LIGHT_MODE ? COLOR_PALETTE.lightText : COLOR_PALETTE.darkText,
        secondary: mode === LIGHT_MODE ? COLOR_PALETTE.lightTextSecondary : COLOR_PALETTE.darkTextSecondary,
      },
      divider: mode === LIGHT_MODE ? COLOR_PALETTE.divider : COLOR_PALETTE.darkDivider,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  })

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
