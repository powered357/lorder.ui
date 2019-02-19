import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    background: {
      // background: 'url(/3a1d420f46.png)',
      background: 'url(/09ed844b43.png)',
      filter: 'blur(5px)',
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    background2: {
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    main: {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexGrow: 1,
      minHeight: '100%',
    },
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexGrow: 1,
      minHeight: '100%',
      position: 'relative',
    },
  });
