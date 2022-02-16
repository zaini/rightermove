import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import PropertyItem from "./components/PropertyItem";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const App = () => {
  const [searchUrl, setSearchUrl] = useState(
    "https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E599&minBedrooms=2&maxPrice=300000&minPrice=100000&propertyTypes=&includeSSTC=false&mustHave=&dontShow=&furnishTypes=&keywords="
  );
  const [address, setAddress] = useState("Soho Square London");
  const [properties, setProperties] = useState([]);
  const [sortType, setSortType] = useState("price");
  const [increasingSort, setIncreasingSort] = useState(true);

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

  const sortProperties = () => {
    let sortedProperties = properties.sort((a, b) => {
      if (increasingSort) {
        return b[sortType] - a[sortType];
      }
      return a[sortType] - b[sortType];
    });
    setProperties(sortedProperties);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sortProperties();
  }, [sortType, increasingSort]);

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

      <InputGroup my={2}>
        <InputLeftAddon children="Sort by" />
        <Select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="price">Price</option>
          <option value="travel_time">Travel Time</option>
          <option value="number_bedrooms">Bedrooms</option>
        </Select>
      </InputGroup>

      <Box>
        Sort direction:{" "}
        <IconButton
          my={2}
          aria-label="Sort direction"
          icon={increasingSort ? <ArrowUpIcon /> : <ArrowDownIcon />}
          onClick={() => setIncreasingSort(!increasingSort)}
        />
      </Box>

      <Stack my={4}>
        <Text>{properties.length} results</Text>
        {properties.length > 0 ? (
          properties.map((property: Property, i) => {
            return (
              <Box
                key={i}
                backgroundColor={i % 2 === 0 ? "lightgray" : "white"}
                p={4}
              >
                <PropertyItem property={property} />
              </Box>
            );
          })
        ) : (
          <Text>Loading properties...</Text>
        )}
      </Stack>
    </Box>
  );
};

export default App;
