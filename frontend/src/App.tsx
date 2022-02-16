import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import PropertyItem from "./components/PropertyItem";

const App = () => {
  const [searchUrl, setSearchUrl] = useState(
    "https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E599&minBedrooms=2&maxPrice=300000&minPrice=100000&propertyTypes=&includeSSTC=false&mustHave=&dontShow=&furnishTypes=&keywords="
  );
  const [address, setAddress] = useState("Soho Square London");

  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    const url = `http://localhost:5000/properties?url=${encodeURIComponent(
      searchUrl
    )}&address=${address}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      setProperties(JSON.parse(json["properties"]));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(properties);

  return (
    <Box mx={16}>
      <Heading>rightermove</Heading>

      <InputGroup my={2}>
        <InputLeftAddon children="URL" />
        <Input
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
        />
      </InputGroup>

      <InputGroup my={2}>
        <InputLeftAddon children="Address" />
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </InputGroup>

      <Button onClick={() => fetchData()}>Search</Button>

      <Stack my={4}>
        <Text>{properties.length} results</Text>
        {properties.map((property: Property, i) => {
          return (
            <Box
              key={i}
              backgroundColor={i % 2 === 0 ? "lightgray" : "white"}
              p={4}
            >
              <PropertyItem property={property} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default App;
