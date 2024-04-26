import { StyleSheet, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'


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
    return(
        <View style={styles.container }>
            <Text style={styles.header}>Announcements</Text>
            {
                todoData.map((item, index) =>{
                    return(
                        <View key={index}>
                            <Text style={styles.text}>{item.ProjectName}</Text>
                            <Text style={styles.text}>{item.Role}</Text>
                            <Text style={styles.text}>{item.Number}</Text>
                            <Text style={styles.text}>{item.ProjectDetail}</Text>
                        </View>
                    )
                })
            }
        </View>
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
        marginTop:20,
    }
})