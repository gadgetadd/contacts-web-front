export const selectNameFilter = state => state.filter.name;

export const selectFavoritesFilter = state => state.filter.favorites;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsAuth = state => state.auth.isAuth

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectError = state => state.auth.error;

export const selectIsFormOpen = state => state.modal.isFormOpen;

export const selectIsFormEdited = state => state.modal.isFormEdited;

export const selectFormVariant = state => state.modal.formVariant;

export const selectIdToEdit = state => state.modal.idToEdit;









