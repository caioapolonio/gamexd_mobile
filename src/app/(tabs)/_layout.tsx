import { Tabs } from "expo-router";
import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
          backgroundColor: "#373545",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              className={`p-2 ${
                focused ? "bg-[#6f6f86]" : "bg-transparent"
              } w-full justify-center items-center h-full rounded-tl-xl`}
            >
              <Feather
                name="home"
                size={24}
                color={focused ? "white" : "#888"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              className={`p-2 ${
                focused ? "bg-[#6f6f86]" : "bg-transparent"
              } w-full justify-center items-center h-full`}
            >
              <Feather
                name="search"
                size={24}
                color={focused ? "white" : "#888"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: "Forum",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              className={`p-2 ${
                focused ? "bg-[#6f6f86]" : "bg-transparent"
              } w-full justify-center items-center h-full`}
            >
              <Feather
                name="message-square"
                size={24}
                color={focused ? "white" : "#888"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              className={`p-2 ${
                focused ? "bg-[#6f6f86]" : "bg-transparent"
              } w-full justify-center items-center h-full rounded-tr-xl`}
            >
              <Feather
                name="user"
                size={24}
                color={focused ? "white" : "#888"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
