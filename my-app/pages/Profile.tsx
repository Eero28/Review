import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '../components/Context';
import ImagePickerComponent from '../components/ImagePicker';

type Props = {}

const Profile = (props: Props) => {
    const { userInfo } = useAuth();
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey' }}>
            <Text>{"Role: " + (userInfo?.role || "No role available")}</Text>
            <ImagePickerComponent />
        </View>
    );
}

export default Profile;
