export const themes = {
    modern_themes: {
        name: 'modern_themes',
        primary: '#2575fc',
        secondary: '#6a11cb',
        background: '#ffffff',
        text: '#222',
        border: '#e6e6e6',
    },
    classic_themes: {
        name: 'classic_themes',
        primary: '#2c7a7b',
        secondary: '#dd6b20',
        background: '#fffefc',
        text: '#111',
        border: '#dcdcdc',
    },
    dark_themes: {
        name: 'dark_themes',
        primary: '#4f46e5',
        secondary: '#06b6d4',
        background: '#0f172a',
        text: '#e6eef8',
        border: '#1f2937',
    },
    pastel_themes: {
        name: 'pastel_themes',
        primary: '#ff9eb5',
        secondary: '#a799ff',
        background: '#fff8fb',
        text: '#383838',
        border: '#ffdbe6',
    },
    neon_themes: {
        name: 'neon_themes',
        primary: '#00f7ff',
        secondary: '#ff00c3',
        background: '#000000',
        text: '#ffffff',
        border: '#111111',
    },
    forest_themes: {
        name: 'forest_themes',
        primary: '#228B22',
        secondary: '#5F8575',
        background: '#f4fff6',
        text: '#203022',
        border: '#b4d4b7',
    },
    warm_themes: {
        name: 'warm_themes',
        primary: '#ff7a00',
        secondary: '#ffb300',
        background: '#fff4e8',
        text: '#1e0f00',
        border: '#ffd29d',
    },
    cyber_themes: {
        name: 'cyber_themes',
        primary: '#00eaff',
        secondary: '#ff0077',
        background: '#050505',
        text: '#d7fffd',
        border: '#242424',
    },
};
export const getTheme = (theme) => {
    if (!theme)
        return themes.modern_themes;
    if (typeof theme === 'string')
        return themes[theme] ?? themes.modern_themes;
    return theme;
};
export const generateThemeVariables = (t) => ({
    '--fvw-primary': t.primary ?? '',
    '--fvw-secondary': t.secondary ?? '',
    '--fvw-bg': t.background ?? '',
    '--fvw-text': t.text ?? '',
    '--fvw-border': t.border ?? '',
});
