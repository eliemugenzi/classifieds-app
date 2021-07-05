import DIMENSIONS from '../../utils/dimensions';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import styles from './styles';

interface Props {
  top: number;
  extra?: React.ReactNode;
  bottom?: React.ReactNode;
  hasBadge: boolean[];
  onTabPress?: (index: number) => void;
}

const TabBar: React.FC<MaterialTopTabBarProps & Props> = ({
  top,
  extra,
  bottom,
  hasBadge,
  onTabPress,
  ...props
}) => {
  const [animTop] = React.useState(new Animated.Value(top));
  const [animLeft] = React.useState(
    new Animated.Value(DIMENSIONS.padding),
  );
  const [animRight] = React.useState(
    new Animated.Value(DIMENSIONS.padding),
  );
  const [animElevation] = React.useState(new Animated.Value(0));
  const [animShadowOpacity] = React.useState(new Animated.Value(0));
  const [animOpacity] = React.useState(new Animated.Value(0));

  const [scView, setScView] = React.useState<ScrollView | null>(null);

  const [noShadow, setNoShadow] = React.useState(true);

  const [dataSourceCords, setDataSourceCords] = React.useState<
    number[]
  >([]);

  React.useEffect(() => {
    Animated.timing(animTop, {
      toValue: noShadow ? top : 0,
      duration: 300,
      easing: Easing.ease,
    }).start();
  }, [noShadow, animTop, top]);

  React.useEffect(() => {
    Animated.timing(animLeft, {
      toValue: noShadow ? DIMENSIONS.padding : 0,
      duration: 400,
      easing: Easing.ease,
    }).start();
  }, [noShadow, animLeft, top]);

  React.useEffect(() => {
    Animated.timing(animRight, {
      toValue: noShadow ? DIMENSIONS.padding : 0,
      duration: 400,
      easing: Easing.ease,
    }).start();
  }, [noShadow, animRight, top]);

  React.useEffect(() => {
    Animated.timing(animElevation, {
      toValue: noShadow ? 0 : 20,
      duration: 400,
      easing: Easing.ease,
    }).start();
  }, [noShadow, animElevation, top]);

  React.useEffect(() => {
    Animated.timing(animShadowOpacity, {
      toValue: noShadow ? 0 : 0.2,
      duration: 400,
      easing: Easing.ease,
    }).start();
  }, [noShadow, animShadowOpacity, top]);

  React.useEffect(() => {
    Animated.timing(animOpacity, {
      toValue: noShadow ? 0 : 1,
      duration: 400,
      easing: Easing.ease,
    }).start();
  }, [noShadow, animOpacity, top]);

  return (
    <>
      <Animated.View
        style={[
          styles.wrapper,
          {
            top: animTop,
            left: animLeft,
            right: animRight,
            elevation: animElevation,
            shadowOpacity: animShadowOpacity,
          },
        ]}>
        <Animated.View
          style={[styles.backdrop, { opacity: animOpacity }]}
        />
        <ScrollView
          ref={(_ref) => setScView(_ref)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.wrapperContent}>
          {Object.values(props.descriptors).map(
            (descriptor, index, descriptors) => {
              const isFocused = props.state.index === index;

              const label =
                descriptor.options.tabBarLabel !== undefined
                  ? descriptor.options.tabBarLabel
                  : descriptor.options.title !== undefined
                  ? descriptor.options.title
                  : props.state.routes[index].name;

              const {
                scrollView,
                scrollOffset,
              } = descriptor.options as any;

              const scrollTop = () => {
                if (scrollView && scrollView.current) {
                  scrollView.current._component.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                  });
                  setNoShadow(true);
                }
              };

              if (scrollOffset) {
                const ns = scrollOffset < DIMENSIONS.padding * 2;
                if (ns !== noShadow) setNoShadow(ns);
              }

              const onPress = () => {
                if (onTabPress) onTabPress(index);
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: props.state.routes[index].key,
                  canPreventDefault: true,
                });

                scrollTop();

                if (scView)
                  scView.scrollTo({
                    x: dataSourceCords[index] - DIMENSIONS.padding,
                  });

                if (!isFocused && !event.defaultPrevented)
                  props.navigation.navigate(
                    props.state.routes[index].name,
                  );
              };

              const onLongPress = () => {
                props.navigation.emit({
                  type: 'tabLongPress',
                  target: props.state.routes[index].key,
                });
              };

              return (
                <TouchableOpacity
                  key={index}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    const newCords = dataSourceCords;
                    newCords[index] = layout.x;
                    setDataSourceCords(newCords);
                  }}
                  style={[
                    styles.tabStyle,
                    isFocused && styles.tabStyleActive,
                    index + 1 === descriptors.length &&
                      styles.tabStyleLast,
                  ]}>
                  <Text
                    style={[
                      styles.labelStyle,
                      isFocused && styles.labelStyleActive,
                    ]}>
                    {label}
                  </Text>
                  {hasBadge[index] && <View style={styles.badge} />}
                </TouchableOpacity>
              );
            },
          )}
        </ScrollView>
        {bottom}
      </Animated.View>
      {noShadow && extra}
    </>
  );
};

export default TabBar;
