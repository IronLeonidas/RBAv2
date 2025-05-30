import { StyleSheet } from 'react-native';
import { designSystem } from './baseStyles';

const { colors, spacing } = designSystem;

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.xl,
    maxWidth: '80%',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  spinner: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  loadingText: {
    color: colors.gray600,
    fontSize: 14,
  },
  animation: {
    width: 250,
    height: 250,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});