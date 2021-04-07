import React, { useState } from 'react';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Challenge } from '../../lib/types';

interface Props {
    challenge: Challenge;
}

const SaveChallengeButton: React.FC<Props> = ({ challenge }: Props) => {
    const [saved, setSaved] = useState(false);
    function saveChallenge() {
        if (saved) {
            setSaved(false);
        } else {
            setSaved(true);
        }
    }
    return (
        <TouchableOpacity onPress={saveChallenge}>
            {saved ? (
                <FontAwesome name="bookmark" color="gray" size={20} />
            ) : (
                <FontAwesome5 name="bookmark" color="gray" size={20} />
            )}
        </TouchableOpacity>
    );
};

export default SaveChallengeButton;
