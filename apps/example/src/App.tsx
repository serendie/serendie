import { Button } from "@spread/ui";
import { Center, HStack } from "@spread/ui/jsx";
import { css } from "@spread/ui/css";

function App() {
  return (
    <>
      <h1 className={css()}>Example</h1>
      <Center>
        <HStack mt={100}>
          <Button variant="primary">Button</Button>
        </HStack>
      </Center>
    </>
  );
}

export default App;
