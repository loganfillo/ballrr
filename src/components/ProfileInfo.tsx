import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useUser } from '../lib/user';
import FollowButton from './buttons/FollowButton';
import EditProfileButton from './buttons/EditProfileButton';
import MessageButton from './buttons/MessageButton';
import ProfileHighlights from './ProfileHighlights';
import ProfileAttributes from './ProfileAttributes';
import ProfileCounts from './ProfileCounts';
import ProfilePic from './ProfilePic';
import { useQuery } from '@apollo/client';
import { COUNT_FOLLOWERS, COUNT_FOLLOWING, COUNT_USERS_POST, GET_PROFILE } from '../lib/queries';
import { Flag } from '../lib/types';
import { Storage } from 'aws-amplify';
import LogoutButton from './buttons/LogoutButton';

interface Props {
    profileUserId: number;
    refreshing: boolean;
}

const ProfileInfo: React.FC<Props> = ({ profileUserId, refreshing }: Props) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [flag, setFlag] = useState<Flag>();
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');

    const user = useUser();

    const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
        variables: {
            user_id: profileUserId,
        },
    });

    useEffect(() => {
        refetch();
    }, [refreshing]);

    useEffect(() => {
        async function fetchProfile() {
            if (!loading && !error) {
                if (data.users_by_pk.full_name !== null) setName(data.users_by_pk.full_name);
                if (data.users_by_pk.bio !== null) setBio(data.users_by_pk.bio);
                if (data.users_by_pk.flag !== null) setFlag(JSON.parse(data.users_by_pk.flag));
                if (data.users_by_pk.profile_pic !== null) {
                    const profPicUrl = (await Storage.get(
                        data.users_by_pk.profile_pic.s3_key,
                    )) as string;
                    setImage(profPicUrl);
                }
                setUsername(data.users_by_pk.username);
            }
        }
        fetchProfile();
    }, [data]);

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3, paddingTop: 5, paddingLeft: 8 }}>
                    <ProfilePic flag={flag} image={image} />
                </View>
                <ProfileCounts
                    name={'posts'}
                    query={COUNT_USERS_POST}
                    refreshing={refreshing}
                    profileUserId={profileUserId}
                />
                <ProfileCounts
                    name={'followers'}
                    query={COUNT_FOLLOWERS}
                    refreshing={refreshing}
                    profileUserId={profileUserId}
                />
                <ProfileCounts
                    name={'following'}
                    query={COUNT_FOLLOWING}
                    refreshing={refreshing}
                    profileUserId={profileUserId}
                />
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
                        {name}
                    </Text>
                </View>
                {username == '' ? (
                    <></>
                ) : (
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
                                @{username}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingLeft: 10 }}>
                <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: '200' }}>{bio}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                {user.id === profileUserId ? (
                    <>
                        <EditProfileButton style={{ flex: 1, padding: 5 }} />
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <FollowButton
                            style={{ flex: 1, padding: 5 }}
                            userId={user.id}
                            profileUserId={profileUserId}
                        />
                        <MessageButton style={{ flex: 1, padding: 5 }} />
                    </>
                )}
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 8 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <ProfileAttributes profileUserId={profileUserId} />
                </ScrollView>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                <ProfileHighlights />
            </View>
        </View>
    );
};

export default ProfileInfo;
