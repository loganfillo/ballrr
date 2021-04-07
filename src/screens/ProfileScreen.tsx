import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useUser } from '../lib/user';
import ProfilePostArray from '../components/ProfilePostArray';
import ProfileInfo from '../components/ProfileInfo';
import { ProfileStackParamList } from '../components/navigators/ProfileNavigator';

const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

const ProfileScreen: React.FC = (): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);
    const { params } = useRoute<ProfileRouteProp>();
    const user = useUser();
    const profileUserId = params !== undefined ? params.userId : user.id;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <>
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <ProfileInfo profileUserId={profileUserId} refreshing={refreshing} />
                <ProfilePostArray profileUserId={profileUserId} refreshing={refreshing} />
            </ScrollView>
        </>
    );
};

export default ProfileScreen;
