import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ChangedCellTsx } from '@components/ChangedCell';
import { mapEnum } from '@store/@common/helpers';
import { ACCESS_LEVEL, updateProjectMemberAccessLevel } from '@store/projects';
import { routeProjectId } from '@store/router';

const getAccessLevels = () =>
  mapEnum(ACCESS_LEVEL, (accessLevel: number) => ({
    icon: '',
    label: ACCESS_LEVEL[accessLevel],
    value: accessLevel,
  }));

const mapStateToProps = createStructuredSelector({
  items: getAccessLevels,
  projectId: routeProjectId,
} as any);

const mapDispatchToProps = {
  updateProjectMemberAccessLevel,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { updateProjectMemberAccessLevel, ...restDispatch }: any,
  { memberId, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
  changeValue: ([{ value }]: any) => updateProjectMemberAccessLevel({ projectId, memberId, accessLevel: value }),
});

export const ChangedCell = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChangedCellTsx);