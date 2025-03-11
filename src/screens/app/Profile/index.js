import React, { useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import Button from '../../../components/Button';
import { getProfile } from '../../../utils/backendCalls';
import { ProfileContext } from '../../../../App';

const Profile = ({ navigation }) => {
    const num = 10;
    const { profile, setProfile } = useContext(ProfileContext);

    useEffect(() => {
        (async () => {
            const data = await getProfile();

            setProfile(data);
        })();
    }, []);

    const onLogout = () => {
        navigation.navigate('Signin');
    };

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const onMyListingsPress = () => {
        navigation.navigate('MyListings');
    };

    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='Profile' showLogout onLogout={onLogout} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.name}>{profile?.name?.firstname+" "+profile?.name?.lastname}</Text>
                    <Text style={styles.email}>{profile?.email}</Text>

                    <ListItem onPress={onMyListingsPress} title='My Cart' subtitle={`You have ${num} Products`} />
                    <ListItem onPress={onSettingsPress} title='Settings' subtitle='Account' />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default React.memo(Profile);
