import { Card, Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { getToken, mainUrl, MyProduct } from "../assets/data";
import axios from "axios";
import { toaster, Toaster } from "../components/ui/toaster";

export default function ProfileFavorites() {
  const { token, _id } = getToken();
  const [favorites, setFavorites] = useState<MyProduct[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + "get-user-favorite", {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setFavorites(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleRemoveFromFavorites = async (id: string) => {
    try {
      const { data } = await axios.delete(
        mainUrl + `delete-from-favorites/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        }
      );
      toaster.success({
        title: "Success",
        type: "success",
        description: data.msg,
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      setFavorites((prev) => prev?.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Heading size="3xl" marginBottom={4}>
        My Favorites
      </Heading>
      <Grid
        gridTemplateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {favorites?.length ? (
          favorites.map((value) => (
            <GridItem key={value._id}>
              <Card.Root>
                <Card.Header p={0}>
                  <Image
                    src={value.image}
                    alt={value.name}
                    h="200px"
                    w="full"
                  />
                </Card.Header>
                <Card.Body padding={2}>
                  <Card.Title>{value.name}</Card.Title>
                  <Card.Description>Price: {value.price}</Card.Description>
                </Card.Body>
                <Card.Footer paddingTop={0} padding={2}>
                  <Button
                    onClick={() => handleRemoveFromFavorites(String(value._id))}
                    colorPalette="red"
                    w="full"
                  >
                    Remove From Favorites
                  </Button>
                </Card.Footer>
              </Card.Root>
            </GridItem>
          ))
        ) : (
          <>
            <Heading size="3xl">No Favorites Products</Heading>
          </>
        )}
      </Grid>
      <Toaster />
    </>
  );
}
