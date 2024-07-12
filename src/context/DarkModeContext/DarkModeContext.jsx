/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = () => {
        setIsDark(prev => !prev);
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', JSON.stringify(isDark));
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('darkMode');
        }
    }, [isDark]);

    useEffect(() => {
        const darkMode = JSON.parse(localStorage.getItem('darkMode'));
        setIsDark(darkMode ?? true);
    }, []);

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export { DarkModeContext, DarkModeProvider };
