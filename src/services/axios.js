import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { Service } from 'axios-middleware'
const service = new Service(axios)

service.register({
  async onRequest(config) {
    console.log("sss")
    const token = await AsyncStorage.getItem('merpochi-jwt')
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }
})