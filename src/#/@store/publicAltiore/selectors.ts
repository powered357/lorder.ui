import get from 'lodash/get';
import { createSelector } from 'reselect';

import { IPublicProject, IState } from '@types';

export const publicAltioreData = (state: IState): IPublicProject => state.publicAltiore;

export const isPublicAltioreLoaded = createSelector(
  publicAltioreData,
  s => s.isLoaded
);

export const isPublicAltioreLoading = createSelector(
  publicAltioreData,
  s => s.isLoading
);

export const altioreStatistic = createSelector(
  publicAltioreData,
  s => s.statistic
);

export const altioreMembers = createSelector(
  altioreStatistic,
  s => get(s, 'members', [])
);