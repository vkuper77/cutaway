import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native'
import Modal from 'react-native-modal'
import TypingText from 'react-native-typical'

const image = require('../assets/photo.jpg')
const icon = require('../assets/react.png')
const github = require('../assets/github.png')
const linkedin = require('../assets/linkedin.png')
const instagram = require('../assets/instagram.png')

const social = [
  { icon: github, name: 'https://github.com/vkuper77' },
  {
    icon: linkedin,
    name: 'Vitali Kupratsevich',
  },
]

const Overlay = ({ isVisible, setIsVisible }) => {
  const [vIcon, setVIcon] = useState(false)
  const value = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setTimeout(() => {
      setVIcon(true)
      Animated.timing(value, {
        toValue: 1,
        duration: 600000,
        useNativeDriver: 'false',
        easing: Easing.linear,
      }).start()
    }, 3200)
  }, [])
  const rotate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '36000deg'],
  })
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={styles.wrapper}
      onBackdropPress={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.wrapperImg}>
          <Image source={image} style={styles.img} />
        </View>
        <Text style={{ color: '#303841', fontSize: 16 }}>
          Hi, I'm Vitali Kupratsevich
        </Text>
        <View>
          <TypingText
            steps={['I am React Native Developer', 500]}
            loop={5}
            blinkCursor={false}
            editDelay={60}
            deleteDelay={10}
            style={{ color: '#303841', fontSize: 16, marginVertical: 10 }}
          />
          {vIcon ? (
            <Animated.Image
              source={icon}
              style={{
                width: 32,
                height: 32,
                marginLeft: 10,
                position: 'absolute',
                right: -35,
                top: 4,
                transform: [{ rotate }],
              }}
            />
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-start', width: '100%' }}>
          {social.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                  justifyContent: 'flex-start',
                }}
              >
                <Image source={item.icon} style={{ width: 25, height: 25 }} />
                <Text style={{ marginLeft: 10, color: '#47555E' }}>
                  {item.name}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    backgroundColor: '#EEEEEE',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 55,
  },
  wrapperImg: {
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 50,
    marginBottom: 20,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
})

export default Overlay
