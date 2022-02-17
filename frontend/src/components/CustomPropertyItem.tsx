import React from "react";
import {
  Box,
  Text,
  ButtonGroup,
  IconButton,
  Link,
  Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { BsMap } from "react-icons/bs";
import { CustomProperty, Image } from "../types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomPropertyItem = ({ property }: { property: CustomProperty }) => {
  return (
    <>
      <Box fontSize={20} mb={2}>
        <Text fontSize={28} fontWeight="bold">
          £{property.price || "N/A"}
        </Text>
        <Text>
          {property.bedrooms || "N/A"}x 🛏 | {property.bathrooms || "N/A"}x 🛁
        </Text>
        <Text fontSize={16}>{property.propertyTypeFullDescription}</Text>
        <Text fontSize={16}>{property.summary}</Text>
        <Text>{property.displayAddress}</Text>
        <Text>
          {property.travel_time === -1 ? "N/A" : property.travel_time} minutes
          travel
        </Text>
      </Box>
      <ButtonGroup>
        <IconButton
          aria-label="View on RightMove"
          icon={<ExternalLinkIcon />}
          as={Link}
          href={`https://www.rightmove.co.uk${property.propertyUrl}`}
          target="_blank"
        />
        <IconButton
          aria-label="View on Google Maps"
          icon={<BsMap />}
          as={Link}
          href={`https://www.google.co.uk/maps/place/${property.displayAddress}`}
          target="_blank"
        />
      </ButtonGroup>
      <Center>
        <Box w="50%">
          <Carousel>
            {property.propertyImages.images.map((e: Image) => {
              return (
                <div>
                  <img src={e.srcUrl} />
                </div>
              );
            })}
          </Carousel>
        </Box>
      </Center>
    </>
  );
};

export default CustomPropertyItem;
