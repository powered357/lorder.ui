import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addTaskTypeToProject } from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
import { filteredTaskTypes } from 'src/store/task-types/index';
import { ITaskTypesFormProps, TaskTypesFormJsx } from './TaskTypesForm';

const mapState = createStructuredSelector({
  filteredTaskTypes,
  projectId,
});

const mapDispatch = {
  addTaskTypeToProject,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { addTaskTypeToProject, ...restDispatch }: any,
  ownProps: any
) => ({
  addTaskType: (taskTypeId: number) => addTaskTypeToProject({ projectId, taskTypeId }),
  ...restState,
  ...restDispatch,
  ...ownProps,
});

const TaskTypesForm = connect(
  mapState,
  mapDispatch,
  mergeProps
)(TaskTypesFormJsx);

export { TaskTypesForm, ITaskTypesFormProps };