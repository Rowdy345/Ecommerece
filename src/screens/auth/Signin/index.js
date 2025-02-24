import React, { useContext, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../../utils/backendCalls';
import { UserContext } from '../../../../App';

const Signin = ({ navigation }) => {
    const [values, setValues] = useState({});
    const { setUser } = useContext(UserContext);

    const onSignUp = () => {
        navigation.navigate('Signup');
    };

    const onBack = () => {
        navigation.goBack();
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onSubmit = async () => {
        const token = await login(values);

        setUser({ token });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <AuthHeader onBackPress={onBack} title='Sign In' />

                <Input value={values.username} onChangeText={v => onChange('username', v)} label='User Name' Text='mor_2314' placeholder='mor_2314' />
                <Input value={values.password} onChangeText={v => onChange('password', v)} isPassword text='83r5^_' label='Password' placeholder='*******' />

                <Button onPress={onSubmit} style={styles.button} title='Sign In' />
                <Text style={styles.footerText}>
                    Don't have an account?
                    <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default React.memo(Signin);
