import React from "react";
import { Box, Text, ButtonGroup, IconButton, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { BsMap } from "react-icons/bs";

const PropertyItem = ({ property }: { property: Property }) => {
  return (
    <>
      <Box fontSize={20} mb={2}>
        <Text fontSize={28} fontWeight="bold">
          £{property.price || "N/A"}
        </Text>
        <Text>{property.number_bedrooms || "N/A"}x 🛏</Text>
        <Text>{property.type}</Text>
        <Text>{property.address}</Text>
        <Text>{property.travel_time} minutes travel</Text>
      </Box>
      <ButtonGroup>
        <IconButton
          aria-label="View on RightMove"
          icon={<ExternalLinkIcon />}
          as={Link}
          href={property.url}
          target="_blank"
        />
        <IconButton
          aria-label="View on Google Maps"
          icon={<BsMap />}
          as={Link}
          href={`https://www.google.co.uk/maps/place/${property.address}`}
          target="_blank"
        />
      </ButtonGroup>
    </>
  );
};

export default PropertyItem;
