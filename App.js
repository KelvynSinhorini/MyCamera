import {StatusBar} from 'expo-status-bar'
import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'

export default function App() {
	let camera = Camera;
  const [startCamera, setStartCamera] = useState(false)
	const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

	const __startCamera = async () => {
		const {status} = await Camera.requestCameraPermissionsAsync()
		if(status === 'granted'){
			setStartCamera(true)	 
		}else{
			Alert.alert("Access denied")
		}
	}

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  return (
		<View style={styles.container}>
			{
				startCamera ? 
				<View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
					{
						previewVisible && capturedImage ? 
						<CameraPreview photo={capturedImage} />
						:
						<Camera
          		style={{flex: 1,width:"100%"}}
							ref={(r) => {
								camera = r
							}}
        		>
							<View
								style={{
									position: 'absolute',
									bottom: 0,
									flexDirection: 'row',
									flex: 1,
									width: '100%',
									padding: 40,
									justifyContent: 'space-between',
								}}
							>
								<View
									style={{
										alignSelf: 'center',
										flex: 1,
										alignItems: 'center'
									}}
								>
									<TouchableOpacity
										onPress={__takePicture}
										style={{
											width: 70,
											height: 70,
											bottom: 0,
											borderRadius: 50,
											backgroundColor: '#fff'
										}}
									/>
    						</View>
    					</View>
						</Camera>
					}
				</View>
				:
				<View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
			}
		</View>				
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = (photo) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      />
    </View>
  )
}