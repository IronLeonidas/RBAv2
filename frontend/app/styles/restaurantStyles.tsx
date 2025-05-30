import { StyleSheet } from 'react-native';
import { baseStyles, designSystem } from './baseStyles';

const { colors, spacing, shadows } = designSystem;

export const restaurantStyles = StyleSheet.create({
  // Main containers
  container: {
    flexGrow: 1,
    backgroundColor: colors.light,
    paddingTop: spacing.md,
  },
  centered: baseStyles.centered,

  // Restaurant Detail View
  detailContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.light,
  },
  detailHeader: {
    marginBottom: spacing.lg,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  detailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  ratingText: {
    fontSize: 15,
    color: colors.gray700,
    marginLeft: spacing.xs,
  },
  cuisine: {
    fontSize: 15,
    color: colors.gray700,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  
  // Action Buttons
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: spacing.xs,
    ...shadows.small,
  },
  primaryAction: {
    backgroundColor: colors.primary,
  },
  secondaryAction: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  primaryActionText: {
    color: colors.white,
  },
  secondaryActionText: {
    color: colors.primary,
  },
  deleteButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    ...shadows.small,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // Restaurant List View
  listContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: 130,
  },
  title: {
    ...baseStyles.title,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    paddingLeft: 40,
    fontSize: 16,
    ...shadows.small,
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.md + 12,
    top: 12,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    marginLeft: spacing.sm,
    ...shadows.small,
  },
  
  // Restaurant Card
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: spacing.sm,
    overflow: 'hidden',
    ...shadows.medium,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardLocation: {
    fontSize: 14,
    color: colors.gray600,
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.gray700,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  cardCuisine: {
    fontSize: 13,
    color: colors.gray600,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.gray100,
    borderRadius: 12,
  },
  
  // Empty State
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyIcon: {
    marginBottom: spacing.md,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray600,
    textAlign: 'center',
    maxWidth: '70%',
  },
  
  // FAB (Floating Action Button)
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.large,
  },
  fabText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '300',
  },

  // Forms
  formContainer: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.light,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    color: colors.dark,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: spacing.lg,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray700,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  input: baseStyles.input,
  textArea: {
    height: 120,
    paddingTop: spacing.sm,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray400,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.dark,
  },
  submitButton: {
    ...baseStyles.button,
    marginTop: spacing.lg,
  },
  submitButtonText: baseStyles.buttonText,
  cancelButton: {
    marginTop: spacing.sm,
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: colors.gray700,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
