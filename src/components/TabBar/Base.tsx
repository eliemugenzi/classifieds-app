import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styles from './styles';
import BaseCard, { CardProps } from '../Card';
import TabBar from '.';

const Tab = createMaterialTopTabNavigator();

export const Card: React.FC<CardProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <BaseCard style={[styles.cardPadding, style]} {...props}>
      {children}
    </BaseCard>
  );
};
export interface Tab {
  name: string;
  component: React.FC;
  hasBadge?: boolean;
}

interface Props {
  tabs: Tab[];
  top?: number;
  params?: any;
  extra?: React.ReactNode;
  bottom?: React.ReactElement[];
}

const CardWithTabs: React.FC<Props> = ({
  tabs,
  top = 0,
  params = {},
  extra,
  bottom,
}) => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Tab.Navigator
        lazy
        swipeEnabled={false}
        tabBar={(props) => (
          <TabBar
            top={top}
            extra={extra}
            bottom={bottom && bottom[index]}
            onTabPress={(i) => setIndex(i)}
            hasBadge={[...tabs].reduce(
              (arr, tab) => [...arr, tab.hasBadge === true],
              [] as boolean[],
            )}
            {...props}
          />
        )}>
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{ title: tab.name }}
            initialParams={params}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default CardWithTabs;
