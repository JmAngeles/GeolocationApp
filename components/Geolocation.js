// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, SearchBar } from 'react-native-elements';

export default function Header() {
    const [geoData, setGeoData] = useState('');
    const [search, setSearchText] = useState('');
    let jsonResponse;
    const validationError = geoData && geoData.error ? geoData.error.message ? geoData.error.message : '' : '';
    console.log('geoDataValue', geoData);

    const getGeoResponse = async (value) => {
        try {
            const response = await fetch(
                value ? `https://ipinfo.io/${value}/json?token=4362425d1f9519` : 'https://ipinfo.io/json?token=4362425d1f9519'
            );
            jsonResponse = await response.json();
            setGeoData(jsonResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const updateSearch = (value) => {
        getGeoResponse(value);
        setSearchText(value);
    }

    const clearSearch = () => {
        getGeoResponse();
    }


    useEffect(() => {
        if (!geoData) {
            getGeoResponse(search);
        }
    }, []);

    return (
        <View style={styles.header}>
            <Card containerStyle={styles.mainCard}>
                <SearchBar placeholder="Enter IP Address"
                    onChangeText={newSearch => updateSearch(newSearch)}
                    value={search}
                    onClear={clearSearch}
                    inputStyle={styles.input}
                    platform='android'
                    containerStyle={styles.searchBarStyles}
                />
                <Text style={styles.textError}>{validationError}</Text>
                <Card containerStyle={styles.subCard}>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>IP:</Text> {geoData ? geoData.ip : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Hostname:</Text> {geoData ? geoData.hostname : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>City:</Text> {geoData ? geoData.city : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Region:</Text> {geoData ? geoData.region : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Country:</Text> {geoData ? geoData.country : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Loc:</Text> {geoData ? geoData.loc : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Org:</Text> {geoData ? geoData.org : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Postal:</Text> {geoData ? geoData.postal : ''}</Text>
                    <Text style={styles.textStyles}><Text style={styles.textTitle}>Timezone:</Text> {geoData ? geoData.timezone : ''}</Text>
                </Card>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: '80%',
        // paddingTop: 50,
        // flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        minWidth: 100,
        // maxWidth: 500,
    },
    searchBarStyles: {
        // backgroundColor: 'white',
        minWidth: 300,
        maxWidth: 500,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#3d4345',
    },
    textTitle: {
        fontSize: 16,
        color: '#a87932',
        fontWeight: 'bold',
        padding: 5,
    },
    textStyles: {
        fontSize: 16,
        padding: 5,
        color: '#a87932',
    },
    textError: {
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        color: 'red',
    },
    mainCard: {
        minHeight: 400,
        maxHeight: 800,
        minWidth: 300,
        maxWidth: 500,
        width: '100%',
        height: '100%',
        backgroundColor: '#3d4345',
        borderRadius: 5,
    },
    subCard: {
        backgroundColor: '#0f3742',
        borderColor: '#0f3742',
        borderRadius: 5,
    },
});
