import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import AnalogClock, { AnalogClockProps } from "./AnalogClock";

export default {
  title: "Example/AnalogClock",
  component: AnalogClock,
  argTypes: {
    second: {
      type: "number",
    },
    size: {
      control: {
        type: null,
      },
    },
    numerals: {
      control: {
        type: null,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "lightblue",
          padding: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<AnalogClockProps> = (args) => (
  <>
    <AnalogClock {...args} size="large" />
    <span style={{ margin: "0.5rem" }}></span>
    <AnalogClock {...args} size="medium" />
    <span style={{ margin: "0.5rem" }}></span>
    <AnalogClock {...args} size="small" />
  </>
);

const timeArgs = {
  hour: 1,
  minute: 46,
  second: 35,
};

export const Arabic = Template.bind({});
Arabic.args = {
  ...timeArgs,
  numerals: "arabic",
};

export const Roman = Template.bind({});
Roman.args = {
  ...timeArgs,
  numerals: "roman",
};

export const Notched = Template.bind({});
Notched.args = {
  ...timeArgs,
};
