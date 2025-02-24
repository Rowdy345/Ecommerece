import React, { useContext } from 'react';
import { Alert,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import { ProfileContext, ServicesContext } from '../../../../App';
import { deleteService } from '../../../utils/backendCalls';

const MyListings = ({ navigation }) => {
    const { services, setServices } = useContext(ServicesContext);
    const { profile } = useContext(ProfileContext);
    const myServices = Array.isArray(services) ? services?.filter(service => service?.owner === profile?._id) : [];

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item });
        };

        const onRemove = async () => {
                    
                };
       const onIconPress = () => {
                   Alert.alert('Are you sure you want to remove this item from your Cart?', '', [{ text: 'Yes', onPress: onRemove }, { text: 'Cancel' }]);
               };
               
        return (
            <FavoriteItem onIconPress={onIconPress} icon={require('../../../assets/delete.png')}  {...item} />
        );
    };

    const goBack = () => navigation.goBack();

    return (
        <SafeAreaView>
            <Header title='My Cart' showBack onBackPress={goBack} />

            <FlatList data={myServices} renderItem={renderItem} keyExtractor={item => String(item?._id)} />
        </SafeAreaView>
    );
};

export default React.memo(MyListings);
