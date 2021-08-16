import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Overlay from './components/Overlay'

export default function App() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 1000)
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Overlay isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
