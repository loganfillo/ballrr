import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';

const NotificationScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <List.Section>
                <List.Subheader>New</List.Subheader>
                <List.Item
                    title="cristiano45: Liked your post"
                    left={() => (
                        <Avatar.Image
                            size={35}
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                    )}
                />
                <Divider />

                <List.Item
                    title="cristiano45: Liked your post"
                    left={() => (
                        <Avatar.Image
                            size={35}
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                    )}
                />
                <Divider />
                <List.Item
                    title="cristiano45: Liked your post"
                    left={() => (
                        <Avatar.Image
                            size={35}
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                    )}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>Previous</List.Subheader>
                <List.Item
                    title="cristiano45: Liked your post"
                    left={() => (
                        <Avatar.Image
                            size={35}
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                    )}
                />
                <Divider />

                <List.Item
                    title="cristiano45: Liked your post"
                    left={() => (
                        <Avatar.Image
                            size={35}
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                    )}
                />
                <Divider />
                <List.Item
                    title="cristiano45: Liked your post"
                    left={() => (
                        <Avatar.Image
                            size={35}
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                    )}
                />
            </List.Section>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});

export default NotificationScreen;
