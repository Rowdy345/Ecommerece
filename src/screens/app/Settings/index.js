import React, { useContext, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View,TouchableOpacity ,Modal} from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import EditableBox from '../../../components/EditableBox';
import Button from '../../../components/Button';
import { ProfileContext, UserContext } from '../../../../App';
import { updateProfile } from '../../../utils/backendCalls';

import Input from '../../../components/Input';
import { Picker } from '@react-native-picker/picker';

const Settings = ({ navigation }) => {
    const [editing, setEditing] = useState(false);
    const { profile, setProfile } = useContext(ProfileContext);
    const [values, setValues] = useState({ _id: profile?._id, name: profile?.name, email: profile?.email });

    const [checked, setChecked] = useState(false);
  
    const { setUser } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
 

    const onEditPress = () => {
        setEditing(true);
    };

    const onSave = async () => {
        try {
            if (!values?.firstname || !values?.lastname || !values?.email || !values?.city || !values?.street || !values?.zipcode || !values?.phone) {
                Alert.alert('All fields are required');
                return;
            }

            const userData = {
                email: values.email,
                username: values.email.split('@')[0],
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

            setUser({ ...userData });
            setEditing(false);
            Alert.alert('Profile updated successfully!');
            return;
        } catch (error) {
            console.log('error :>> ', error);
        }
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onItemPress = () => {
        Linking.openURL('https://google.com');
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
       <Header showBack onBackPress={goBack} title='Settings' />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <Pressable onPress={onEditPress}>
                    <Image style={styles.icon} source={require('../../../assets/edit.png')} />
                </Pressable>
            </View>
            <Input label='First Name' value={profile?.name?.firstname} onChangeText={v => onChange('firstname', v)} editable={editing} />
            <Input label='Last Name' value={profile?.name?.lastname} onChangeText={v => onChange('lastname', v)} editable={editing} />
            <Input label='Email' value={values.email} onChangeText={v => onChange('email', v)} editable={editing} />
            <Input label='Phone' value={values.phone} onChangeText={v => onChange('phone', v)} editable={editing} />
            <Input label='City' value={values.city} onChangeText={v => onChange('city', v)} editable={editing} />
            <Input label='Street' value={values.street} onChangeText={v => onChange('street', v)} editable={editing} />
            <Input label='Zipcode' value={values.zipcode} onChangeText={v => onChange('zipcode', v)} editable={editing} />
            
            <Text style={styles.label}>Country</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton} disabled={!editing}>
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
                        <Button title='Close' onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            
            {editing && <Button style={styles.button} onPress={onSave} title='Save'/>}
        </ScrollView>
    </SafeAreaView>
    );
};

export default React.memo(Settings);
