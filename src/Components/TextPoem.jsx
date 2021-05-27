import { Animated, View } from 'react-native';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from '../../App.css';
import CCamera from './CCamera';
import { combine, getTextArray } from '../Helpers/text';
import { calculateMoment } from '../Helpers/time';

const TextPoem = ({
  stropheIndex,
  fontOpacity,
  fontSize,
  walking,
  localityType,
  weather,
  season,
  isReadyToPlay,
}) => {
  const moment = calculateMoment();
  const text = getTextArray(moment);
  const relevantText = walking ? text.acceleration : text.stable;
  let strophe;

  if (isReadyToPlay) {
    strophe = relevantText[stropheIndex].map(
      (vers) => combine(vers, localityType, weather, season),
    );
  } else if (moment === 'nuit') {
    strophe = ['Dérive de la nuit'];
  } else {
    strophe = [`Dérive du ${moment}`];
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
  stropheIndex: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  fontOpacity: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  fontSize: PropTypes.object,
  walking: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  localityType: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  weather: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  season: PropTypes.string,
  isReadyToPlay: PropTypes.bool.isRequired,
};

export default React.memo(TextPoem,
  (props, nextProps) => (props.stropheIndex === nextProps.stropheIndex));
