import { Component, createElement } from "react";
import { ToolBoxHeader } from "../ToolBoxHeader";
import { ToolBoxList } from "../ToolBoxList";
import { ToolBoxGroup } from "../ToolBoxGroup";
import { ToolBoxButton } from "../ToolBoxButton";
import { ToolBoxGroupButtonGroup } from "../ToolBoxGroupButtonGroup";

export class ToolBox extends Component {
  render() {
    return (
      <div>
        <ToolBoxHeader />
        <ToolBoxList>
          <ToolBoxGroup>
            <ToolBoxGroupButtonGroup>
              <ToolBoxButton />
              <ToolBoxButton />
            </ToolBoxGroupButtonGroup>
          </ToolBoxGroup>
        </ToolBoxList>
      </div>
    );
  }
}
