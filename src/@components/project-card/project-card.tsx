import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import SwipeableViews from 'react-swipeable-views';

import cn from 'classnames';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import Avatar from '@components/Avatar';
import TooltipBig from '@components/TooltipBig';

import { CARD_COLOR, LOGO_TYPE } from './consts';
import CommentSvg from './icons/comment';
import ContributingSvg from './icons/contributing';
import MaskSvg from './icons/mask';
import TeamSvg from './icons/team';
import ValueSvg from './icons/value';
import PieBlackPng from './pie/pie_v1/pie_black.png';
import PieBluePng from './pie/pie_v1/pie_blue.png';
import PieGreenPng from './pie/pie_v1/pie_green.png';
import PieVioletPng from './pie/pie_v1/pie_violet.png';
import PieBlackPngV2 from './pie/pie_v2/pie_black_v2.svg';
import PieBluePngV2 from './pie/pie_v2/pie_blue_v2.svg';
import PieGreenPngV2 from './pie/pie_v2/pie_green_v2.svg';
import PieVioletPngV2 from './pie/pie_v2/pie_violet_v2.svg';

const SIZE = {
  CURSOR: 4,
  HEIGHT: 440,
  LOGO: 86,
  LOGO_IMG: 64,
  LOGO_IMG_V2: 76,
  WIDTH: 300,
};

enum TAB {
  PROJECT,
  MEMBER,
}

const MAP_CARD_IMG = {
  [LOGO_TYPE.ANGLE]: {
    [CARD_COLOR.BLACK]: PieBlackPng,
    [CARD_COLOR.BLUE]: PieBluePng,
    [CARD_COLOR.GREEN]: PieGreenPng,
    [CARD_COLOR.VIOLET]: PieVioletPng,
  },
  [LOGO_TYPE.ROUND]: {
    [CARD_COLOR.BLACK]: PieBlackPngV2,
    [CARD_COLOR.BLUE]: PieBluePngV2,
    [CARD_COLOR.GREEN]: PieGreenPngV2,
    [CARD_COLOR.VIOLET]: PieVioletPngV2,
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  cardStyle: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    boxShadow: '0 10px 20px #f1f2f6, -10px 0 20px #f1f2f6',
    height: SIZE.HEIGHT,
    width: SIZE.WIDTH,
  },
  commentStyle: {
    '& > svg': {
      color: theme.palette.primary.main,
    },
    position: 'absolute',
    right: 10,
    top: -14,
    zIndex: 1,
  },
  digitStyle: {
    color: theme.palette.default.main,
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    fontWeight: 700,
  },
  header: {
    height: 182,
    position: 'relative',
  },
  iconStyle: {
    '& > svg': {
      fontSize: 16,
    },
    color: '#c5c5c5',
    minWidth: 30,
  },
  listStyle: {
    marginTop: 11,
  },
  listText: {
    color: '#232323',
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
  },
  logoWrap: {
    '& > img': {
      borderRadius: '50%',
      height: SIZE.LOGO_IMG,
      width: SIZE.LOGO_IMG,
    },
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    height: SIZE.LOGO,
    justifyContent: 'center',
    position: 'absolute',
    width: SIZE.LOGO,
  },
  logoWrapAngle: {
    left: 158,
    top: 17,
  },
  logoWrapRound: {
    '& > img': {
      boxShadow: theme.shadows[3],
      height: SIZE.LOGO_IMG_V2,
      width: SIZE.LOGO_IMG_V2,
    },
    backgroundColor: 'transparent',
    left: `calc(50% - ${SIZE.LOGO / 2}px)`,
    top: 71,
  },
  tabRoot: {
    '&:nth-child(2)': {
      marginLeft: 2,
    },
    borderBottom: `1px solid rgba(216, 216, 216, .4)`,
    fontSize: 12,
    minHeight: 44,
    minWidth: 149,
  },
  tabRootSingle: {
    cursor: 'auto',
    minWidth: 300,
  },
  tabsFlexContainer: {
    paddingBottom: SIZE.CURSOR,
  },
  tabsIndicator: {
    '&:after': {
      borderLeft: `${SIZE.CURSOR}px solid transparent`,
      borderRight: `${SIZE.CURSOR}px solid transparent`,
      borderTop: `${SIZE.CURSOR}px solid ${theme.palette.secondary.dark}`,
      clear: 'both',
      content: '""',
      height: 0,
      left: `calc(50% - ${SIZE.CURSOR / 2}px)`,
      position: 'absolute',
      top: '0px',
      width: 0,
    },
    height: 1,
    marginBottom: 4,
  },
  tabsWrap: {
    marginTop: 6,
    position: 'relative',
  },
  titleWrap: {
    alignItems: 'center',
    display: 'flex',
    height: 80,
    justifyContent: 'center',
    padding: '3px 10px',
    textAlign: 'center',
  },
  valueLabel: {
    '& > span': {
      marginRight: 8,
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ padding: '0 8px' }}>{children}</Box>}
    </div>
  );
}

interface IProps {
  color: CARD_COLOR;
  logoSrc?: string;
  logoVariant?: 'angle' | 'round';
  membersCount: number;
  title: string;
  userInfo?: {
    displayName: string;
    logoSrc?: string;
    mainRole: string;
    message?: string;
    shortName?: string;
    value: number;
  };
  value: number;
}

export const ProjectCardTsx: React.FC<IProps> = ({
  color,
  logoSrc,
  logoVariant = LOGO_TYPE.ANGLE,
  membersCount,
  title,
  userInfo,
  value,
}): JSX.Element => {
  const isMember = useMemo(() => Boolean(userInfo), [userInfo]);

  const headerSrc = useMemo(() => MAP_CARD_IMG[logoVariant][color], [color, logoVariant]);

  const [curTab, setCurTab] = useState<TAB>(TAB.PROJECT);
  const changeTab = useCallback(
    (_, tab) => {
      setCurTab(tab);
    },
    [setCurTab]
  );
  const handleChangeIndex = useCallback(
    nextTab => {
      setCurTab(nextTab);
    },
    [setCurTab]
  );

  const theme = useTheme();
  const {
    cardStyle,
    commentStyle,
    digitStyle,
    header,
    iconStyle,
    listStyle,
    listText,
    logoWrap,
    logoWrapAngle,
    logoWrapRound,
    tabRoot,
    tabRootSingle,
    tabsFlexContainer,
    tabsIndicator,
    tabsWrap,
    titleWrap,
    valueLabel,
  } = useStyles();

  const tabs = useMemo(() => {
    const tabsLocal: any = [
      {
        id: TAB.PROJECT,
        label: 'Инфо',
        // tooltip: `Информация о проекте`,
      },
    ];
    if (isMember) {
      tabsLocal.push({
        id: TAB.MEMBER,
        label: (
          <div className={valueLabel}>
            <span>Вклад</span>
            <Avatar size="sm" src={userInfo?.logoSrc}>
              {userInfo?.shortName}
            </Avatar>
          </div>
        ),
        tooltip: (userInfo?.displayName || 'N/A') + ' вклад',
      });
    }
    return tabsLocal;
  }, [isMember, userInfo, valueLabel]);

  const { formatNumber } = useIntl();

  return (
    <div className={cardStyle}>
      <div className={header}>
        <img src={headerSrc} alt="Card Pie Colored Header" />
        <div
          className={cn(logoWrap, {
            [logoWrapAngle]: logoVariant === LOGO_TYPE.ANGLE,
            [logoWrapRound]: logoVariant === LOGO_TYPE.ROUND,
          })}
        >
          <img src={logoSrc || `${process.env.PUBLIC_URL}/logo_patreon.png`} alt={`${title} logo`} />
        </div>
      </div>
      <div className={titleWrap}>
        <Typography variant="h5">{title}</Typography>
      </div>
      <div className={tabsWrap}>
        <Tabs
          classes={{ flexContainer: tabsFlexContainer, indicator: tabsIndicator }}
          value={curTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={changeTab}
          aria-label="Project Info"
        >
          {tabs.map(({ id, label, tooltip }, index) => {
            const tooltipDisabled = !tooltip;
            return (
              <TooltipBig
                key={id}
                title={tooltip || ''}
                placement="top"
                disableFocusListener={tooltipDisabled}
                disableHoverListener={tooltipDisabled}
                disableTouchListener={tooltipDisabled}
              >
                <Tab
                  disableRipple={!isMember}
                  classes={{ root: cn(tabRoot, { [tabRootSingle]: !isMember }) }}
                  value={index}
                  label={label}
                />
              </TooltipBig>
            );
          })}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={curTab}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={curTab} index={TAB.PROJECT} dir={theme.direction}>
            <List className={listStyle} component="nav" aria-label="Информация о проекте">
              <ListItem button>
                <ListItemIcon className={iconStyle}>
                  <TeamSvg color="inherit" fontSize="small" />
                </ListItemIcon>
                <span className={listText}>Участников</span>
                <ListItemSecondaryAction className={digitStyle}>{formatNumber(membersCount)}</ListItemSecondaryAction>
              </ListItem>
              <ListItem button>
                <ListItemIcon className={iconStyle}>
                  <ValueSvg color="inherit" fontSize="small" />
                </ListItemIcon>
                <span className={listText}>Ценность проекта</span>
                <ListItemSecondaryAction className={digitStyle}>
                  {formatNumber(value * 50, {
                    currency: 'USD',
                    style: 'currency',
                  })}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </TabPanel>
          <TabPanel value={curTab} index={TAB.MEMBER} dir={theme.direction}>
            {userInfo && (
              <List className={listStyle} component="nav" aria-label="Пользовательский вклад">
                <ListItem button>
                  <ListItemIcon className={iconStyle}>
                    <MaskSvg color="inherit" fontSize="small" />
                  </ListItemIcon>
                  <span className={listText}>Роль</span>
                  <ListItemSecondaryAction className={digitStyle}>{userInfo.mainRole}</ListItemSecondaryAction>
                </ListItem>
                <ListItem button>
                  <ListItemIcon className={iconStyle}>
                    <ContributingSvg color="inherit" fontSize="small" />
                  </ListItemIcon>
                  <span className={listText}>Вклад в проект</span>
                  <ListItemSecondaryAction className={digitStyle}>
                    {formatNumber(userInfo.value * 50, {
                      currency: 'USD',
                      style: 'currency',
                    })}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            )}
          </TabPanel>
        </SwipeableViews>
        {isMember && Boolean(userInfo?.message) && (
          <TooltipBig title={(userInfo?.displayName || 'N/A') + ' мнение'} placement="top">
            <IconButton className={commentStyle}>
              <CommentSvg color="primary" />
            </IconButton>
          </TooltipBig>
        )}
      </div>
    </div>
  );
};
