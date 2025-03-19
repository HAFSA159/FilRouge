import { createAction, props } from '@ngrx/store';
import { SmartBand } from '../../shared/models/smart-band.model';

// Load Smart Bands
export const loadSmartBands = createAction('[Smart Band] Load Smart Bands');
export const loadSmartBandsSuccess = createAction(
  '[Smart Band] Load Smart Bands Success',
  props<{ bands: SmartBand[] }>()
);
export const loadSmartBandsFailure = createAction(
  '[Smart Band] Load Smart Bands Failure',
  props<{ error: string }>()
);

// Load Smart Bands By Group
export const loadSmartBandsByGroup = createAction(
  '[Smart Band] Load Smart Bands By Group',
  props<{ groupName: string }>()
);
export const loadSmartBandsByGroupSuccess = createAction(
  '[Smart Band] Load Smart Bands By Group Success',
  props<{ bands: SmartBand[] }>()
);
export const loadSmartBandsByGroupFailure = createAction(
  '[Smart Band] Load Smart Bands By Group Failure',
  props<{ error: string }>()
);

// Load Single Smart Band
export const loadSmartBand = createAction(
  '[Smart Band] Load Smart Band',
  props<{ id: string }>()
);
export const loadSmartBandSuccess = createAction(
  '[Smart Band] Load Smart Band Success',
  props<{ band: SmartBand }>()
);
export const loadSmartBandFailure = createAction(
  '[Smart Band] Load Smart Band Failure',
  props<{ error: string }>()
);

// Create Smart Band
export const createSmartBand = createAction(
  '[Smart Band] Create Smart Band',
  props<{ band: Omit<SmartBand, 'id'> }>()
);
export const createSmartBandSuccess = createAction(
  '[Smart Band] Create Smart Band Success',
  props<{ band: SmartBand }>()
);
export const createSmartBandFailure = createAction(
  '[Smart Band] Create Smart Band Failure',
  props<{ error: string }>()
);

// Update Smart Band
export const updateSmartBand = createAction(
  '[Smart Band] Update Smart Band',
  props<{ id: string; band: Partial<SmartBand> }>()
);
export const updateSmartBandSuccess = createAction(
  '[Smart Band] Update Smart Band Success',
  props<{ band: SmartBand }>()
);
export const updateSmartBandFailure = createAction(
  '[Smart Band] Update Smart Band Failure',
  props<{ error: string }>()
);

// Delete Smart Band
export const deleteSmartBand = createAction(
  '[Smart Band] Delete Smart Band',
  props<{ id: string }>()
);
export const deleteSmartBandSuccess = createAction(
  '[Smart Band] Delete Smart Band Success',
  props<{ id: string }>()
);
export const deleteSmartBandFailure = createAction(
  '[Smart Band] Delete Smart Band Failure',
  props<{ error: string }>()
);

// Select Smart Band
export const selectSmartBand = createAction(
  '[Smart Band] Select Smart Band',
  props<{ band: SmartBand | null }>()
);
