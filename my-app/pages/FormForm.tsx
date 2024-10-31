import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../components/Context'; // Adjust the path as necessary
import {API_URL} from "@env"
type FormData = {
    email: string;
    password: string;
};

const Form = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const { login } = useAuth();
    const [submitError,setSubmitError] = useState<string>("")
    const onSubmit = async (data: FormData) => {
        
        setSubmitError("")
        try {
            const response = await axios.post(API_URL, data);
            console.log(response.data);
            if (response.data.access_token) {
                await login(response.data.access_token, response.data.role); 
                reset(); 
            } else {
                console.error("No access token received");
            }
        } catch (error) {
            setSubmitError("Wrong credentials!")
            console.error("Login error:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                    rules={{ required: "Email is required." }}
                    defaultValue=""
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                    rules={{ required: "Password is required." }}
                    defaultValue=""
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                {submitError && <Text style={styles.error}>{submitError}</Text>}
                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Form;
