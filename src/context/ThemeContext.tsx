import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'dark' | 'light';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceHighlight: string;
  textMain: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHighlight: string;
  
  // Accents
  accentAmber: string;
  accentAmberBg: string;
  accentSky: string;
  accentSkyBg: string;
  accentEmerald: string;
  accentEmeraldBg: string;
  accentRed: string;
  accentRedBg: string;
  accentViolet: string;
  accentVioletBg: string;
  
  // Overlays
  overlayBg: string;
  dashboardOverlay: string;
}

export const darkTheme: ThemeColors = {
  background: '#0F172A', // Slate 900
  surface: 'rgba(30, 41, 59, 0.8)', // Slate 800
  surfaceSecondary: 'rgba(15, 23, 42, 0.65)',
  surfaceHighlight: 'rgba(51, 65, 85, 0.8)', // Slate 700
  textMain: '#F8FAFC', // Slate 50
  textSecondary: '#CBD5E1', // Slate 300
  textMuted: '#94A3B8', // Slate 400
  border: 'rgba(51, 65, 85, 0.5)',
  borderHighlight: 'rgba(71, 85, 105, 0.8)',
  
  accentAmber: '#F59E0B',
  accentAmberBg: 'rgba(245, 158, 11, 0.12)',
  accentSky: '#38BDF8',
  accentSkyBg: 'rgba(56, 189, 248, 0.12)',
  accentEmerald: '#10B981',
  accentEmeraldBg: 'rgba(16, 185, 129, 0.12)',
  accentRed: '#EF4444',
  accentRedBg: 'rgba(239, 68, 68, 0.12)',
  accentViolet: '#A78BFA',
  accentVioletBg: 'rgba(167, 139, 250, 0.12)',
  
  overlayBg: 'rgba(15, 23, 42, 0.95)',
  dashboardOverlay: 'rgba(15, 23, 42, 0.6)',
};

export const lightTheme: ThemeColors = {
  background: '#F1F5F9', // Slate 100
  surface: '#FFFFFF', 
  surfaceSecondary: '#F8FAFC', // Slate 50
  surfaceHighlight: '#E2E8F0', // Slate 200
  textMain: '#0F172A', // Slate 900
  textSecondary: '#334155', // Slate 700
  textMuted: '#64748B', // Slate 500
  border: '#CBD5E1', // Slate 300
  borderHighlight: '#94A3B8', // Slate 400
  
  accentAmber: '#1D4ED8', // Darker blue for better contrast
  accentAmberBg: 'rgba(29, 78, 216, 0.1)',
  accentSky: '#1D4ED8',
  accentSkyBg: 'rgba(29, 78, 216, 0.1)',
  accentEmerald: '#059669',
  accentEmeraldBg: 'rgba(5, 150, 105, 0.1)',
  accentRed: '#DC2626',
  accentRedBg: 'rgba(220, 38, 38, 0.1)',
  accentViolet: '#7C3AED',
  accentVioletBg: 'rgba(124, 58, 237, 0.1)',
  
  overlayBg: 'rgba(255, 255, 255, 0.95)',
  dashboardOverlay: 'rgba(241, 245, 249, 0.7)', // Translucent Slate 100 for light mode
};

interface ThemeContextProps {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  colors: darkTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    AsyncStorage.getItem('app_theme').then(savedTheme => {
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    });
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem('app_theme', nextTheme);
      return nextTheme;
    });
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
