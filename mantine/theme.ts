"use client";

import { Button, createTheme, MantineColorsTuple, Text } from "@mantine/core";

import buttonClasses from "./component-styles/button.module.css";
import textClasses from "./component-styles/text.module.css";

const gold: MantineColorsTuple = [
  "#fff9e0",
  "#fff2cb",
  "#fee49b",
  "#fcd566",
  "#fbc83a",
  "#fac01d",
  "#fabb08",
  "#dfa400",
  "#c69200",
  "#ac7d00",
];

const blue: MantineColorsTuple = [
  "#e6f3ff",
  "#cce7ff",
  "#99ceff",
  "#66b5ff",
  "#339cff",
  "#0083ff",
  "#0076e6",
  "#0066cc",
  "#0055b3",
  "#004499",
];

export const theme = createTheme({
  fontFamily: "Poppins, serif",
  colors: { gold, blue },
  components: {
    Button: Button.extend({ classNames: buttonClasses }),
    Text: Text.extend({ classNames: textClasses }),
  },
});
