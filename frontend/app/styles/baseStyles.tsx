import { Dimensions, StyleSheet } from 'react-native';

const colors = {
  primary: '#5E72E4',       // Modern blue as primary color
  secondary: '#11CDEF',     // Cyan as accent color
  success: '#2DCE89',       // Green for success states
  danger: '#F5365C',        // Red for errors/delete actions
  warning: '#FB6340',       // Orange for warnings
  info: '#1171EF',          // Light blue for info
  dark: '#212529',          // Near black for text
  muted: '#8898AA',         // Medium gray for secondary text
  light: '#F7FAFC',         // Almost white background
  white: '#FFFFFF',         // Pure white
  gray100: '#F6F9FC',       // Lightest gray
  gray200: '#E9ECEF',       // Light gray for borders/cards
  gray300: '#DEE2E6',       // Light-medium gray
  gray400: '#CED4DA',       // Medium-light gray for inputs
  gray600: '#8898AA',       // Medium gray
  gray700: '#525F7F',       // Medium-dark gray
  gray800: '#32325D',       // Dark gray 
  gray900: '#212529',       // Near black
} as const;

// App dimensions
const { width } = Dimensions.get('window');
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Text styles
const text = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.md,
  } as const,
  h2: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  h3: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray700,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: 16,
    color: colors.dark,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    color: colors.gray600,
  },
  small: {
    fontSize: 12,
    color: colors.gray600,
  }
};

// Shadow styles
const shadows = {
  small: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  }
};

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  title: {
    ...text.h1,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  
  // Inputs
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray400,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.dark,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
  },
  
  // Buttons
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginVertical: spacing.sm,
    ...shadows.small,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonOutlineText: {
    color: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  
  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.sm,
    ...shadows.medium,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.gray300,
    marginVertical: spacing.md,
  },
});

// Export system
export const designSystem = {
  colors,
  spacing,
  text,
  shadows
};
