import {
  Box,
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { categories, Featureds, Features } from "../assets/data";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <Box
        as="section"
        id="hero"
        height="calc(100vh - 72px)"
        bgImage="url(/hero.webp)"
        bgSize="cover"
        bgRepeat={"no-repeat"}
        bgPos="center"
        bgColor={"rgb(0 0 0 / .45)"}
        bgBlendMode={"darken"}
        className="center-y"
        justifyContent={{ base: "center", md: "start" }}
      >
        <Container>
          <Box color="white" textAlign={{ base: "center", md: "start" }}>
            <Heading as="h2" fontWeight="bold" fontSize="5xl">
              Savor the Flavor
            </Heading>
            <Text marginY={8} fontSize={20}>
              Delight in every bite with our gourmet selections.
            </Text>
            <Button
              onClick={() => navigate("/Products")}
              size="lg"
              colorPalette="red"
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Featured Restaurant */}
      <Box id="featured-restaurant" marginY="24">
        <Container>
          <Heading
            as="h2"
            textShadow="2px 2px 2px #ff6347"
            size="4xl"
            marginBottom={6}
            textAlign="center"
          >
            Featured Restaurants
          </Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            gap={4}
          >
            {Featureds.map((feature, index) => (
              <GridItem
                key={index}
                display="flex"
                justifyContent="space-between"
                flexDir={{ base: "column", md: "row" }}
                gap={2}
                boxShadow="0px 0px 1.5px #171a1f12, 0px 0px 2px #171a1f1F"
              >
                <Box padding={4} textAlign={{ base: "center", md: "start" }}>
                  <Heading size="3xl" marginBottom={2} as="h3">
                    {feature.title}
                  </Heading>
                  <Text color="gray.500">{feature.desc}</Text>
                </Box>
                <Image
                  src={`/${feature.image}`}
                  alt="Image"
                  width={{ base: "100%", md: "200px" }}
                  height={"200px"}
                />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Features */}
      <Box id="features" marginY={24}>
        <Container>
          <Heading
            as="h2"
            size="4xl"
            textShadow="2px 2px 2px #ff6347"
            marginBottom={6}
            textAlign="center"
          >
            Features
          </Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {Features.map((feature) => (
              <GridItem
                border="1px solid #F3F4F6FF"
                padding={8}
                boxShadow="0px 0px 1.5px #171a1f12, 0px 0px 2px #171a1f1F"
                key={feature.title}
                textAlign={{ base: "center", md: "start" }}
              >
                <Box
                  width="fit-content"
                  mx="auto"
                  bg={feature.bg}
                  padding={4}
                  borderRadius={4}
                  marginBottom={3}
                  fontSize={70}
                >
                  <feature.icon color={feature.color} />
                </Box>
                <Heading as="h5">{feature.title}</Heading>
                <Text color="gray.500" marginY={3} as="small" display="block">
                  {feature.category}
                </Text>
                <Text color="gray.500">{feature.desc}</Text>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Categories */}
      <Box id="categories" marginY={24}>
        <Container>
          <Heading
            as="h2"
            size="4xl"
            textShadow="2px 2px 2px #ff6347"
            marginBottom={6}
            textAlign="center"
          >
            Categories
          </Heading>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {categories.map((category) => (
              <GridItem key={category.title}>
                <Card.Root borderWidth="2px" boxShadow="0px 0px 3px 2.5px #eee">
                  <Card.Header padding={0}>
                    <Image
                      src={category.image}
                      borderTopRadius="4px"
                      alt={category.title}
                      height={250}
                      width="100%"
                    />
                  </Card.Header>

                  <Card.Title
                    paddingY={4}
                    fontSize={24}
                    textAlign="center"
                    as="h3"
                  >
                    {category.title}
                  </Card.Title>
                </Card.Root>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
