import { CgProfile } from "react-icons/cg";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { Button } from "./ui/button";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getToken, mainUrl } from "../assets/data";
import axios from "axios";

type User = {
  username: string;
  email: string;
  country: string;
  phone: string;
};

export default function UserMenu() {
  const { token, _id } = getToken();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    country: "",
    phone: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(mainUrl + `get-users/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            id: _id,
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <MenuRoot>
      <MenuTrigger outline={0} asChild>
        <Button
          variant="outline"
          className="center-y"
          gap={2}
          colorPalette="black"
        >
          <CgProfile /> <Text>Me</Text>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="1">Username: {user.username}</MenuItem>
        <MenuItem value="2">Email: {user.email}</MenuItem>
        <MenuItem value="3">Country: {user.country}</MenuItem>
        <MenuItem value="4">Phone: {user.phone}</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
