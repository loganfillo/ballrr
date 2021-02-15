import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ProfilePost } from '../lib/types';

interface Params {
    posts: ProfilePost[];
}

const ProfilePostArray: React.FC<Params> = ({ posts }: Params) => {
    const { width } = Dimensions.get('window');

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                height: 200,
                backgroundColor: 'white',
            }}
        >
            {posts.map((post, id) => {
                return (
                    <View key={id} style={{ padding: 1 }}>
                        <Image
                            style={{ width: width / 3 - 2, height: width / 3 - 2 }}
                            source={{
                                uri: post.url,
                            }}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default ProfilePostArray;
