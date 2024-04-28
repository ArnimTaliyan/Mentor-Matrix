import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SettingScreen from './SettingScreen';
import Scheduler from './Scheduler';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export {
    SettingScreen,
    Scheduler
}

export default function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const userName = route.params?.userName;
    const userEmail = route.params?.userEmail;

    const [searchQuery, setSearchQuery] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                
                <View style={styles.container}>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        {userName ? <Text style={styles.greetingText}>Hello, {userName}</Text> : null}
                    </View>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.push('AnnouncementScheduler', { userName: userName,  userEmail: userEmail })}>
                        <Ionicons name="megaphone-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <TextInput
                        placeholder='Who are you looking for?'
                        placeholderTextColor={'black'}
                        clearButtonMode='always'
                        style={styles.searchbox}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={searchQuery}
                        onChangeText={(query) => handleSearch(query)}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.bubbleRow}>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('ComputerScience');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Computer Science</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('AdvancedEngineering');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Advanced Engineering</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bubbleRow}>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('Business');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Business</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('Design');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Design</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bubbleRow}>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('Law');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Law</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('Life');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Life</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bubbleRow}>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('Health');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Health Sciences and Technology</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bubble}
                            onPress={() => {
                                setModalType('Liberal');
                                setModalVisible(true);
                            }}>
                            <Text style={styles.bubbleText}>School of Liberal Studies</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Add more bubble rows */}
                </View>
                {/* Modal for displaying detailed information */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {modalType === 'ComputerScience' && (
                                <View>
                                
                                <View style={styles.cardContainer}>
                                    {/* First Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('amar_jindal'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/amar_jindal.jpg')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Amar Jindal</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Second Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('amrendra_tripathi'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/amrendra_tripathi.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Amrendra Tripathi</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Third Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('hitesh'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/hitesh.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Hitesh Kumar Sharma</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Senior Associate Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Add more cards as needed */}
                                </View>
                            </View>
                            )}
                            {modalType === 'AdvancedEngineering' && (
                                <View>
                                  <View style={styles.cardContainer}>
                                    {/* First Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('monika_yadav'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/monika_yadav.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr.Monika Yadav</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Second Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('ranjan_mishra'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/ranjan_mishra.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Ranjan Mishra</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View> 
                                </View>
                            )}
                            {modalType === 'Business' && (
                                <View>
                                    <View style={styles.cardContainer}>
                                    {/* First Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('atul_rawat'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/atul_rawat.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Atul Rawat</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Second Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('alok_negi'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/alok_negi.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Alok Negi</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View> 
                                </View>
                            )}
                            {modalType === 'Design' && (
                                <View>
                                  <View style={styles.cardContainer}>
                                    {/* First Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('milly_singh'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/milly_singh.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Milly Singh</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Second Card */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('sonal_singh'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/sonal_singh.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Sonal Singh</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>  
                                </View>
                            )}
                            {modalType === 'Law' && (
                                <View>
                                    <Text>School of Law</Text>
                                    {/* Add more detailed content here */}
                                </View>
                            )}
                            {modalType === 'Life' && (
                                <View>
                                    <Text>School of Life Information</Text>
                                    {/* Add more detailed content here */}
                                </View>
                            )}
                            {modalType === 'Health' && (
                                <View>
                                    <Text>School of Health Sciences and Technology</Text>
                                    {/* Add more detailed content here */}
                                </View>
                            )}
                            {modalType === 'Liberal' && (
                                <View>
                                    <Text>School of Liberal Studies</Text>
                                    {/* Add more detailed content here */}
                                </View>
                            )}
                            {/* Add more conditions for other modal types */}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    greetingText: {
        fontSize: 30,
        color: '#0B646B',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    searchbox: {
        marginTop: 30,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'column',
        marginTop: 20,
        paddingHorizontal: 16,
    },
    bubbleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    bubble: {
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        padding: 12, // Decrease padding to make the containers smaller
        width: '48%', // Decrease width to make the containers smaller
        alignItems: 'center',
        justifyContent:'center',
        marginBottom: 10, // Add marginBottom to create spacing between rows
        aspectRatio: 1.5, // Maintain aspect ratio
    },
    bubbleText: {
        textAlign: 'center', // Align text to the center horizontally
        textAlignVertical: 'center', // Align text to the center vertically
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%', // Adjust width to fit two cards in one line with spacing
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        marginBottom: 10,
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
    },
    cardSubtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        marginBottom: 8,
    },
});
