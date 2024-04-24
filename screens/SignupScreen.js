import { View, Text, Image,} from 'react-native'
import React,{useEffect, useState} from 'react'
import { StatusBar, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ScrollView } from 'react-native';




export default function SignupScreen() {
    const navigation= useNavigation();


    





    
    
    
  return (
    <ScrollView className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')}/>

        {/*Lights */}
        <View className="flex-row justify-around w-full absolute">
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[205] w-[90]" source={require('../assets/images/light.png')}/>
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[140] w-[65]" source={require('../assets/images/light.png')}/>

        </View>
        
        {/* title and form */}
        <View className="h-full  w-full flex justify-around pt-48">
            {/*title*/}
            <View className="flex items-center "style={{marginTop: 50}}>
                <Animated.Text entering={FadeInUp.duration(1000).springify()}  className="text-white  font-bold tracking-wider text-5xl">Signup</Animated.Text>
            </View>

            {/*form for login */}
            <View className="flex items-center  mx-4 space-y-4"style={{marginTop: 120}}>
            <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5  rounded-2xl w-full">
                    <TextInput placeholder="Name" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "Name")}  ></TextInput>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5  rounded-2xl w-full">
                    <TextInput placeholder="Email" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "email")}  ></TextInput>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                    <TextInput placeholder="Password" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} ></TextInput>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                <TouchableOpacity onPress={()=>Login()} className="w-full bg-sky-400 p-3 rounded-3xl mb-3">
                    <Text className="text-2xl font-blod text-white text-center">SignUp</Text>
                </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center" >
                    <Text>Already hava an account?</Text>
                <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
  <Text className="text-sky-600">Signup</Text>
</TouchableOpacity>

                </Animated.View>
            </View>
            
            
           
        </View>


    </ScrollView>
  )
}