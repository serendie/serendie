import { Button, Button2, Switch } from "@spread/ui";
import { Center, HStack } from "@spread/ui/jsx";
import { css } from "@spread/ui/css";

function App() {
  return (
    <>
      <h1 className={css()}>Example</h1>
      <Center>
        <HStack mt={20}>
          <Button mt={10} variant={"secondary"}>
            Secondary
          </Button>
          <Button2 />
          <div>
            <Switch />
          </div>
        </HStack>
      </Center>
    </>
  );
}

export default App;
