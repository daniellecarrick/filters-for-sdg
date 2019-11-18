import { configure, addParameters } from "@storybook/react";
import "../src/styles/global.css";

addParameters({
  options: {
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
  },
});

configure(
  [
    require.context("../src", true, /stories\.js$/),
    require.context("../src", true, /stories\.mdx$/),
  ],
  module
);
