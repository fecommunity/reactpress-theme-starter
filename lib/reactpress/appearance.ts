import {
  buildBrandingAppearanceCss,
  type ThemeMods,
} from '@fecommunity/reactpress-toolkit/theme/server'

function modValue(mods: ThemeMods, key: string): string | undefined {
  const raw = mods?.[key]
  if (typeof raw !== 'string') return undefined
  const trimmed = raw.trim()
  return trimmed || undefined
}

function normalizeHex(value: string | undefined): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return undefined
  if (trimmed.length === 4) {
    const [, r, g, b] = trimmed
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return trimmed.toLowerCase()
}

function darkenHex(hex: string, amount = 0.22): string {
  const normalized = normalizeHex(hex)
  if (!normalized) return hex
  const value = normalized.slice(1)
  const channels = [0, 2, 4].map((start) => parseInt(value.slice(start, start + 2), 16))
  const factor = 1 - amount
  return `#${channels
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel * factor)))
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`
}

/** Maps Customizer color mods to Tailwind v4 primary scale overrides. */
export function buildThemeStarterAppearanceCss(mods: ThemeMods): string {
  const base = buildBrandingAppearanceCss(mods)
  const lightPrimary = normalizeHex(modValue(mods, 'primaryColor'))
  const darkPrimary = normalizeHex(modValue(mods, 'darkPrimaryColor'))
  const lightBg = normalizeHex(modValue(mods, 'backgroundColor'))
  const darkBg = normalizeHex(modValue(mods, 'darkBackgroundColor'))

  const blocks: string[] = [base]

  if (lightPrimary) {
    const buttonBg = darkenHex(lightPrimary)
    blocks.push(
      `body:not(.dark) { --primary-color: ${lightPrimary}; --primary-button-bg: ${buttonBg}; --color-primary-500: ${lightPrimary}; --color-primary-600: ${buttonBg}; }`
    )
  }
  if (darkPrimary) {
    const buttonBg = darkenHex(darkPrimary)
    blocks.push(
      `body.dark { --primary-color: ${darkPrimary}; --primary-button-bg: ${buttonBg}; --color-primary-500: ${darkPrimary}; --color-primary-400: ${darkPrimary}; }`
    )
  }
  if (lightBg) {
    blocks.push(`body:not(.dark) { background-color: ${lightBg}; }`)
  }
  if (darkBg) {
    blocks.push(`body.dark { background-color: ${darkBg}; }`)
  }

  return blocks.filter(Boolean).join('\n')
}
