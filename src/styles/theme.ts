// 브레이크포인트 정의
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// 기본 색상 팔레트 정의
const palette = {
  // 주요 색상
  orange: {
    50: "#FFF3E0",
    100: "#FFE0B2",
    200: "#FFCC80",
    300: "#FFB74D",
    400: "#FFA726",
    500: "#FF9800", // 메인 주황색
    600: "#FB8C00",
    700: "#F57C00",
  },
  // 무채색
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
} as const;

// 라이트 테마
export const lightTheme = {
  colors: {
    // 기본
    background: "#FFFFFF",
    surface: "#F8F9FA",
    text: palette.gray[900],
    textSecondary: palette.gray[600],

    // 브랜드
    primary: palette.orange[500],
    primaryDark: palette.orange[700],
    primaryLight: palette.orange[300],

    // 기능
    border: palette.gray[200],
    divider: palette.gray[100],
    error: "#DC3545",
    success: "#198754",
    warning: "#FFC107",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
} as const;

// 다크 테마
export const darkTheme = {
  colors: {
    // 기본
    background: "#121212",
    surface: "#1E1E1E",
    text: palette.gray[50],
    textSecondary: palette.gray[400],

    // 브랜드
    primary: palette.orange[500],
    primaryDark: palette.orange[700],
    primaryLight: palette.orange[300],

    // 기능
    border: palette.gray[800],
    divider: palette.gray[700],
    error: "#DC3545",
    success: "#198754",
    warning: "#FFC107",
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
} as const;
