import React from "react";
import Joyride from "react-joyride";

export default function PageGuide() {
  return (
    <Joyride
      run={true}
      callback={() => null}
      steps={[
        {
          content:
            "Double click or press enter on this cell to open the DropDownEditor",
          target: ".react-grid-Cell:last-child"
        }
      ]}
    />
  );
}
