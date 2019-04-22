import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("<Home />", () => {
  it("Renders without crashing", () => {
    shallow(<Home />);
  });
});
