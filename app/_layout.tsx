import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { NativeBaseProvider } from "native-base";
import React from "react";

export default function Layout() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <AuthStack />
      </NativeBaseProvider>
    </AuthProvider>
  );
}

function AuthStack() {
  const { userToken } = useAuth();

  return (
    <Stack>
      {userToken ? (
        <Stack.Screen
          name={"home"}
          options={{ headerTitle: "Home Screen" }}
        />
      ) : (
        <Stack.Screen
          name={"index"}
          options={{ headerTitle: "Login" }}
        />
      )}
      <Stack.Screen
        name={"register"}
        options={{ headerTitle: "Join Our Team!" }}
      />
      <Stack.Screen
        name={"+not-found"}
        options={{ headerTitle: "Not Found" }}
      />
    </Stack>
  );
}
