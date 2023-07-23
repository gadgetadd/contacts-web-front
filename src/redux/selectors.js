export const selectNameFilter = state => state.filter.name;

export const selectFavoritesFilter = state => state.filter.favorites;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsAuth = state => state.auth.isAuth

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectError = state => state.auth.error;

export const selectIsDrawerOpen = state => state.modal.isDrawerOpen;

export const selectIsDialogOpen = state => state.modal.isDialogOpen;

export const selectDrawerVariant = state => state.modal.variant;

export const selectIdToEdit = state => state.modal.idToEdit;








