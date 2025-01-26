// contexts/ThemeContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/theme';

type Theme = typeof LIGHT_COLORS;

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: LIGHT_COLORS,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme: ColorSchemeName = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LIGHT_COLORS ? DARK_COLORS : LIGHT_COLORS));
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
