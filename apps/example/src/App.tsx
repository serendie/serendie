import { Button, Switch } from "@serendie/ui";
import { Center, HStack } from "@serendie/ui/jsx";
import { css } from "@serendie/ui/css";

function App() {
  return (
    <>
      <h1 className={css()}>Example</h1>
      <Center>
        <HStack mt={20}>
          <Button mt={10} variant={"secondary"}>
            Secondary
          </Button>
          <div>
            <Switch />
          </div>
        </HStack>
      </Center>
    </>
  );
}

export default App;
