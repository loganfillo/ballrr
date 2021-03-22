import React, { useState } from 'react';
import { Text } from 'react-native';

interface Props {
    username: string;
    caption: string;
}

const FeedPostCaption: React.FC<Props> = ({ username, caption }: Props) => {
    const [finalCaption] = useState(processCaption());

    function processCaption(): string {
        return caption.trim();
    }

    return (
        <>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
                {'@' + username}
            </Text>
            {finalCaption.length > 0 ? (
                <Text style={{ fontSize: 13, color: 'white', fontWeight: 'normal' }}>
                    {finalCaption}
                </Text>
            ) : (
                <></>
            )}
        </>
    );
};

export default FeedPostCaption;
