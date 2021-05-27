import { Animated } from 'react-native';

export const fadeTo = (value, to, during = 1000, native = true) => {
  Animated.timing(value, {
    toValue: to,
    duration: during,
    useNativeDriver: native,
  }).start();
};

export const fadeLoop = (value, from, to, during = 1000, native = true) => {
  const loopOnce = () => {
    fadeTo(value, to, during, native);
    setTimeout(() => {
      fadeTo(value, from, during, native);
    }, during);
  };
  loopOnce();
  return setInterval(loopOnce, during * 2);
};
