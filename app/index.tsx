
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Pressable,
  Stack,
  HStack,
  Icon,
  Text,
} from "native-base";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
const logo = require("../assets/images/korimg.png");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError(null);  // Reset the error before trying to login
      await login(email, password);
      router.replace("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      safeArea
      backgroundColor={"white"}
      width={"full"}
      height={"full"}
      justifyContent={"center"}
    >
      <Center p={"16"}>
        <Image source={logo} alt="Alternate Text" size="2xl" />
        <FormControl>
          <Stack space={5}>
            <Stack>
              <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                E-mail*
              </FormControl.Label>
              <Input
                type="text"
                variant={"underlined"}
                p={2}
                placeholder="Johndoe@gmail.com"
                size={"lg"}
                placeholderTextColor={"black"}
                borderBottomColor={"black"}
                onChangeText={(text) => setEmail(text)}
              />
            </Stack>
            <Stack>
              <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                Password*
              </FormControl.Label>
              <Input
                type={showPassword ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={showPassword ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="black"
                    />
                  </Pressable>
                }
                variant={"underlined"}
                p={2}
                placeholder="*********"
                placeholderTextColor={"black"}
                borderBottomColor={"black"}
                onChangeText={(text) => setPassword(text)}
              />
            </Stack>
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
            <Button
              variant={"outline"}
              mt={5}
              _text={{ color: "white", fontWeight: "bold" }}
              borderColor={"black"}
              size={"lg"}
              backgroundColor={"#3f76bf"}
              onPress={handleLogin}
            >
              Login
            </Button>
            <HStack mt={2} justifyContent={"center"}>
              <Text mr={2} fontSize={"sm"}>
                First time working with KOR?
              </Text>
              <Link href="/register">
                <Text fontSize={"sm"} bold color={"#3f76bf"} underline>
                  Join Us
                </Text>
              </Link>
            </HStack>
          </Stack>
        </FormControl>
      </Center>
    </Box>
  );
}
