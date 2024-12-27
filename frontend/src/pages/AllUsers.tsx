import { Heading, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getToken, mainUrl } from "../assets/data";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Toaster, toaster } from "../components/ui/toaster";

type User = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  country: string;
};

export default function AllUsers() {
  const { token, _id } = getToken();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(mainUrl + "get-users", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setUsers(data);
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
  const handleDeleteUser = async (id: string) => {
    try {
      const { data } = await axios.delete(mainUrl + `delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
      setUsers((prev) => prev?.filter((user) => user._id !== id));
      toaster.success({
        title: "Error",
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
        All Users
      </Heading>
      {loading ? (
        <VStack h="350px" justifyContent="center">
          <Spinner
            w="100px"
            h="100px"
            borderWidth={5}
            animationDuration="750ms"
          />
          <Text fontSize="20px">Loading...</Text>
        </VStack>
      ) : !users?.length ? (
        <Heading size="3xl">No Users</Heading>
      ) : (
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
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Phone</Table.ColumnHeader>
                <Table.ColumnHeader>Country</Table.ColumnHeader>
                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                <Table.ColumnHeader>Action</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user, index) => (
                <Table.Row key={user._id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{user.country}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => handleDeleteUser(user._id)}
                      size="sm"
                      colorPalette="red"
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={6}>Total Users: </Table.Cell>
                <Table.Cell>{users.length}</Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table.Root>
        </Table.ScrollArea>
      )}
      <Toaster />
    </>
  );
}
