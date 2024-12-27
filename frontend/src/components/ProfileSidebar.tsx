import { Link, List, Text } from "@chakra-ui/react";
import { AdminProfileLinks, getToken, ProfileLinks } from "../assets/data";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MdLogout } from "react-icons/md";
import Cookies from "universal-cookie";
import UserDialogUpdateData from "./UserDialogUpdateData";

export default function ProfileSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { role } = getToken();
  return (
    <>
      <List.Root padding={2} alignContent="flex-start" display="grid" gap={2}>
        {(role === "user"
          ? ProfileLinks
          : [...ProfileLinks, ...AdminProfileLinks]
        ).map((value, index) => (
          <List.Item key={index}>
            <Link
              fontSize={20}
              href={value.path}
              padding=".5rem 1rem"
              className="center-y"
              transitionDuration="300ms"
              _hover={{ color: "red.500", bgColor: "red.50" }}
              color={pathname === value.path ? "red.500" : "black"}
              bgColor={pathname === value.path ? "red.50" : "transparent"}
            >
              <value.Icon />
              <Text display={{ base: "none", lg: "inline" }} as="span">
                {value.title}
              </Text>
            </Link>
          </List.Item>
        ))}
        <List.Item>
          <Button
            size="sm"
            onClick={() => {
              cookies.remove("token", { path: "/" });
              navigate("/");
            }}
            colorPalette="red"
            w="full"
          >
            <MdLogout />{" "}
            <Text as="span" display={{ base: "none", lg: "inline" }}>
              Logout
            </Text>
          </Button>
        </List.Item>
        <List.Item>
          <UserDialogUpdateData />
        </List.Item>
      </List.Root>
    </>
  );
}
