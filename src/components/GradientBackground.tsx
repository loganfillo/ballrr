import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    children: React.ReactNode;
}

const GradientBackground: React.FC<Props> = ({ children }: Props) => {
    return (
        <LinearGradient
            colors={['#1bb51d', 'white']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradientContainer}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
});

export default GradientBackground;
