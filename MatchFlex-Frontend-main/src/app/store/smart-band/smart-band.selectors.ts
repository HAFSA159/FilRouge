import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SmartBandState } from '../../shared/models/smart-band.model';

export const selectSmartBandState = createFeatureSelector<SmartBandState>('smartBands');

export const selectAllSmartBands = createSelector(
  selectSmartBandState,
  (state: SmartBandState) => state.bands
);

export const selectSelectedSmartBand = createSelector(
  selectSmartBandState,
  (state: SmartBandState) => state.selectedBand
);

export const selectSmartBandLoading = createSelector(
  selectSmartBandState,
  (state: SmartBandState) => state.loading
);

export const selectSmartBandError = createSelector(
  selectSmartBandState,
  (state: SmartBandState) => state.error
);

export const selectInStockSmartBands = createSelector(
  selectAllSmartBands,
  bands => bands.filter(band => band.inStock)
);

export const selectSmartBandsSortedByPrice = createSelector(
  selectAllSmartBands,
  bands => [...bands].sort((a, b) => a.price - b.price)
);

export const selectSmartBandsSortedByRating = createSelector(
  selectAllSmartBands,
  bands => [...bands].sort((a, b) => b.rating - a.rating)
);
