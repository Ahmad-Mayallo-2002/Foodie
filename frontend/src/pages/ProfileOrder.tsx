import { Box, Group, Heading, Spinner, Table } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { getToken, mainUrl } from "../assets/data";
import axios from "axios";
import { Toaster, toaster } from "../components/ui/toaster";

type Order = {
  _id: string;
  totalPrice: number;
  createdAt: string;
  items: { product: string; amount: number; size: string }[];
  orderStatus: string;
  paymentMethod: string;
  address: string;
};

export default function ProfileOrder() {
  const { token, _id } = getToken();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(mainUrl + "get-user-order", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setOrders(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  const handleFilterOrders = async (id: string, status: string) => {
    try {
      const { data } = await axios.patch(
        mainUrl + `update-order-status/${id}`,
        { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      setOrders((prev) => prev?.filter((value) => value._id !== id));
      toaster.success({
        title: "Success",
        duration: 2000,
        description: data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Heading size="3xl" marginBottom={4}>
        My Orders
      </Heading>
      {loading ? (
        <Box textAlign="center" mt={20}>
          <Spinner size="xl" borderWidth={5} />
        </Box>
      ) : !orders?.length ? (
        <Heading size="3xl">No Orders Here</Heading>
      ) : (
        <Table.ScrollArea maxW="calc(100vw - 100px - 3rem)">
          <Table.Root
            w="full"
            variant="outline"
            border="1px solid"
            borderColor="gray.200"
            interactive
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>No.</Table.ColumnHeader>
                <Table.ColumnHeader>Total Price</Table.ColumnHeader>
                <Table.ColumnHeader>Payment Method</Table.ColumnHeader>
                <Table.ColumnHeader>Ordered At</Table.ColumnHeader>
                <Table.ColumnHeader>Address</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {orders?.map((value, index) => (
                <Table.Row key={value._id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{value.totalPrice.toFixed(2)}$</Table.Cell>
                  <Table.Cell>{value.paymentMethod}</Table.Cell>
                  <Table.Cell>
                    {new Date(value.createdAt).toLocaleDateString()} <br />
                    {new Date(value.createdAt).toLocaleTimeString()}
                  </Table.Cell>

                  <Table.Cell>{value.address}</Table.Cell>
                  <Table.Cell>
                    <Group attached>
                      <Button
                        onClick={() =>
                          handleFilterOrders(value._id, "cancelled")
                        }
                        size="xs"
                        colorPalette="red"
                      >
                        Cancelled
                      </Button>
                      <Button
                        onClick={() =>
                          handleFilterOrders(value._id, "delivered")
                        }
                        colorPalette="green"
                        size="xs"
                      >
                        Delivered
                      </Button>
                    </Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}
      <Toaster />
    </>
  );
}
