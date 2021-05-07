import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePostScreen from '../../screens/CreatePostScreen';
import { Media } from '../../lib/types';

export type PostStackParamList = {
    CreatePost: { media: Media; thumbnail: Media; competitionId: number };
};

const PostStack = createStackNavigator<PostStackParamList>();

const PostNavigator: React.FC = () => {
    return (
        <PostStack.Navigator
            initialRouteName="CreatePost"
            screenOptions={{
                headerBackTitle: 'Cancel',
                headerTitle: 'Create Post',
                headerStyle: { shadowOpacity: 0 },
            }}
        >
            <PostStack.Screen
                name="CreatePost"
                component={CreatePostScreen}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
        </PostStack.Navigator>
    );
};

export default PostNavigator;
