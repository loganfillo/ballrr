import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, ScrollView, SafeAreaView, TextInput, View, Button, Image } from 'react-native';
import { chooseMedia, createThumbnail } from '../lib/media';
import { Flag, Media } from '../lib/types';
import { useUser } from '../lib/user';
import { FlagPickerModal } from '../components/FlagPicker';
import { AttributePickerModal } from '../components/AttributePicker';
import { useNavigation } from '@react-navigation/core';
import { ApolloClient, NormalizedCacheObject, useApolloClient, useQuery } from '@apollo/client';
import { GET_PROFILE } from '../lib/queries';
import { saveProfileChanges } from '../lib/profile';
import { Storage } from 'aws-amplify';
import ProfileAttributes from '../components/ProfileAttributes';

const EditProfile: React.FC = () => {
    const [saving, setSaving] = useState(false);
    const [flag, setFlag] = useState<Flag>({ name: '', emoji: '', noFlag: true });
    const [flagModalVisible, setFlagModalVisible] = useState(false);
    const [attrModalVisible, setAttrModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profPic, setProfPic] = useState<Media>({ cancelled: true });
    const [hasProfPicChanged, setHasProfPicChanged] = useState(false);
    const [prevProfPic, setPrevProfPic] = useState('');
    const [image, setImage] = useState('');
    const [refetchAttributes, setRefetchAttributes] = useState(false);

    const user = useUser();
    const navigation = useNavigation();
    const apolloClient = useApolloClient();

    const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
        variables: {
            user_id: user.id,
        },
    });

    const [position, setPosition] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [foot, setFoot] = useState<string>('');
    const [league, setLeague] = useState<string>('');

    const SaveButton = () => <Button title={'Save'} onPress={onSave} disabled={saving} />;

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
                    setPrevProfPic(data.users_by_pk.profile_pic.s3_key);
                }
            }
        }

        async function fetchAttributes() {
            if (!loading && !error) {
                if (data.users_by_pk.location !== null) setLocation(data.users_by_pk.location);
                if (data.users_by_pk.position !== null) setPosition(data.users_by_pk.position);
                if (data.users_by_pk.height !== null) setHeight(data.users_by_pk.height);
                if (data.users_by_pk.weight !== null) setWeight(data.users_by_pk.weight);
                if (data.users_by_pk.foot !== null) setFoot(data.users_by_pk.foot);
                if (data.users_by_pk.league !== null) setLeague(data.users_by_pk.league);
            }
        }

        setRefetchAttributes(!refetchAttributes);
        fetchAttributes();
        fetchProfile();
    }, [data]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: SaveButton,
        });
    }, [
        saving,
        navigation,
        name,
        bio,
        flag,
        profPic,
        hasProfPicChanged,
        prevProfPic,
        position,
        location,
        height,
        weight,
        foot,
        league,
        apolloClient,
    ]);

    async function onSave() {
        setSaving(true);
        await saveProfileChanges(
            user,
            bio,
            name,
            flag,
            profPic,
            hasProfPicChanged,
            prevProfPic,
            position,
            location,
            height,
            weight,
            foot,
            league,
            apolloClient as ApolloClient<NormalizedCacheObject>,
        );
        await refetch();
        setSaving(false);
        navigation.navigate('Profile');
    }

    async function changeProfilePic() {
        const media: Media = await createThumbnail(await chooseMedia());
        if (!media.cancelled) {
            if (prevProfPic !== '') {
                setHasProfPicChanged(true);
            }
            setProfPic(media);
            if (media.file) {
                setImage(media.file?.uri);
            }
        }
    }

    function onFlagChange(flag: Flag) {
        setFlag(flag);
        setFlagModalVisible(false);
    }

    function onPositionChange(position: string) {
        setPosition(position);
    }

    function onLocationChange(location: string) {
        setLocation(location);
    }

    function onHeightChange(height: string) {
        setHeight(height);
    }

    function onWeightChange(weight: string) {
        setWeight(weight);
    }

    function onFootChange(foot: string) {
        setFoot(foot);
    }

    function onLeagueChange(league: string) {
        setLeague(league);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlagPickerModal
                visible={flagModalVisible}
                onClose={() => setFlagModalVisible(false)}
                onFlagChange={onFlagChange}
            />
            <AttributePickerModal
                visible={attrModalVisible}
                onClose={() => setAttrModalVisible(false)}
                profileUserId={user.id}
                onPositionChange={onPositionChange}
                onLocationChange={onLocationChange}
                onHeightChange={onHeightChange}
                onWeightChange={onWeightChange}
                onFootChange={onFootChange}
                onLeagueChange={onLeagueChange}
            />
            <ScrollView
                style={{
                    backgroundColor: 'whitesmoke',
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        {image === '' ? (
                            <Text style={{ fontSize: 15, textAlign: 'center', color: 'grey' }}>
                                Add Pic
                            </Text>
                        ) : (
                            <Image
                                style={{
                                    borderRadius: 100,
                                    height: undefined,
                                    width: `50%`,
                                    aspectRatio: 1,
                                    alignSelf: 'center',
                                }}
                                source={{
                                    uri: image,
                                }}
                            />
                        )}
                    </View>
                    <View
                        style={{
                            paddingTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        {flag === undefined || flag.noFlag === true ? (
                            <Text style={{ fontSize: 15, textAlign: 'center', color: 'grey' }}>
                                Add Flag
                            </Text>
                        ) : (
                            <Text style={{ fontSize: 60, textAlign: 'center' }}>{flag.emoji}</Text>
                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Button title={'Change Pic'} onPress={changeProfilePic} disabled={saving} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={'Change Flag'}
                            onPress={() => setFlagModalVisible(true)}
                            disabled={saving}
                        />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
                    <Text style={{ paddingBottom: 8, color: 'grey' }}>Name</Text>
                    <TextInput
                        style={{
                            borderBottomColor: 'green',
                            borderBottomWidth: 1,
                            paddingVertical: 4,
                        }}
                        maxLength={50}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <Text style={{ paddingBottom: 8, paddingTop: 15, color: 'grey' }}>Bio</Text>
                    <TextInput
                        style={{
                            borderBottomColor: 'green',
                            borderBottomWidth: 1,
                            paddingVertical: 4,
                        }}
                        maxLength={200}
                        onChangeText={(text) => setBio(text)}
                        value={bio}
                    />
                    <View
                        style={{
                            paddingBottom: 8,
                            paddingTop: 15,
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'grey' }}>Attributes</Text>
                        <Button
                            title={'+'}
                            onPress={() => setAttrModalVisible(true)}
                            disabled={saving}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <ProfileAttributes
                            profileUserId={user.id}
                            refetchAttributes={refetchAttributes}
                        />
                    </View>
                    <View style={{ padding: 30, alignSelf: 'center', flex: 1 }}>
                        <Text style={{ color: 'grey' }}>Save to see changes</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
