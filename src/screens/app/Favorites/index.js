import React, { useContext } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import { ServicesContext } from '../../../../App';
import { updateService } from '../../../utils/backendCalls';

const Favorites = ({ navigation }) => {
    const { services, setServices } = useContext(ServicesContext);
    const likedServices = Array.isArray(services) ? services?.filter(service => service) : [];

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item });
        };
        const onRemove = async () => {
            const updatedServices = await updateService(item?._id, { liked: false });
            if (Array.isArray(updatedServices)) {
                setServices(updatedServices);
            }
        };
        const onIconPress = () => {
            Alert.alert('Are you sure you want to remove this item from your Cart?', '', [{ text: 'Yes', onPress: onRemove }, { text: 'Cancel' }]);
        };
        return (
            <FavoriteItem onIconPress={onIconPress} {...item} />
        );
    };

    return (
        <SafeAreaView>
            <Header title='My Cart' />

            <FlatList ListEmptyComponent={(<Text style={{ textAlign: 'center', marginTop: 40 }}>You do not have any Product in your cart yet</Text>)} data={likedServices} renderItem={renderItem} keyExtractor={item => String(item?._id)} />
        </SafeAreaView>
    );
};

export default React.memo(Favorites);
