import { Heading, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getToken, mainUrl } from "../assets/data";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Toaster, toaster } from "../components/ui/toaster";

type Order = {
  _id: string;
  user: {
    username: string;
    country: string;
    phone: string;
  };
  totalPrice: number;
  address: string;
  orderStatus: string;
  paymentMethod: string;
};

export default function AllOrders() {
  const { token, _id } = getToken();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(mainUrl + "get-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setOrders(data);
        console.log(data);
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
      const { data } = await axios.delete(mainUrl + `delete-order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
      setOrders((prev) => prev?.filter((order) => order._id !== id));
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
        All Orders
      </Heading>
      {loading ? (
        <VStack justifyContent="center" h="200px">
          <Spinner
            borderWidth={5}
            w="100px"
            h="100px"
            animationDuration="750ms"
          />
          <Text>Loading...</Text>
        </VStack>
      ) : orders?.length ? (
        <Table.ScrollArea maxW="calc(100vw - 100px - 3rem)">
          <Table.Root
            variant="outline"
            showColumnBorder
            border="1px solid #eee"
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>No.</Table.ColumnHeader>
                <Table.ColumnHeader>Username</Table.ColumnHeader>
                <Table.ColumnHeader>Phone</Table.ColumnHeader>
                <Table.ColumnHeader>Country</Table.ColumnHeader>
                <Table.ColumnHeader>Payment Method</Table.ColumnHeader>
                <Table.ColumnHeader>Order Status</Table.ColumnHeader>
                <Table.ColumnHeader>Address</Table.ColumnHeader>
                <Table.ColumnHeader>Total Price</Table.ColumnHeader>
                <Table.ColumnHeader>Action</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {orders.map((order, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{order.user.username}</Table.Cell>
                  <Table.Cell>{order.user.phone}</Table.Cell>
                  <Table.Cell>{order.user.country}</Table.Cell>
                  <Table.Cell>{order.paymentMethod}</Table.Cell>
                  <Table.Cell>{order.orderStatus}</Table.Cell>
                  <Table.Cell>{order.address}</Table.Cell>
                  <Table.Cell>{order.totalPrice}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => handleDelete(order._id)}
                      colorPalette="red"
                      size="xs"
                    >
                      Delete Order
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={8}>Total Orders</Table.Cell>
                <Table.Cell>{orders.length}</Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table.Root>
        </Table.ScrollArea>
      ) : (
        <Heading>No Orders Here</Heading>
      )}
      <Toaster />
    </>
  );
}
