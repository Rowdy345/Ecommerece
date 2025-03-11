import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View , Modal, TouchableOpacity } from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signup } from '../../../utils/backendCalls';
import { UserContext } from '../../../../App';
import { Picker } from '@react-native-picker/picker';

const Signup = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});
    const { setUser } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);

    

    const onSignIn = () => {
        navigation.navigate('Signin');
    };

    const onBack = () => {
        navigation.goBack();
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onSubmit = async () => {
        try {
            if (!values?.firstname || !values?.email || !values?.password || !values?.confirmPassword) {
                Alert.alert('All fields are required');
                return;
            }

            if (values?.password !== values?.confirmPassword) {
                Alert.alert('Passwords do not match');
                return;
            }

            if (!checked) {
                Alert.alert('Please agree to the terms');
                return;
            }
            const userData = {
                email: values.email,
                username: values.email.split('@')[0],
                password: values.password,
                name: {
                    firstname: values.firstname,
                    lastname: values.lastname
                },
                address: {
                    city: values.city,
                    street: values.street,
                    number: values.number || 0,
                    zipcode: values.zipcode,
                    geolocation: {
                        lat: values.lat || '',
                        long: values.long || ''
                    }
                },
                phone: values.phone
            };

            const token = await signup(userData);
            setUser({ token });

           // Alert.alert('Sign Up is Successful, Please click on OK to Login');


            Alert.alert(
                  "Alert!",
                  "Sign Up is Successful, Please click on Login",
                  [
                    { text: "Login", onPress: () => handleOkPress() }
                  ]
                );
              const handleOkPress = () => {
              navigation.navigate('Signin')
              };

            console.log('token :>> ', token);



        } catch (error) {
            console.log('error :>> ', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
           <ScrollView contentContainerStyle={styles.scrollContainer}>
                <AuthHeader onBackPress={onBack} title='Sign Up' />

                <Input value={values.firstname} onChangeText={v => onChange('firstname', v)} label='First Name' placeholder='John' />
                <Input value={values.lastname} onChangeText={v => onChange('lastname', v)} label='Last Name' placeholder='Doe' />
                 <Input value={values.email} onChangeText={v => onChange('email', v)} label='E-mail' placeholder='pawan@gmail.com' />
                <Input value={values.password} onChangeText={v => onChange('password', v)} isPassword label='Password' placeholder='*******' />
                <Input value={values.confirmPassword} onChangeText={v => onChange('confirmPassword', v)} isPassword label='Confirm Password' placeholder='*******' />
                <Input value={values.phone} onChangeText={v => onChange('phone', v)} label='Phone' placeholder='1-570-236-7033' />
                <Input value={values.city} onChangeText={v => onChange('city', v)} label='City' placeholder='Kilcoole' />
                <Input value={values.street} onChangeText={v => onChange('street', v)} label='Street' placeholder='7835 new road' />
                <Input value={values.zipcode} onChangeText={v => onChange('zipcode', v)} label='Zipcode' placeholder='12926-3874' />
                <Text style={styles.label}>Country</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton}>
                    <Text>{values.country ? values.country : 'Select Country'}</Text>
                </TouchableOpacity>
                <Modal visible={modalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={values.country}
                                onValueChange={(v) => {
                                    onChange('country', v);
                                    setModalVisible(false);
                                }}
                            >
                                <Picker.Item label='Select Country' value='' />
                                <Picker.Item label='United States' value='US' />
                                <Picker.Item label='India' value='IN' />
                                <Picker.Item label='United Kingdom' value='UK' />
                                <Picker.Item label='Canada' value='CA' />
                            </Picker>
                        
                        </View>
                    </View>
                </Modal>
                <View style={styles.agreeRow}>
                    <Checkbox checked={checked} onCheck={setChecked} />
                    <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
                </View>

                <Button onPress={onSubmit} style={styles.button} title='Sign Up' />
                <Text style={styles.footerText}>
                    Already have an account?
                    <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

// {
//     email:'John@gmail.com',
//     username:'johnd',
//     password:'m38rmF$',
//     name:{
//         firstname:'John',
//         lastname:'Doe'
//     },
//     address:{
//         city:'kilcoole',
//         street:'7835 new road',
//         number:3,
//         zipcode:'12926-3874',
//         geolocation:{
//             lat:'-37.3159',
//             long:'81.1496'
//         }
//     },
//     phone:'1-570-236-7033'
// }

export default React.memo(Signup);
