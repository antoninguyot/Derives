import { Animated, View } from 'react-native';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../App.css';
import CCamera from './CCamera';
import { combine, getTextArray, getTextTitle } from '../Helpers/text';

const TextPoem = ({
  moment,
  stropheIndex,
  fontOpacity,
  fontSize,
  walking,
  localityType,
  weather,
  season,
  isReadyToPlay,
}) => {
  const text = getTextArray(moment);
  const relevantText = walking ? text.acceleration : text.stable;
  let strophe;

  if (isReadyToPlay) {
    strophe = relevantText[stropheIndex].map(
      (vers) => combine(vers, localityType, weather, season),
    );
  } else {
    strophe = [getTextTitle(moment)];
  }

  return (
    <>
      <View style={styles.containerCamera}>
        <CCamera />
      </View>
      <View style={styles.containerText}>
        <Animated.View style={{ opacity: fontOpacity }}>
          <Animated.Text style={[styles.textVers, { fontSize }]}>
            {strophe.join('\n')}
          </Animated.Text>
        </Animated.View>
      </View>
    </>
  );
};

TextPoem.propTypes = {
  moment: PropTypes.string.isRequired,
  stropheIndex: PropTypes.number.isRequired,
  fontOpacity: PropTypes.object,
  fontSize: PropTypes.object,
  walking: PropTypes.bool.isRequired,
  localityType: PropTypes.string,
  weather: PropTypes.string,
  season: PropTypes.string,
  isReadyToPlay: PropTypes.bool.isRequired,
};

export default React.memo(TextPoem,
  (props, nextProps) => (props.stropheIndex === nextProps.stropheIndex));
