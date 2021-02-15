import React from 'react';
import Emoji from 'react-native-emoji';
import { Image, Text, View } from 'react-native';
import { useUser } from '../lib/user';
import FollowButton from './buttons/FollowButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip, Divider } from 'react-native-paper';
import MessageButton from './buttons/MessageButton';

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

const ProfileStats: React.FC = () => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="map-marker"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    Vancouver, BC
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="soccer-field"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    Left Wing
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="ruler"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    5.8ft
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="weight"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    130lbs
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="foot-print"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    Right
                </Chip>
            </View>
        </ScrollView>
    );
};
interface InfoParams {
    name: string;
    count: number;
}

const ProfileInfo: React.FC<InfoParams> = ({ name, count }: InfoParams) => {
    return (
        <View
            style={{
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <View style={{ marginBottom: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                    {count}
                </Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '100' }}>{name}</Text>
            </View>
        </View>
    );
};

interface Params {
    profileUserId: number;
}

const ProfileBio: React.FC<Params> = ({ profileUserId }: Params) => {
    const user = useUser();

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 5,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                    backgroundColor: 'white',
                }}
            >
                <View
                    style={{
                        margin: 5,
                        width: 10,
                        aspectRatio: 1,
                        backgroundColor: 'gold',
                        borderRadius: 100,
                        alignSelf: 'center',
                    }}
                ></View>
                <Text
                    style={{
                        alignSelf: 'center',
                        margin: 0,
                        padding: 0,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '500',
                        color: 'black',
                    }}
                >
                    7
                </Text>
                <View
                    style={{
                        margin: 5,
                        width: 10,
                        aspectRatio: 1,
                        backgroundColor: 'silver',
                        borderRadius: 100,
                        alignSelf: 'center',
                    }}
                ></View>
                <Text
                    style={{
                        alignSelf: 'center',
                        margin: 0,
                        padding: 0,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '500',
                        color: 'black',
                    }}
                >
                    5
                </Text>
                <View
                    style={{
                        margin: 5,

                        width: 10,
                        aspectRatio: 1,
                        backgroundColor: '#cd7f32',
                        borderRadius: 100,
                        alignSelf: 'center',
                    }}
                ></View>
                <Text
                    style={{
                        alignSelf: 'center',

                        margin: 0,
                        padding: 0,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '500',
                        color: 'black',
                    }}
                >
                    15
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3, paddingTop: 0, paddingLeft: 8 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: undefined,
                            width: '95%',
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri:
                                'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                        }}
                    />
                    <Emoji
                        name="flag-ca"
                        style={{
                            position: 'absolute',
                            top: 65,
                            right: -8,
                            fontSize: 38,
                            textAlign: 'center',
                        }}
                    />
                </View>
                <ProfileInfo name={'posts'} count={15} />
                <ProfileInfo name={'followers'} count={200} />
                <ProfileInfo name={'following'} count={12} />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingTop: 10,
                    paddingLeft: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                        Logan Fillo
                    </Text>
                </View>
                <View
                    style={{
                        padding: 5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 5,
                            paddingHorizontal: 8,
                            borderRadius: 10,
                            backgroundColor: 'green',
                        }}
                    >
                        <Text
                            style={{
                                margin: 0,
                                padding: 0,
                                textAlign: 'center',
                                fontSize: 12,
                                fontWeight: '500',
                                color: 'white',
                            }}
                        >
                            Division 2
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 10 }}>
                <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: '200' }}>
                    If you want to be the best, you can never settle for mediocre, always strive for
                    excellence.
                </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <FollowButton
                    style={{ flex: 1, padding: 5 }}
                    userId={user.id}
                    profileUserId={profileUserId}
                />
                <MessageButton style={{ flex: 1, padding: 5 }} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 8 }}>
                <ProfileStats />
            </View>
            <Divider />
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                <ProfileHighlights />
            </View>
        </View>
    );
};

export default ProfileBio;
