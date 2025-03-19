import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SmartBandService } from '../../../../core/services/smart-band.service';
import * as SmartBandActions from './smart-band.actions';

@Injectable()
export class SmartBandEffects {
  loadSmartBands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SmartBandActions.loadSmartBands),
      switchMap(() =>
        this.smartBandService.getAllBands().pipe(
          map(bands => SmartBandActions.loadSmartBandsSuccess({ bands })),
          catchError(error => of(SmartBandActions.loadSmartBandsFailure({ error: error.message })))
        )
      )
    )
  );

  loadSmartBandsByGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SmartBandActions.loadSmartBandsByGroup),
      switchMap(({ groupName }) =>
        this.smartBandService.getBandsByGroup(groupName).pipe(
          map(bands => SmartBandActions.loadSmartBandsByGroupSuccess({ bands })),
          catchError(error => of(SmartBandActions.loadSmartBandsByGroupFailure({ error: error.message })))
        )
      )
    )
  );

  loadSmartBand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SmartBandActions.loadSmartBand),
      switchMap(({ id }) =>
        this.smartBandService.getBandById(id).pipe(
          map(band => SmartBandActions.loadSmartBandSuccess({ band })),
          catchError(error => of(SmartBandActions.loadSmartBandFailure({ error: error.message })))
        )
      )
    )
  );

  createSmartBand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SmartBandActions.createSmartBand),
      switchMap(({ band }) =>
        this.smartBandService.createBand(band).pipe(
          map(newBand => SmartBandActions.createSmartBandSuccess({ band: newBand })),
          catchError(error => of(SmartBandActions.createSmartBandFailure({ error: error.message })))
        )
      )
    )
  );

  updateSmartBand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SmartBandActions.updateSmartBand),
      switchMap(({ id, band }) =>
        this.smartBandService.updateBand(id, band).pipe(
          map(updatedBand => SmartBandActions.updateSmartBandSuccess({ band: updatedBand })),
          catchError(error => of(SmartBandActions.updateSmartBandFailure({ error: error.message })))
        )
      )
    )
  );

  deleteSmartBand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SmartBandActions.deleteSmartBand),
      switchMap(({ id }) =>
        this.smartBandService.deleteBand(id).pipe(
          map(() => SmartBandActions.deleteSmartBandSuccess({ id })),
          catchError(error => of(SmartBandActions.deleteSmartBandFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private smartBandService: SmartBandService
  ) {}
}
