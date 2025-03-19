import { createReducer, on } from '@ngrx/store';
import { SmartBandState } from '../../shared/models/smart-band.model';
import * as SmartBandActions from './smart-band.actions';
export type { SmartBandState } from '../../shared/models/smart-band.model';

export const initialState: SmartBandState = {
  bands: [],
  selectedBand: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  // Load Smart Bands
  on(SmartBandActions.loadSmartBands, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SmartBandActions.loadSmartBandsSuccess, (state, { bands }) => ({
    ...state,
    bands,
    loading: false,
    error: null
  })),
  on(SmartBandActions.loadSmartBandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Smart Bands By Group
  on(SmartBandActions.loadSmartBandsByGroup, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SmartBandActions.loadSmartBandsByGroupSuccess, (state, { bands }) => ({
    ...state,
    bands,
    loading: false,
    error: null
  })),
  on(SmartBandActions.loadSmartBandsByGroupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Smart Band
  on(SmartBandActions.loadSmartBand, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SmartBandActions.loadSmartBandSuccess, (state, { band }) => ({
    ...state,
    selectedBand: band,
    loading: false,
    error: null
  })),
  on(SmartBandActions.loadSmartBandFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Smart Band
  on(SmartBandActions.createSmartBand, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SmartBandActions.createSmartBandSuccess, (state, { band }) => ({
    ...state,
    bands: [...state.bands, band],
    loading: false,
    error: null
  })),
  on(SmartBandActions.createSmartBandFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Smart Band
  on(SmartBandActions.updateSmartBand, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SmartBandActions.updateSmartBandSuccess, (state, { band }) => ({
    ...state,
    bands: state.bands.map(b => b.bandId === band.bandId ? band : b),
    selectedBand: state.selectedBand?.bandId === band.bandId ? band : state.selectedBand,
    loading: false,
    error: null
  })),
  on(SmartBandActions.updateSmartBandFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Smart Band
  on(SmartBandActions.deleteSmartBand, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SmartBandActions.deleteSmartBandSuccess, (state, { id }) => ({
    ...state,
    bands: state.bands.filter(band => String(band.bandId) !== String(id)),
    selectedBand: String(state.selectedBand?.bandId) === String(id) ? null : state.selectedBand,
    loading: false,
    error: null
  })),
  on(SmartBandActions.deleteSmartBandFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select Smart Band
  on(SmartBandActions.selectSmartBand, (state, { band }) => ({
    ...state,
    selectedBand: band
  }))
);
