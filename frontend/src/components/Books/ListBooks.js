import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from "react-native";
import { FONTS, COLORS, SIZES, icons, images } from "../../constants";
import axios from "axios";

const ListBooks = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        const url = 'http://192.168.1.12:3000/books';
        try {
            await axios.get(url)
            .then(response => {
                setData(response.data);
            })
                .catch(error => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginLeft: index === 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    marginTop: 0
                }}
                onPress={() => navigation.navigate("BookDetail", {
                    book: item
                })}
            >
                {/* Book Cover */}
                <Image
                    source={images.reactnative}
                    resizeMode="cover"
                    style={{
                        width: 180,
                        height: 250,
                        borderRadius: 20
                    }}
                />
                <View>
                    <Text style={{ color: COLORS.primary, fontSize: SIZES.font, fontWeight: 600, marginTop: 5 }}> {item.title} </Text>
                </View>

                {/* Book Info */}
                <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icons.clock_icon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.lightGray
                        }}
                    />
                    <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>10%</Text>

                    <Image
                        source={icons.page_icon}
                        style={{
                            marginLeft: SIZES.radius,
                            width: 20,
                            height: 20,
                            tintColor: COLORS.lightGray
                        }}
                    />
                    <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>200</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>My Book</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Books")}>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>view all</Text>
                </TouchableOpacity>
            </View>

            {/* Books */}
            <View style={{ flex: 1, marginTop: 10 }}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    )
}

export default ListBooks;