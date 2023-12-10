import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;
export const selectError = state => state.console.error;
export const selectIsLoading = state => state.isLoading;

export const selectFilteredConyacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
    }
);
