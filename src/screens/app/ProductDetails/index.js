import React, { useContext } from 'react';
import { ScrollView, Text, Image, View, Pressable, Linking } from 'react-native';
import { styles } from './styles';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import ImageCarousel from '../../../components/ImageCarousel';
import { updateService } from '../../../utils/backendCalls';
import { ServicesContext } from '../../../../App';

const ProductDetails = ({ route, navigation }) => {
    const params = route?.params || {};
    const { services, setServices } = useContext(ServicesContext);
    const product = services?.find(service => service?._id === params?.product?._id);

    const onBackPress = () => {
        navigation.goBack();
    };

    const onContact = () => {
        // Make a phone call
        const phone = '7060830393';
        Linking.openURL(`tel:${phone}`);

        // Send an Email
        const email = 'spawan123magic@mail.com';
        Linking.openURL(`mailto:${email}`);
    };

    const onAddCart = async () => {

        // const data = await updateService(product?._id, { liked: true });
        // setServices(data);

        const data=await addtoCart(product?._id);
        setCart(data)
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>
                {product?.images?.length ? (
                    <ImageCarousel images={product?.image} />
                ) : (
                    <Image style={styles.image} source={{ uri: `${product?.image}` }} />
                )}
                <View style={styles.content}>
                    <Text  ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{product?.title}</Text>
                    <Text style={styles.price}>$ {product?.price}</Text>
                    <Text style={styles.description}>{product?.description}</Text>
                </View>

                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require('../../../assets/back.png')} />
                </Pressable>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable onPress={onAddCart} style={styles.bookmarkContainer}>
                    <Image style={styles.bookmarkIcon} source={product?.liked ? require('../../../assets/cartiocn.png') : require('../../../assets/bookmark_blue.png')} />
                </Pressable>
                <Button onPress={onContact} title='Contact Seller' />
            </View>
        </SafeAreaView>
    );
};

export default React.memo(ProductDetails);
