import { StyleSheet, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import { ScrollView } from 'react-native'


const FetchData = () => {
    const [todoData,setTodoData]= useState([])
    useEffect(()=>{
        const starCountRef= ref(db,'announcement/');
        onValue(starCountRef, (snapshot)=>{
            const data= snapshot.val();
            const newPosts=Object.keys(data).map(key =>({
                id:key,
                ...data[key]
            }));
            
            setTodoData(newPosts);
        });
    },[])
    return(<ScrollView>
        <View style={styles.container }>
            <Text style={styles.header}>Announcements</Text>
            {
                todoData.map((item, index) =>{
                    return(
                        <View key={index} style={styles.bubble}>
                            <Text style={styles.text}>I want "{item.Number} Students" for "{item.Role}" to make  "{item.ProjectName}"</Text>
                            <Text style={styles.text}>Project Description: "{item.ProjectDetail}"</Text>
                            <Text style={styles.publishertext}>Published by: {item.Publisher}</Text>
                        </View>
                    )
                })
            }
        </View></ScrollView>
    )}

    
 

export default FetchData
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-start',
        backgroundColor:'#fff',
        paddingTop: 20,
    },
    header:{
        fontSize:30,
        textAlign:'center',
        marginTop:10,
        fontWeight:'bold',
    },
    text:{
        fontSize:20,
        textAlign:'center',
        marginTop:5,
    },
    bubble: {
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '80%',
    },
    publishertext: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
    },
})
