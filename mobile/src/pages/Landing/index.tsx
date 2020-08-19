import React from "react";
import { View, Image, Text } from "react-native";

import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from './styles';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";

function Landing() {

    const { navigate } = useNavigation();

    function handleNavigateToGiveClasses() {
        navigate('GiveClasses');
    }

    function handleNavigateToStudy() {
        navigate('Study');
    }


    return (

        <View style={styles.container}>
            <Image
                source={landingImage}
                style={styles.banner}
            />
            <Text style={styles.title}>
                Seja bem-vindo {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigateToStudy} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClasses} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassIcon} />
                    <Text style={styles.buttonText}>Dar aula</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de 20 conexões!
                <Image source={heartIcon} />
            </Text>

        </View>
    );
}

export default Landing;