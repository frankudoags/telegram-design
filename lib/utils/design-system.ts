import { Dimensions, Platform, StatusBar } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── Spacing (raw pt values) ─────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// ─── Sizing (raw pt values) ──────────────────────
export const sizing = {
  avatar: { sm: 32, md: 40, lg: 48, xl: 56 },
  iconButton: 36,
  headerHeight: 56,
  tabBarHeight: 44,
  searchBarHeight: 40,
  inputBarHeight: 52,
  chatListItemHeight: 72,
  nodeCardSize: 100,
} as const;

// ─── Typography (raw pt values) ──────────────────
export const typography = {
  fontSize: {
    caption: 12,
    body: 15,
    subhead: 17,
    title: 20,
    largeTitle: 28,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

// ─── Colors ──────────────────────────────────────
export const colors = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceLight: "#FFFFFF",
  surfaceMid: "#F0F0F0",
  primary: "#2AABEE",
  primaryLight: "#33BFFF",
  textPrimary: "#000000",
  textSecondary: "#8E8E93",
  textTertiary: "#C7C7CC",
  online: "#4CAF50",
  sentBubble: "#EFFDDE",
  receivedBubble: "#FFFFFF",
  unreadBadge: "#2AABEE",
  tabUnderline: "#2AABEE",
  border: "#E5E5E5",
  overlay: "rgba(0,0,0,0.3)",
} as const;

// ─── Screen-relative helpers ─────────────────────
export const vh = (percent: number): number =>
  Math.round(SCREEN_HEIGHT * (percent / 100));

export const vw = (percent: number): number =>
  Math.round(SCREEN_WIDTH * (percent / 100));

// ─── Status bar ──────────────────────────────────
export const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 50 : (StatusBar.currentHeight ?? 0);

export { SCREEN_WIDTH, SCREEN_HEIGHT };
