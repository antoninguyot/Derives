import PropTypes from 'prop-types';
import {
  Modal,
  SafeAreaView, ScrollView, Text,
} from 'react-native';
import React from 'react';
import i18n from 'i18n-js';
import styles from '../../App.css';
import Person from './Person';
import CloseIcon from './CloseIcon';

const CreditsModal = ({ close, visible }) => (
  <Modal
    animationType="slide"
    transparent
    visible={visible}
  >
    <SafeAreaView style={styles.containerCredits}>
      <ScrollView>
        <Text style={[styles.textTitleW, { marginVertical: 15 }]}>Crédits</Text>
        <Person
          image={require('../../assets/images/team/serge.jpg')}
          name="Serge Bouchardon"
          description={i18n.t('credits.serge')}
        />
        <Person
          image={require('../../assets/images/team/marine.jpg')}
          name="Marine Riguet"
          description={i18n.t('credits.marine')}
        />
        <Person
          image={require('../../assets/images/team/herve.jpg')}
          name="Hervé Zenouda"
          description={i18n.t('credits.herve')}
        />
        <Person
          image={require('../../assets/images/team/erika.jpg')}
          name="Erika Fülöp"
          description={i18n.t('credits.erika')}
        />
        <Person
          image={require('../../assets/images/team/bg.jpeg')}
          name="Augustin de Laubier"
          description={i18n.t('credits.augustin')}
        />
        <Person
          image={require('../../assets/images/team/maylis.jpg')}
          name="Maylis de Talhouet"
          description={i18n.t('credits.maylis')}
        />
        <Person
          image={require('../../assets/images/team/antonin.jpeg')}
          name="Antonin Guyot"
          description={i18n.t('credits.antonin')}
        />
        <Person
          image={require('../../assets/images/team/charles.jpeg')}
          name="Charles Fiers"
          description={i18n.t('credits.charles')}
        />
        <Person
          image={require('../../assets/images/team/cecile.jpg')}
          name="Cécile Asselin"
          description={i18n.t('credits.cecile')}
        />
      </ScrollView>
      <CloseIcon onPress={close} />
    </SafeAreaView>
  </Modal>
);

CreditsModal.propTypes = {
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreditsModal;
