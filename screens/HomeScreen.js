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
                    <View style={{ flex: 1, marginTop: 10}}>
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
                                <ScrollView>
                                <Text style={styles.greetingText}>School Of Computer Science</Text>
                                <View style={styles.cardContainer}>
                                    {/* Amar Jindal */}
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
                                    {/* Amrendra Tripathi*/}
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
                                    {/* Hitesh Kumar Sharma*/}
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
                                    {/*Dr Ravi S Iyer */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Ravi_s_iyer'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Ravi_s_iyer.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr Ravi S Iyer</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Dean, School of Computer Science</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/*deepika_koundal*/}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('deepika_koundal'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/deepika_koundal.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Deepika Koundal</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/*neelu_jyothi_ahuja*/}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Neelu_jyothi_ahuja'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/neelu_jyothi_ahuja.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Amrendra Tripathi</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/*Akashdeep_bhardwaj*/}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Akashdeep_bhardwaj'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Akashdeep_bhardwaj.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Akashdeep Bhardwaj</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Anushree_sah*/}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Anushree_sah'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Anushree_sah.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Anushree Sah</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor (Selection Grade)</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* 9 Card */}
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
                                    {/* 10 Card */}
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
                                    
                                </View>
                            </ScrollView>
                            )}
                            {modalType === 'AdvancedEngineering' && (
                                
                                <ScrollView>
                                    
                                    <Text style={styles.greetingText}>School Of Advanced Engineering</Text>
                                  <View style={styles.cardContainer}>
                                    {/* Monika Yadav */}
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
                                    {/* Rangan Mishra */}
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
                                    {/* Piyush Kuchhal */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('piyush_kuchhal'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/piyush_kuchhal.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Piyush Kuchhal</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}> Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Srinivasa Reddy Devarapu */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('srinivasa_reddy_devarapu'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/srinivasa_reddy_devarapu.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Ranjan Mishra</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Leena Kapoor*/}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('leena_kapoor'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/leena_kapoor.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Leena Kapoor</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Associate Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Dr.Geetanjali Raghav */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('geetanjali_raghav'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/geetanjali_raghav.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr.Geetanjali Raghav</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor SG</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Ashish Karn */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('ashish_karn'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/ashish_karn.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Ashish Karn</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Sr. Associate Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Madhuben Sharma */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('madhuben_sharma'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/madhuben_sharma.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Madhuben Sharma</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor (SG)</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Abhishek Nandan */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('abhishek_nandan'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/abhishek_nandan.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Abhishek Nandan</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Associate professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View> 
                                </ScrollView>
                            )}
                            {modalType === 'Business' && (
                                <ScrollView>
                                    <Text style={styles.greetingText}>School Of Business</Text>
                                    <View style={styles.cardContainer}>
                                    {/* atul_rawat */}
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
                                    {/* alok_negi */}
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
                                    {/* Rahul_nainwal */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Rahul_nainwal'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Rahul_nainwal.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Rahul Nainwal</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Director, School of Business</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Niraj_shirish_mankad */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Niraj_shirish_mankad'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Niraj_shirish_mankad.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Alok Negi</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Anita_segnar */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Anita_sengar'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Anita_sengar.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Dr. Anita Sengar</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Associate Professor, Cluster Head School of Business</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Inder_singh */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Inder_singh'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Inder_singh.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Inder Singh</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Associate Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Anil_kumar */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Anil_kumar'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Anil_kumar.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Anil Kumar</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Professor</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Aanchal_sharma */}
                                    <View style={styles.card}>
                                        <TouchableOpacity onPress={() => {navigation.push('Aanchal_sharma'); setTimeout(() => {setModalVisible(false);}, 90);}}>
                                            {/* Image */}
                                            <Image
                                                source={require('../assets/images/Aanchal_sharma.png')}
                                                style={styles.cardImage}
                                            />
                                            {/* Title */}
                                            <Text style={styles.cardTitle}>Aanchal Sharma</Text>
                                            {/* Assistant Professor */}
                                            <Text style={styles.cardSubtitle}>Assistant Professor - Selection Grade</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View> 
                                </ScrollView>
                            )}
                            {modalType === 'Design' && (
                                <ScrollView>
                                    <Text style={styles.greetingText}>School Of Design</Text>
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
                                </ScrollView>
                            )}
                            {modalType === 'Law' && (
                                <ScrollView>
                                    <Text style={styles.greetingText}>School Of Law</Text>
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
                              </ScrollView>
                            )}
                            {modalType === 'Life' && (
                                <ScrollView>
                                    <Text style={styles.greetingText}>School Of Life</Text>
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
                              </ScrollView>
                            )}
                            {modalType === 'Health' && (
                               <ScrollView>
                                <Text style={styles.greetingText}>School Of Health Science</Text>
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
                             </ScrollView>
                            )}
                            {modalType === 'Liberal' && (
                                
                                <ScrollView>
                                    <Text style={styles.greetingText}>School Of Liberal Studies</Text>
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
                              </ScrollView>
                            )}
                            
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
        color:'rgb(22, 132, 199)' ,
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
