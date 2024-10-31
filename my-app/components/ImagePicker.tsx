import React, { useEffect, useState } from 'react';
import { View, Image, Button, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {};

const ImagePickerComponent = (props: Props) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Request permissions for camera and media library
    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted') {
            Alert.alert('Camera Permission Denied', 'Permission to access the camera is required.');
        }
        if (mediaLibraryStatus !== 'granted') {
            Alert.alert('Media Library Permission Denied', 'Permission to access the media library is required.');
        }
    };
    useEffect(() => {
        requestPermissions();
    }, []);

    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1, // Full quality
            aspect: [4, 3], // Optional aspect ratio adjustment
        });

        if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleCameraLaunch = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1, // Full quality
            aspect: [4, 3], // Optional aspect ratio adjustment
        });

        if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 200, height: 200 }}
                    resizeMode="contain"
                />
            )}
            <View style={{ marginTop: 20 }}>
                <Button title="Choose from Device" onPress={openImagePicker} />
            </View>
            <View style={{ marginTop: 20, marginBottom: 50 }}>
                <Button title="Open Camera" onPress={handleCameraLaunch} />
            </View>
        </SafeAreaView>
    );
};

export default ImagePickerComponent;
