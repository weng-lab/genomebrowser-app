'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
          fontWeight: 500,
        },
        outlined: {
          borderColor: '#1976d2',
          color: '#1976d2',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
            borderColor: '#1976d2',
          },
        },
        contained: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)',
          '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)',
          },
        },
        text: {
          color: '#1976d2',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
          },
        },
      },
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#424242',
      paper: '#616161',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
          fontWeight: 500,
        },
        outlined: {
          borderColor: '#90caf9',
          color: '#90caf9',
          '&:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.08)',
            borderColor: '#90caf9',
          },
        },
        contained: {
          backgroundColor: '#90caf9',
          color: '#121212',
          boxShadow: '0 2px 4px rgba(144, 202, 249, 0.2)',
          '&:hover': {
            backgroundColor: '#64b5f6',
            boxShadow: '0 4px 8px rgba(144, 202, 249, 0.3)',
          },
        },
        text: {
          color: '#90caf9',
          '&:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.08)',
          },
        },
      },
    },
  },
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light')

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}