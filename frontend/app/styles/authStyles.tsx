import { StyleSheet } from 'react-native';
import { baseStyles, designSystem } from './baseStyles';

const { colors, spacing } = designSystem;

export const authStyles = StyleSheet.create({
  container: baseStyles.container,
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.light,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.md,
  },
  title: {
    ...baseStyles.title,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray700,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  input: baseStyles.input,
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'right',
    marginTop: -spacing.xs,
    marginBottom: spacing.md,
  },
  button: baseStyles.button,
  buttonText: baseStyles.buttonText,
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  dividerText: {
    color: colors.gray600,
    paddingHorizontal: spacing.sm,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: spacing.xl,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    ...designSystem.shadows.small,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  linkText: {
    color: colors.gray700,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});