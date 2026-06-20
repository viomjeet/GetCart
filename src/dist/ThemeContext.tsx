import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // लोकल स्टोरेज से पुरानी चुनी हुई थीम उठाएं, नहीं तो डिफ़ॉल्ट 'light' रखें
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // HTML टैग पर data-theme एट्रिब्यूट सेट करें (जो हमारी CSS को बदल देगा)
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);