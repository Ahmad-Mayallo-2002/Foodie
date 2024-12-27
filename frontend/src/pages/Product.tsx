import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Group,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { StepperInput } from "../components/ui/stepper-input";
import { SegmentedControl } from "../components/ui/segmented-control";
import { useEffect, useState } from "react";
import { getToken, mainUrl, MyProduct } from "../assets/data";
import axios from "axios";
import { toaster, Toaster } from "../components/ui/toaster";

export default function Product() {
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [size, setSize] = useState<string>("md");
  const [amount, setAmount] = useState<number>(1);
  const { token, _id } = getToken();
  const [product, setProduct] = useState<MyProduct>({
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
  });
  const handleAddToCart = async (id: string | undefined) => {
    try {
      const { data } = await axios.post(
        mainUrl + `add-to-cart/${id}`,
        {
          product: id,
          amount: amount,
          size: size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      toaster.success({
        type: "success",
        title: "Done",
        description: data.msg,
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error: any) {
      toaster.error({
        type: "error",
        title: "Error",
        description: error.response.data.msg,
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + `get-products/${id}`);
        setTotalPrice(data?.price);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleAddToFavorites = async (id: string | undefined) => {
    try {
      const { data } = await axios.post(
        mainUrl + `add-to-favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      toaster.success({
        type: "success",
        description: data.msg,
        title: "Done",
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error: any) {
      toaster.error({
        type: "error",
        title: "Error",
        description: error.response.data.msg,
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      console.log(error);
    }
  };
  return (
    <Box marginY={24}>
      <Container>
        <Grid gap={4} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          <GridItem>
            <Image
              src={product?.image}
              alt={product?.name}
              height="400px"
              width="full"
            />
          </GridItem>
          <GridItem padding={4} paddingTop={0} display="grid" gap={3}>
            <Heading size="3xl" color="red.600">
              Name: {product?.name}
            </Heading>
            <Text color="gray.600" lineHeight={2}>
              Description: {product?.description}
            </Text>
            <Text color="gray.600" lineHeight={2}>
              Price {product?.price}$
            </Text>
            <Text textTransform="capitalize" color="gray.600" lineHeight={2}>
              Total Price: {totalPrice.toFixed(2)}$
            </Text>
            <Text textTransform="capitalize" color="gray.600" lineHeight={2}>
              Category: {product?.category}
            </Text>
            <Grid gap={4}>
              <StepperInput
                min={1}
                defaultValue="1"
                onValueChange={(event) => {
                  setTotalPrice((prev) => prev * event.valueAsNumber);
                  setAmount(event.valueAsNumber);
                }}
              />
              <SegmentedControl
                cursor="pointer"
                width="fit-content"
                items={["sm", "md", "lg"]}
                defaultValue={size}
                onValueChange={(event) => setSize(event.value)}
              />
              <Group display="block" attached colorPalette="red">
                <Button variant="outline" onClick={() => handleAddToCart(id)}>
                  Add To Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAddToFavorites(id)}
                >
                  Add To Favorites
                </Button>
              </Group>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
      <Toaster />
    </Box>
  );
}
