import {
  Box,
  Center,
  FormControl,
  Input,
  Stack,
  Button,
  Select,
  Image,
  Text,
  ScrollView,
  Radio,
  Checkbox,
  TextArea,
  Pressable,
  Icon,
} from "native-base";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country } from "../constants/types";
import * as ImagePicker from "expo-image-picker";

const logo = require("../assets/images/korimg.png");

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IE");
  const [country, setCountry] = useState<Country>({
    region: "Europe",
    subregion: "Northern Europe",
    currency: ["EUR"],
    callingCode: ["353"],
    flag: "🇮🇪",
    name: "Ireland",
    cca2: "IE",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pps, setPps] = useState("");
  const [euCitizen, setEuCitizen] = useState("");
  const [howlong, setHowLong] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [staffPhoto, setStaffPhoto] = useState<string | null>(null);
  const [proofOfWork, setproofOfWork] = useState<string | null>(null);


  //console.log(fullName, "Full Name Form");
  //console.log(phoneNumber, "numero de telefone");
  //console.log(experience, "STAFF EXPERIENCE");

  const handleCheckboxChange = (value: string) => {
    setExperience((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const pickStaffImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setStaffPhoto(result.assets[0].uri);
    }
  };

  const pickProofOfWorkImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setproofOfWork(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <Box
        safeArea
        backgroundColor={"white"}
        width={"full"}
        height={"full"}
        justifyContent={"center"}
      >
        <Center p={16}>
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
                  keyboardType="email-address"
                  value={email}
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
                            name={
                              showPassword ? "visibility" : "visibility-off"
                            }
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
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Full Name*
                </FormControl.Label>
                <Input
                  type="text"
                  variant={"underlined"}
                  p={2}
                  placeholder="John Doe Silver"
                  size={"lg"}
                  placeholderTextColor={"black"}
                  borderBottomColor={"black"}
                  onChangeText={(text) => setFullName(text)}
                />
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Date Of Birth*
                </FormControl.Label>
                <Input
                  isReadOnly
                  variant={"underlined"}
                  p={2}
                  size={"lg"}
                  placeholder={format(dob, "dd/MM/yyyy")}
                  placeholderTextColor={"black"}
                  borderBottomColor={"black"}
                  onPress={() => setShowDatePicker(true)}
                />
                {showDatePicker && (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dob}
                      mode="date"
                      display="spinner"
                      themeVariant="light"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setDob(selectedDate);
                        }
                      }}
                    />
                    <Button onPress={() => setShowDatePicker(false)}>
                      Confirm Date
                    </Button>
                  </>
                )}
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  City*
                </FormControl.Label>
                <Select
                  variant="underlined"
                  selectedValue={city}
                  p={2}
                  accessibilityLabel="Choose City"
                  placeholder="Choose City"
                  placeholderTextColor={"black"}
                  size={"lg"}
                  borderColor={"black"}
                  _selectedItem={{
                    bg: "#dedede",
                    rounded: "md",
                    endIcon: (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="black"
                      />
                    ),
                  }}
                  onValueChange={(itemValue) => setCity(itemValue)}
                >
                  <Select.Item label="Antrim" value="Antrim">
                    Antrim
                  </Select.Item>
                  <Select.Item label="Armagh" value="Armagh">
                    Armagh
                  </Select.Item>
                  <Select.Item label="Carlow" value="Carlow">
                    Carlow
                  </Select.Item>
                  <Select.Item label="Cavan" value="Cavan">
                    Cavan
                  </Select.Item>
                  <Select.Item label="Clare" value="Clare">
                    Clare
                  </Select.Item>
                  <Select.Item label="Cork" value="Cork">
                    Cork
                  </Select.Item>
                  <Select.Item label="Derry" value="Derry">
                    Derry
                  </Select.Item>
                  <Select.Item label="Donegal" value="Donegal">
                    Donegal
                  </Select.Item>
                  <Select.Item label="Down" value="Down">
                    Down
                  </Select.Item>
                  <Select.Item label="Dublin" value="Dublin">
                    Dublin
                  </Select.Item>
                  <Select.Item label="Fermanagh" value="Fermanagh">
                    Fermanagh
                  </Select.Item>
                  <Select.Item label="Galway" value="Galway">
                    Galway
                  </Select.Item>
                  <Select.Item label="Kerry" value="Kerry">
                    Kerry
                  </Select.Item>
                  <Select.Item label="Kildare" value="Kildare">
                    Kildare
                  </Select.Item>
                  <Select.Item label="Kilkenny" value="Kilkenny">
                    Kilkenny
                  </Select.Item>
                  <Select.Item label="Laois" value="Laois">
                    Laois
                  </Select.Item>
                  <Select.Item label="Leitrim" value="Leitrim">
                    Leitrim
                  </Select.Item>
                  <Select.Item label="Limerick" value="Limerick">
                    Limerick
                  </Select.Item>
                  <Select.Item label="Longford" value="Longford">
                    Longford
                  </Select.Item>
                  <Select.Item label="Louth" value="Louth">
                    Louth
                  </Select.Item>
                </Select>
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Phone Number*
                </FormControl.Label>
                <Input
                  variant="underlined"
                  type="text"
                  p={2}
                  placeholder="834352563"
                  size={"lg"}
                  placeholderTextColor={"black"}
                  borderBottomColor={"black"}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  InputLeftElement={
                    <>
                      <CountryPicker
                        {...{
                          countryCode,
                          withCallingCode: true,
                          onSelect: (country: Country) => {
                            setCountryCode(country.cca2);
                            setCountry(country);
                          },
                        }}
                      ></CountryPicker>
                      <Text color={"black"} fontSize={"md"}>
                        {country.callingCode}
                      </Text>
                    </>
                  }
                />
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  PPS Number*
                </FormControl.Label>
                <Input
                  variant="underlined"
                  type="text"
                  p={2}
                  placeholder="7061531VA"
                  size={"lg"}
                  placeholderTextColor={"black"}
                  borderBottomColor={"black"}
                  value={pps}
                  onChangeText={(text) => setPps(text)}
                />
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Irish or EU Citizen*
                </FormControl.Label>
                <Radio.Group
                  name="EuCitizen"
                  accessibilityLabel="EuCitizen"
                  value={euCitizen}
                  onChange={(nextValue) => {
                    setEuCitizen(nextValue);
                  }}
                >
                  <Stack p={2} space={2}>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Stack>
                </Radio.Group>
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  How Long Have You Been In Ireland?*
                </FormControl.Label>
                <Radio.Group
                  name="beeninireland"
                  accessibilityLabel="beeninireland"
                  value={howlong}
                  onChange={(nextValue) => {
                    setHowLong(nextValue);
                  }}
                >
                  <Stack p={2} space={2}>
                    <Radio value="Less than 1 month">Less than 1 month</Radio>
                    <Radio value="1 - 3 months">1 - 3 months</Radio>
                    <Radio value="4 - 6 months">4 - 6 months</Radio>
                    <Radio value="7 - 12 months">7 - 12 months</Radio>
                    <Radio value="More than 1 year">More than 1 year</Radio>
                  </Stack>
                </Radio.Group>
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  What is your english level ?*
                </FormControl.Label>
                <Radio.Group
                  name="englishLevel"
                  accessibilityLabel="englishLevel"
                  value={englishLevel}
                  onChange={(nextValue) => {
                    setEnglishLevel(nextValue);
                  }}
                >
                  <Stack p={2} space={2}>
                    <Radio value="Fluent / Native">Fluent / Native</Radio>
                    <Radio value="Proficient">Proficient</Radio>
                    <Radio value="Advanced">Advanced</Radio>
                    <Radio value="Upper Intermediate">Upper Intermediate</Radio>
                    <Radio value="Intermediate">Intermediate</Radio>
                    <Radio value="Pre-Intermediate">Pre-Intermediate</Radio>
                    <Radio value="Elementary">Elementary</Radio>
                    <Radio value="Beginner">Beginner</Radio>
                  </Stack>
                </Radio.Group>
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Do you have experience in Ireland in any of these areas ?*
                </FormControl.Label>
                <Stack p={2} space={2}>
                  <Checkbox
                    value="Retail/ Cashier"
                    isChecked={experience.includes("Retail/ Cashier")}
                    onChange={() => handleCheckboxChange("Retail/ Cashier")}
                  >
                    Retail/ Cashier
                  </Checkbox>
                  <Checkbox
                    value="Barista"
                    isChecked={experience.includes("Barista")}
                    onChange={() => handleCheckboxChange("Barista")}
                  >
                    Barista
                  </Checkbox>
                  <Checkbox
                    value="Hospitality"
                    isChecked={experience.includes("Hospitality")}
                    onChange={() => handleCheckboxChange("Hospitality")}
                  >
                    Hospitality
                  </Checkbox>
                  <Checkbox
                    value="Travel"
                    isChecked={experience.includes("Travel")}
                    onChange={() => handleCheckboxChange("Travel")}
                  >
                    Travel
                  </Checkbox>
                  <Checkbox
                    value="Healthcare"
                    isChecked={experience.includes("Healthcare")}
                    onChange={() => handleCheckboxChange("Healthcare")}
                  >
                    Healthcare
                  </Checkbox>
                  <Checkbox
                    value="Cleaning"
                    isChecked={experience.includes("Cleaning")}
                    onChange={() => handleCheckboxChange("Cleaning")}
                  >
                    Cleaning
                  </Checkbox>
                  <Checkbox
                    value="None"
                    isChecked={experience.includes("None")}
                    onChange={() => handleCheckboxChange("None")}
                  >
                    None
                  </Checkbox>
                </Stack>
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Describe your experience ?*
                </FormControl.Label>
                <Stack p={2}>
                  <TextArea
                    autoCompleteType
                    h={20}
                    placeholder="Describe about yourself"
                    fontSize={"lg"}
                  />
                </Stack>
              </Stack>
              <Stack space={5} alignItems={"center"}>
                <Button onPress={pickStaffImage} width={"full"}>Upload a photo of yourself</Button>
                {staffPhoto && (
                  <Image source={{ uri: staffPhoto }} w={"32"} h={"32"} alt="Staff Photo" />
                )}
              </Stack>
              <Stack space={5} alignItems={"center"}>
                <Button onPress={pickProofOfWorkImage} width={"full"}>Upload a photo of your permission to work</Button>
                {proofOfWork && (
                  <Image source={{ uri: proofOfWork }} w={"32"} h={"32"} alt="Proof Of Work"/>
                )}
              </Stack>
              <Stack>
                <FormControl.Label _text={{ color: "black", fontSize: "md" }}>
                  Is there anything else you would like to share with us or that you think is important for us to know about you ?
                </FormControl.Label>
                <Stack p={2}>
                  <TextArea
                    autoCompleteType
                    h={20}
                    placeholder="Describe anything about you"
                    fontSize={"lg"}
                  />
                </Stack>
              </Stack>
              <Button>Register</Button>
            </Stack>
          </FormControl>
        </Center>
      </Box>
    </ScrollView>
  );
}
