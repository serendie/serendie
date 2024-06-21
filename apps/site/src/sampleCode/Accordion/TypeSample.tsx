import { Accordion, AccordionGroup } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl variant="dim">
      <Dt>Trailing Icon</Dt>
      <Dd>
        <AccordionGroup>
          <Accordion
            title="タイトル"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </AccordionGroup>
      </Dd>
      <Dt>Heading Icon</Dt>
      <Dd>
        <AccordionGroup>
          <Accordion
            title="タイトル"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            isLeftIcon
          />
        </AccordionGroup>
      </Dd>
    </Dl>
  );
}
