export const FontWeight = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900'
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const LineHeight = {
  xs: 16,    // 1.6 ratio for xs
  sm: 20,    // 1.67 ratio for sm
  base: 24,  // 1.71 ratio for base
  md: 28,    // 1.75 ratio for md
  lg: 32,    // 1.78 ratio for lg
  xl: 36,    // 1.8 ratio for xl
  '2xl': 40, // 1.67 ratio for 2xl
  '3xl': 48, // 1.6 ratio for 3xl
  '4xl': 56, // 1.56 ratio for 4xl
  '5xl': 64, // 1.33 ratio for 5xl
} as const;

export const Spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  ms: 10,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export type FontWeightType = keyof typeof FontWeight;
export type FontSizeType = keyof typeof FontSize;
export type LineHeightType = keyof typeof LineHeight;
export type SpacingType = keyof typeof Spacing;