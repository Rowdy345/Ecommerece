import React from 'react';
import { Text, Image, View, Pressable } from 'react-native';
import Button from '../../../components/Button';
import { styles } from './styles';

const Splash = ({ navigation }) => {
    const onSignup = () => {
        navigation.navigate('Signup');
    };

    const onSignin = () => {
        navigation.navigate('Signin');
    };

    return (
        <View style={styles.container}>
           
            <View style={styles.buttonCont}>
                <Button onPress={onSignup} title='Sign Up' />
            </View>

            <Pressable onPress={onSignin} hitSlop={10}>
                <Text style={styles.footerText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default React.memo(Splash);
