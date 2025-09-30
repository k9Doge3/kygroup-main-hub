export interface UserColor {
  primary: string
  secondary: string
  text: string
  background: string
}

// Predefined color palette with good contrast and accessibility
const COLOR_PALETTE: UserColor[] = [
  {
    primary: "rgb(59, 130, 246)", // Blue
    secondary: "rgb(147, 197, 253)",
    text: "rgb(255, 255, 255)",
    background: "rgb(37, 99, 235)",
  },
  {
    primary: "rgb(16, 185, 129)", // Emerald
    secondary: "rgb(110, 231, 183)",
    text: "rgb(255, 255, 255)",
    background: "rgb(5, 150, 105)",
  },
  {
    primary: "rgb(245, 101, 101)", // Red
    secondary: "rgb(252, 165, 165)",
    text: "rgb(255, 255, 255)",
    background: "rgb(220, 38, 38)",
  },
  {
    primary: "rgb(251, 146, 60)", // Orange
    secondary: "rgb(253, 186, 116)",
    text: "rgb(255, 255, 255)",
    background: "rgb(234, 88, 12)",
  },
  {
    primary: "rgb(168, 85, 247)", // Purple
    secondary: "rgb(196, 181, 253)",
    text: "rgb(255, 255, 255)",
    background: "rgb(147, 51, 234)",
  },
  {
    primary: "rgb(236, 72, 153)", // Pink
    secondary: "rgb(251, 182, 206)",
    text: "rgb(255, 255, 255)",
    background: "rgb(219, 39, 119)",
  },
  {
    primary: "rgb(14, 165, 233)", // Sky
    secondary: "rgb(125, 211, 252)",
    text: "rgb(255, 255, 255)",
    background: "rgb(2, 132, 199)",
  },
  {
    primary: "rgb(34, 197, 94)", // Green
    secondary: "rgb(134, 239, 172)",
    text: "rgb(255, 255, 255)",
    background: "rgb(22, 163, 74)",
  },
  {
    primary: "rgb(249, 115, 22)", // Amber
    secondary: "rgb(253, 186, 116)",
    text: "rgb(255, 255, 255)",
    background: "rgb(217, 119, 6)",
  },
  {
    primary: "rgb(139, 69, 19)", // Brown
    secondary: "rgb(196, 164, 132)",
    text: "rgb(255, 255, 255)",
    background: "rgb(120, 53, 15)",
  },
]

// Simple hash function to convert string to number
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Get consistent color for a user name
export function getUserColor(userName: string): UserColor {
  const hash = hashString(userName.toLowerCase().trim())
  const colorIndex = hash % COLOR_PALETTE.length
  return COLOR_PALETTE[colorIndex]
}

// Get CSS custom properties for a user
export function getUserColorVars(userName: string): Record<string, string> {
  const color = getUserColor(userName)
  return {
    "--user-primary": color.primary,
    "--user-secondary": color.secondary,
    "--user-text": color.text,
    "--user-background": color.background,
  }
}

// Get Tailwind-compatible classes for a user
export function getUserColorClasses(userName: string): {
  primary: string
  secondary: string
  text: string
  background: string
  border: string
  ring: string
} {
  const color = getUserColor(userName)
  return {
    primary: `[color:${color.primary}]`,
    secondary: `[color:${color.secondary}]`,
    text: `[color:${color.text}]`,
    background: `[background-color:${color.background}]`,
    border: `[border-color:${color.primary}]`,
    ring: `[--tw-ring-color:${color.primary}]`,
  }
}
