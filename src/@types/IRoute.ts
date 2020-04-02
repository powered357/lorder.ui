import { ComponentType } from 'react';

import { ACCESS_LEVEL } from '#/@store/projects';

export interface IRoute {
  access?: any;
  accessLevel?: ACCESS_LEVEL;
  component?: ComponentType | any;
  exact?: boolean;
  icon?: ComponentType | any;
  path: string;
  routes?: IRoute[];
  title?: string;
  redirect?: string;
  getReducers?: any;
  computedMatch?: any;
}
