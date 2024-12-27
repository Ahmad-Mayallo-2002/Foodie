import { Box, Heading } from "@chakra-ui/react";

type Content = {
  image: string;
  title: string;
};

export default function Hero({ image, title }: Content) {
  return (
    <Box
      className="center"
      height={400}
      bgImage={image}
      bgSize="cover"
      bgColor={"rgb(0 0 0 / .5)"}
      bgBlendMode="darken"
      bgPos="center"
    >
      <Heading size="5xl" textAlign="center" color="white">
        {title}
      </Heading>
    </Box>
  );
}
