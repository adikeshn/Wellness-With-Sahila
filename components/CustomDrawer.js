import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth } from "../firebase-config";

function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: 'tomato' }}>
        <Image
          source={require('../assets/logo.png')}
          style={{ height: 150, width: 150 }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            padding: 10,
          }}>
          {global.user}
        </Text>

        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {
          auth.signOut();
          global.user = ""
          props.navigation.navigate("Login");
        }} style={{ paddingVertical: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer