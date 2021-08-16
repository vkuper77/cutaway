import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native'
import Modal from 'react-native-modal'
import TypingText from 'react-native-typical'

const image = require('../assets/photo.jpg')
const icon = require('../assets/react.png')
const github = require('../assets/github.png')
const linkedin = require('../assets/linkedin.png')

const social = [
  { icon: github, name: 'https://github.com/vkuper77' },
  {
    icon: linkedin,
    name: 'Vitali Kupratsevich',
  },
]

const AnimatedText = () => (
  <TypingText
    steps={['I am React Native Developer', 500]}
    loop={10}
    blinkCursor={false}
    editDelay={50}
    style={[styles.title]}
  />
)

const Overlay = ({ isVisible, setIsVisible }) => {
  const value = useRef(new Animated.Value(0)).current
  const iconValue = useRef(new Animated.Value(0)).current
  const tValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(value, {
        toValue: 1,
        duration: 800000,
        useNativeDriver: 'false',
        easing: Easing.linear,
      }).start()
      Animated.timing(iconValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: 'false',
      }).start()
      Animated.timing(tValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: 'false',
        easing: Easing.circle,
      }).start()
    }, 2500)
  }, [])

  const rotate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '36000deg'],
  })

  const opacity = iconValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const translateX = tValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  })

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="down"
      backdropOpacity={0.5}
      style={styles.wrapper}
      onBackdropPress={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.wrapperImg}>
          <Image source={image} style={styles.img} />
        </View>
        <Text style={styles.title}>Hi, I'm Vitali Kupratsevich</Text>
        <View>
          <AnimatedText />
          <Animated.Image
            source={icon}
            style={[styles.icon, { opacity, transform: [{ rotate }] }]}
          />
        </View>
        <View style={styles.wrapperSocial}>
          {social.map((item, i) => {
            return (
              <Animated.View
                key={i}
                style={[
                  styles.containerSocial,
                  { transform: [{ translateX }] },
                ]}
              >
                <Image source={item.icon} style={styles.iconSocial} />
                <Text style={styles.textSocial}>{item.name}</Text>
              </Animated.View>
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
    paddingBottom: 200,
    paddingHorizontal: 55,
  },
  wrapperImg: {
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    color: '#303841',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  icon: {
    width: 32,
    height: 32,
    marginLeft: 10,
    position: 'absolute',
    right: -35,
    top: 9,
  },
  wrapperSocial: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 30,
  },
  containerSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  iconSocial: {
    width: 25,
    height: 25,
  },
  textSocial: {
    marginLeft: 10,
    color: '#47555E',
  },
})

export default Overlay
