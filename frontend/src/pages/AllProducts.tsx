import {
  Card,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getToken, mainUrl, MyProduct } from "../assets/data";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Toaster, toaster } from "../components/ui/toaster";

export default function AllProducts() {
  const { token, _id } = getToken();
  const [products, setProducts] = useState<MyProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(mainUrl + "get-products", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setProducts(data.products);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(mainUrl + `delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toaster.success({
        title: "Success",
        duration: 2000,
        description: data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error: any) {
      console.log(error);
      toaster.error({
        title: "Error",
        duration: 2000,
        description: error.response.data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    }
  };
  return (
    <>
      <Heading size="3xl" marginBottom={4}>
        All Products
      </Heading>
      {loading ? (
        <VStack h="200px" justifyContent="center">
          <Spinner borderWidth={5} w={100} h={100} animationDuration="750ms" />
          <Text>Loading...</Text>
        </VStack>
      ) : products?.length ? (
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {products?.map((product) => (
            <GridItem key={product._id}>
              <Card.Root>
                <Card.Header p="0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    h="200px"
                    w="full"
                  />
                </Card.Header>
                <Card.Body p="2">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Description>Price: {product.price}</Card.Description>
                  <Card.Description>
                    Category: {product.category}
                  </Card.Description>
                </Card.Body>
                <Card.Footer p="2" pt="0" display="grid">
                  <Button
                    onClick={() => handleDelete(String(product._id))}
                    w="full"
                    colorPalette="red"
                  >
                    Delete Product
                  </Button>
                  <Button w="full" colorPalette="blue">
                    Update Product
                  </Button>
                </Card.Footer>
              </Card.Root>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Heading size="3xl">No Products</Heading>
      )}
      <Toaster />
    </>
  );
}
