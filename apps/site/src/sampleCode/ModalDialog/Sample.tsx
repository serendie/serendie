import { ModalDialog, Button } from "@serendie/ui";
import { useState } from "react";

export function Sample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Dialog
      </Button>
      <ModalDialog
        cancelButtonLabel="Close"
        submitButtonLabel="Button"
        title="Dialog Title"
        isOpen={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        onButtonClick={() => {
          alert("👋");
          setIsOpen(false);
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </ModalDialog>
    </div>
  );
}
