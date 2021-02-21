import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileHighlights: React.FC = () => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
                style={{
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <View style={{ marginBottom: 5 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: 60,
                            width: 60,
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri:
                                'https://static01.nyt.com/images/2016/10/29/sports/29CLAREYweb2/29CLAREYweb2-videoSixteenByNineJumbo1600.jpg',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
                        Headers
                    </Text>
                </View>
            </View>
            <View
                style={{
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <View style={{ marginBottom: 5 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: 60,
                            width: 60,
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri:
                                'https://cdn.shopify.com/s/files/1/0961/3230/files/slide_tackle_2_large.jpg?v=1481181891',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
                        Tackles
                    </Text>
                </View>
            </View>
            <View
                style={{
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <View style={{ marginBottom: 5 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: 60,
                            width: 60,
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri:
                                'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Kids/Galleries/Soccer+Shot/Slide-2.jpg',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
                        Goals
                    </Text>
                </View>
            </View>
            <View
                style={{
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <View style={{ marginBottom: 5 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: 60,
                            width: 60,
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri:
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ22cfJUii6Vs9y4cCKBTqhq-CPF74qgBhMQ&usqp=CAU',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
                        Tricks
                    </Text>
                </View>
            </View>
            <View
                style={{
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <View style={{ marginBottom: 5 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: 60,
                            width: 60,
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri:
                                'https://static01.nyt.com/images/2016/10/29/sports/29CLAREYweb2/29CLAREYweb2-videoSixteenByNineJumbo1600.jpg',
                        }}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
                        Saves
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileHighlights;
