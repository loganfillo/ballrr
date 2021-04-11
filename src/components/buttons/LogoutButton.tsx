import { Auth } from 'aws-amplify';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useUser } from '../../lib/user';
import ProfileButton from './ProfileButton';

interface Props {
    style: StyleProp<ViewStyle>;
}

const LogoutButton: React.FC<Props> = ({ style }: Props) => {
    const user = useUser();
    async function logout() {
        await Auth.signOut();
        user.updateLoginStatus(false);
    }
    return (
        <View style={style}>
            <ProfileButton title={'Logout'} onPress={logout} color={'red'} />
        </View>
    );
};

export default LogoutButton;
