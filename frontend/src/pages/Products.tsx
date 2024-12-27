import {
  Box,
  Card,
  Container,
  Grid,
  GridItem,
  Group,
  Heading,
  Image,
  List,
  Text,
} from "@chakra-ui/react";
import Hero from "../components/Hero";
import { categoriesList, mainUrl, MyProduct } from "../assets/data";
import { FaAngleRight } from "react-icons/fa";

import { forwardRef, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import axios from "axios";

const ForwardedFaAngleRight = forwardRef<any>((props, ref) => (
  <span ref={ref}>
    <FaAngleRight {...props} />
  </span>
));

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<MyProduct[]>([]);
  const [length, setLength] = useState(0);
  const [skip, setSkip] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("all");
  const limit = 9;
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          mainUrl +
            `get-products?limit=${limit}&skip=${skip}&category=${currentCategory}`
        );
        setProducts(data.products);
        setLength(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [skip, currentCategory]);
  const handleFilterByCategory = (category: string) => {
    setCurrentCategory(category);
  };
  return (
    <>
      {/* Hero Section */}
      <Hero title="Order Online Menu" image={"url(./products_hero.jpg)"} />
      {/* Products */}
      <Box as="section" marginY={24} id="products">
        <Container>
          <Grid gridTemplateColumns={{ base: "1fr", lg: "350px 1fr" }} gap={4}>
            <GridItem
              padding={4}
              border="1px solid"
              borderColor="gray.400"
              borderRadius={6}
            >
              <Heading
                size="3xl"
                borderBottom="1px dashed"
                borderBottomColor="red.400"
                paddingBottom={2}
                marginBottom={3}
                position={"relative"}
                _before={{
                  position: "absolute",
                  width: "3px",
                  height: "100%",
                  bgColor: "red.500",
                  top: "0",
                  left: "0",
                  content: `""`,
                }}
              >
                <span style={{ marginLeft: "1rem" }}>Categories</span>
              </Heading>
              <List.Root variant="plain" display="grid" gap={3}>
                {categoriesList.map((category) => (
                  <List.Item
                    cursor="pointer"
                    as="button"
                    className="center-y"
                    textTransform="capitalize"
                    transitionDuration="300ms"
                    key={category}
                    _hover={{ marginLeft: "15px" }}
                    onClick={() => handleFilterByCategory(category)}
                    marginLeft={currentCategory === category ? "15px" : ""}
                  >
                    <List.Indicator color="red.400" asChild>
                      <ForwardedFaAngleRight />
                    </List.Indicator>
                    {category}
                  </List.Item>
                ))}
              </List.Root>
            </GridItem>
            <GridItem
              padding={4}
              border="1px solid"
              borderColor="gray.400"
              borderRadius={6}
              display="grid"
              gap={4}
              gridTemplateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
              }}
            >
              {products &&
                products.map((value) => (
                  <Card.Root key={value.name}>
                    <Card.Header padding={0} height="200px">
                      <Image
                        height="200px"
                        w="full"
                        src={value.image}
                        alt={value.name}
                      />
                    </Card.Header>
                    <Card.Body padding={4}>
                      <Card.Title>{value.name}</Card.Title>
                      <Text color="gray.500">{value.price}$</Text>
                    </Card.Body>
                    <Card.Footer padding={4} paddingTop={0}>
                      <Button
                        onClick={() => navigate(`/Products/${value._id}`)}
                        colorPalette="blue"
                        w="full"
                        variant="outline"
                      >
                        More
                      </Button>
                    </Card.Footer>
                  </Card.Root>
                ))}
              <PaginationRoot
                mx="auto"
                mt={3}
                variant="solid"
                gridColumn={"1 / -1"}
                count={Math.ceil(length / limit)}
                pageSize={1}
                colorPalette="red"
                onPageChange={(event) => {
                  setSkip(Number((event.page - 1) * limit));
                  console.log(Number((event.page - 1) * limit));
                }}
              >
                <Group attached>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </Group>
              </PaginationRoot>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
