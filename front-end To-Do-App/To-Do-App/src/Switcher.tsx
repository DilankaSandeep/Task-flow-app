import React, { useState } from 'react';
import useDarkSide from './UseDark.tsx';
// @ts-ignore
import { DarkModeSwitch } from 'react-toggle-dark-mode';
export const Switcher = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    // @ts-ignore
    const toggleDarkMode = checked => {
        // @ts-ignore
        setTheme(colorTheme);
        setDarkSide(checked);
    };
    return (
        <>
            <div title={"Change Theme Color"}>
                <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={56} />
            </div>
        </>
    );
};