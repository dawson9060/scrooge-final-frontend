import { Loader, Stack } from "@mantine/core";

const Loading = () => {
  return (
    <Stack h="100vw" w="100vw" justify="center" align="center">
      <Loader size="xl" />
    </Stack>
  );
};

export default Loading;
