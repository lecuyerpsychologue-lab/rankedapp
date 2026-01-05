/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Fonds
        'deep-black': '#050507',
        'soft-black': '#0D0D12',
        'elevated': '#16161F',
        
        // Auras (stats)
        'aura-humor': '#FFE66D',
        'aura-intelligence': '#7B68EE',
        'aura-reliability': '#4ECDC4',
        'aura-charisma': '#FF6B6B',
        'aura-creativity': '#F093FB',
        'aura-gold': '#FFD700',
        
        // Texte
        'text-primary': '#FFFFFF',
        'text-secondary': '#8B8B9A',
        'text-muted': '#4A4A57',
        
        // Accents
        'accent-success': '#34D399',
        'accent-warning': '#FBBF24',
        'accent-error': '#F87171',
      },
      borderRadius: {
        'card': '24px',
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
