import React from 'react';
import { Image, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Post } from '../../lib/types';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    post: Post;
}
const FeedPostHeader: React.FC<Props> = ({ post }: Props) => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');

    function navigateToProfile(userId: number) {
        navigation.navigate('Profile', { userId });
    }

    return (
        <TouchableOpacity
            onPress={() => navigateToProfile(post.userId)}
            style={{
                borderRadius: 5,
                padding: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                flexDirection: 'row',
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    style={{
                        borderRadius: 100,
                        flex: 2,
                        aspectRatio: 1,
                        alignSelf: 'center',
                    }}
                    source={{
                        uri: post.profPicUrl,
                    }}
                />
            </View>
            <View style={{ flex: 6 }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
                    {post.fullName === null ? 'John Smith' : post.fullName}
                </Text>
                <Text style={{ color: 'white', fontSize: 12 }}>
                    @{post.username === null ? 'johns56' : post.username}
                </Text>
            </View>
            <View
                style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flex: 1,
                    paddingRight: 5,
                }}
            >
                <MaterialCommunityIcons name={'account-plus'} size={0.08 * width} color={'white'} />
            </View>
        </TouchableOpacity>
    );
};

export default FeedPostHeader;
