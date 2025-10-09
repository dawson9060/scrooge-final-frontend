"use client";

import { Box, Group, Text } from "@mantine/core";

import classes from "./ScrollingText.module.css";

export const ScrollingText = () => {
  const scroogeSayings = [
    "Three square meals a day is not settled science",
    "These sayings are as unecessary as your student loans",
    "Beware of little expenses; a small leak will sink a great ship",
    "Fun is temporary, money is eternal",
    "Chase your dreams, but not with my money",
    "A fool and his money are soon parted",
    "The lack of money is the root of all evil",
    "It's not how much money you make, but how much money you keep",
  ];

  return (
    <Group w="100%" data-animated="true" className={`scroll ${classes.scroll}`}>
      <Box className={classes.tagList}>
        {scroogeSayings.concat(scroogeSayings).map((saying, index) => (
          <Box key={index}>
            <Text>{saying}</Text>
          </Box>
        ))}
      </Box>
    </Group>
  );
};
