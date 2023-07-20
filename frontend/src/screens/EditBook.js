import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TextInput,
    StyleSheet,
    Pressable
} from "react-native";
import { Formik } from 'formik';
import { COLORS, SIZES, FONTS, icons } from "../constants";
import axios from "axios";
import * as yup from 'yup'


const EditBook = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    console.log("-----data", data);
    // if(data !== undefined || data !== "undefined"){
    //     axios.post("http://192.168.1.12:3000/book", data)
    //     .then((resp) => {
    //         console.log(resp);
    //     }).catch(err => {
    //             console.log(err);
    //     });
    // }

    // const [isLoading, setIsLoading] = useState(false);
    // const baseUrl = "http://192.168.1.12:3000";
    // const handleSubmit = async (event) => {
    //     alert(3423423432)
    //     console.log("===event===", event)
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(`${baseUrl}/book`, data);

    //         if (response.status === 201) {
    //             alert(` You have created: ${JSON.stringify(response.data)}`);
    //         } else {
    //             throw new Error("An error has occurred");
    //         }
    //     } catch (error) {
    //         alert("An error has occurred");
    //         setIsLoading(false);
    //     }
    // };

    const loginValidationSchema = yup.object().shape({
        title: yup
            .string()
            .required('title is required'),
        author: yup
            .string()
            .required('author is required')
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary, marginTop: 0 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 50, alignItems: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity
                    style={{
                        marginLeft: SIZES.base,
                        backgroundColor: COLORS.primary,
                        borderRadius: 50,
                        padding: 5
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back_arrow_icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h1, color: COLORS.white }}> Edit Book </Text>
                </View>
            </View>

            <View style={{ flex: 1, padding: 24 }}>
                <View style={styles.container}>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ title: '', author: '', publicationYear: '', content: '' }}
                        onSubmit={formValues => setData(formValues)}
                    >
                        {/* {({ handleChange, handleBlur, values }) => ( */}
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View>
                                <View style={styles.formFieldWrapper}>
                                    <Text style={styles.labelText}>Title:</Text>
                                    <TextInput
                                        name="title"
                                        placeholder='Your title'
                                        underlineColorAndroid="transparent"
                                        style={[styles.formFieldText]}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                        multiline={true}
                                        rules={{ required: 'Title is required!' }}
                                    />
                                </View>
                                <View style={styles.formFieldWrapper}>
                                    <Text style={styles.labelText}>Author:</Text>
                                    <TextInput
                                        name="author"
                                        placeholder='Your Author'
                                        underlineColorAndroid="transparent"
                                        style={[styles.formFieldText]}
                                        onChangeText={handleChange('author')}
                                        onBlur={handleBlur('author')}
                                        value={values.author}
                                        multiline={true}
                                        rules={{ required: 'Author is required!' }}
                                    />
                                </View>
                                <View style={styles.formFieldWrapper}>
                                    <Text style={styles.labelText}>Publication Year:</Text>
                                    <TextInput
                                        name="publicationYear"
                                        placeholder='Your Publication Year'
                                        underlineColorAndroid="transparent"
                                        style={[styles.formFieldText]}
                                        onChangeText={handleChange('publicationYear')}
                                        onBlur={handleBlur('publicationYear')}
                                        value={values.publicationYear}
                                        multiline={true}
                                    />
                                </View>
                                <View style={styles.formFieldWrapper}>
                                    <Text style={styles.labelText}>Content:</Text>
                                    <TextInput
                                        name="content"
                                        placeholder='Your Content'
                                        underlineColorAndroid="transparent"
                                        style={[styles.formFieldText, styles.textArea]}
                                        onChangeText={handleChange('content')}
                                        onBlur={handleBlur('content')}
                                        value={values.content}
                                        multiline={true}
                                        numberOfLines={10}
                                    />
                                </View>
                                <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                                    <Text style={styles.save}>Save</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: COLORS.lightGray4,
        padding: SIZES.padding2,
        borderRadius: 20
    },
    textAreaContainer: {
        borderColor: COLORS.grey20,
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        textAlignVertical: 'top',
        height: 150,
        justifyContent: "flex-start"
    },
    header: {
        fontSize: 20,
        paddingTop: 30
    },
    formText: {
        fontSize: 20,
        padding: 10,
        paddingLeft: 0
    },
    formFieldWrapper: {
        color: COLORS.black
    },
    formFieldText: {
        justifyContent: "flex-start",
        fontSize: 20,
        borderRadius: 15,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        padding: 12,
        marginBottom: 10
    },
    labelText: {
        fontSize: 20,
        marginBottom: 5,
        paddingLeft: 5,
        paddingTop: 10,
        color: COLORS.secondary
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: COLORS.primary,
        opacity: 0.8
    },
    save: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: COLORS.secondary,
    },
})

export default EditBook;