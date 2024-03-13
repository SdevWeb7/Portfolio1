"use client"

import { useTheme } from "./useTheme";
import { IconSun } from "../svg/IconSun";
import { IconMoon } from "../svg/IconMoon";

export function ThemeButton () {
   const { theme, setTheme } = useTheme()


   return <section className={'theme-switcher'}>
      <button
         className={'theme-button'}
         onClick={() => setTheme(
            v => v === 'light' ? 'dark' : 'light')}>
         {theme === 'dark' ? <IconSun /> : <IconMoon />}
      </button></section>
}