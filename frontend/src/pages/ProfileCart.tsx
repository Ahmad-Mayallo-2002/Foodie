import {
  Box,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  createListCollection,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { getToken, mainUrl, MyProduct } from "../assets/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Toaster, toaster } from "../components/ui/toaster";
import { Field } from "../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { useForm } from "react-hook-form";

type ProductCart = {
  product: MyProduct;
  amount: number;
  size: string;
};

type CreditCardDetails = {
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  cardHolderName: string;
};

type PaypalDetails = {
  payerId: string;
  payerEmail: string;
};

type Order = {
  items: Array<{ product: string; amount: number; size: string }>;
  totalPrice: number;
  address: string;
  paymentMethod: string;
  creditCardDetails?: CreditCardDetails;
  paypalDetails?: PaypalDetails;
};

export default function ProfileCart() {
  const { token, _id } = getToken();
  const [cart, setCart] = useState<ProductCart[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<string>("Cash");
  const [items, setItems] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>();
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + "get-user-cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setCart(data.items);
        let totalPrice: number = 0;
        let items = [];
        for (let i = 0; i < data.items.length; i++) {
          totalPrice += data.items[i].amount * data.items[i].product.price;
          items.push({
            product: data.items[i].product._id,
            amount: data.items[i].amount,
            size: data.items[i].size,
          });
        }
        setItems(items);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleDeleteFromCart = async (id: string) => {
    try {
      const { data } = await axios.delete(mainUrl + `delete-from-cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
      setCart((prev) => {
        let newValue = prev?.filter((product) => product.product._id !== id);
        let newPrice: number = 0;
        if (newValue)
          for (let i = 0; i < newValue?.length; i++)
            newPrice += newValue[i].amount * newValue[i].product.price;
        setTotalPrice(newPrice);
        return newValue;
      });
      toaster.success({
        title: "Success",
        description: data.msg,
        type: "success",
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error: any) {
      toaster.error({
        title: "Error",
        description: error.response.data.msg,
        type: "error",
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      console.log(error);
    }
  };
  const frameworks = createListCollection({
    items: [
      { label: "Cash", value: "Cash" },
      { label: "Credit Card", value: "Credit Card" },
      { label: "Paypal", value: "Paypal" },
    ],
  });
  const onSubmit = async (order: Order) => {
    order.totalPrice = Number(totalPrice.toFixed(2));
    order.items = items;
    try {
      if (!items.length) {
        toaster.error({
          type: "Error",
          description: "Cart is Empty",
          duration: 2000,
          action: {
            label: "Close",
            onClick() {},
          },
        });
        return;
      }
      setLoading(true);
      const { data } = await axios.post(mainUrl + "add-order", order, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
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
      setLoading(false);
      toaster.error({
        title: "Error",
        duration: 2000,
        description: error.response.data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Heading size="3xl" marginBottom={4}>
        My Carts
      </Heading>
      <Grid
        gridTemplateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {cart?.length ? (
          cart?.map((product, index) => (
            <GridItem key={index}>
              <Card.Root>
                <CardHeader padding={0}>
                  <Image
                    src={product.product.image}
                    alt={product.product.name}
                    height="200px"
                    w="full"
                  />
                </CardHeader>
                <CardBody padding={2}>
                  <CardTitle marginBottom={1}>{product.product.name}</CardTitle>
                  <CardDescription as="div" display="grid" gap={1}>
                    <Text>Price: {product.product.price}$</Text>
                    <Text>Amount: {product.amount}</Text>
                    <Text>
                      Total Price:{" "}
                      {(
                        product.amount && product.amount * product.product.price
                      )?.toFixed(2)}
                      $
                    </Text>
                  </CardDescription>
                </CardBody>
                <CardFooter padding={2} paddingTop={2}>
                  <Button
                    onClick={() =>
                      handleDeleteFromCart(String(product.product._id))
                    }
                    w="full"
                    colorPalette="red"
                  >
                    Remove From Cart
                  </Button>
                </CardFooter>
              </Card.Root>
            </GridItem>
          ))
        ) : (
          <GridItem
            fontSize="36px"
            gridColumn="1/-1"
            textAlign="center"
            mt={12}
          >
            Cart is Empty
          </GridItem>
        )}
      </Grid>
      <Box
        mt="4"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        display="grid"
        gap={4}
      >
        <Heading as="h3" size="2xl">
          Total Price: {totalPrice.toFixed(2)}$
        </Heading>
        {/* Address */}
        <Field
          label="Address"
          invalid={Boolean(errors.address)}
          errorText={errors.address?.message}
        >
          <Input
            autoComplete="off"
            {...register("address", {
              required: "Address is Required",
            })}
            placeholder="Write Your Address"
          />
        </Field>
        {/* Select Payment Method */}
        <Field
          errorText={errors.paymentMethod?.message}
          invalid={Boolean(errors.paymentMethod)}
        >
          <SelectRoot
            onValueChange={(event) => setPayment(String(event.value))}
            collection={frameworks}
            {...register("paymentMethod", {
              required: "Payment Method is Required",
            })}
          >
            <SelectLabel>Select Payment Method</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((value) => (
                <SelectItem key={value.label} item={value.value}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
        {/* Credit Card Details */}
        {payment === "Credit Card" && (
          <>
            {/* Card Number */}
            <Field
              label="Card Number"
              invalid={Boolean(errors.creditCardDetails?.cardNumber)}
              errorText={errors.creditCardDetails?.cardNumber?.message}
            >
              <Input
                {...register("creditCardDetails.cardNumber", {
                  required: {
                    value: payment === "Credit Card",
                    message: "Credit Card Number is Required",
                  },
                })}
                placeholder="Write Credit Card Number"
              />
            </Field>
            {/* Card Expiry */}
            <Field
              label="Card Expiry"
              errorText={errors.creditCardDetails?.cardExpiry?.message}
              invalid={Boolean(errors.creditCardDetails?.cardExpiry)}
            >
              <Input
                {...register("creditCardDetails.cardExpiry", {
                  required: {
                    value: payment === "Credit Card",
                    message: "Credit Card Expiry Date is Required",
                  },
                })}
                placeholder="Write Credit Card Expiry"
              />
            </Field>
            {/* Card CVV */}
            <Field
              label="Card CVV"
              invalid={Boolean(errors.creditCardDetails?.cardCVV)}
              errorText={errors.creditCardDetails?.cardCVV?.message}
            >
              <Input
                {...register("creditCardDetails.cardCVV", {
                  required: {
                    value: payment === "Credit Card",
                    message: "Credit Card CVV is Required",
                  },
                })}
                placeholder="Write Card CVV"
              />
            </Field>
            {/* Card Holder Name */}
            <Field
              label="Card Holder Name"
              invalid={Boolean(errors.creditCardDetails?.cardHolderName)}
              errorText={errors.creditCardDetails?.cardHolderName?.message}
            >
              <Input
                {...register("creditCardDetails.cardHolderName", {
                  required: {
                    value: payment === "Credit Card",
                    message: "Credit Card Holder Name is Required",
                  },
                })}
                placeholder="Write Card Holder Name"
              />
            </Field>
          </>
        )}
        {/* Paypal Details */}
        {payment === "Paypal" && (
          <>
            {/* Payer Id */}
            <Field
              label="Payer Id"
              invalid={Boolean(errors.paypalDetails?.payerId)}
              errorText={errors.paypalDetails?.payerId?.message}
            >
              <Input
                {...register("paypalDetails.payerId", {
                  required: {
                    value: payment === "Paypal",
                    message: "Paypal Payer Id is Required",
                  },
                })}
                placeholder="Write Payer Id"
              />
            </Field>
            {/* Payer Email */}
            <Field
              label="Payer Email"
              invalid={Boolean(errors.paypalDetails?.payerEmail)}
              errorText={errors.paypalDetails?.payerEmail?.message}
            >
              <Input
                {...register("paypalDetails.payerEmail", {
                  required: {
                    value: payment === "Paypal",
                    message: "Paypal Payer Email is Required",
                  },
                })}
                placeholder="Write Payer Email"
              />
            </Field>
          </>
        )}
        {/* Submit */}
        <Button
          colorPalette="blue"
          w="full"
          type="submit"
          loading={loading}
          loadingText="Loading..."
        >
          Order Now
        </Button>
      </Box>
      <Toaster />
    </>
  );
}
