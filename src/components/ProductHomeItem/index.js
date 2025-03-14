import React from 'react';
import { Pressable, Text, Image } from 'react-native';
import Config from 'react-native-config';
import { styles } from './styles';

const ProductHomeItem = ({ title, price, image, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{ uri: `${image}` }} />
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{title}</Text>
            <Text style={styles.price}>$ {price}</Text>
        </Pressable>
    );
};

export default React.memo(ProductHomeItem);
