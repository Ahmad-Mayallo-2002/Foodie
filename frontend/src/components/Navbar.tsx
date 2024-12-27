import { Box, Container, Heading, Image, Link, List } from "@chakra-ui/react";
import { ListLinks } from "../assets/data";
import { Button } from "./ui/button";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  return (
    <Box as="nav" id="nav" paddingY={2}>
      <Container
        className="center-y"
        justifyContent="space-between"
        flexWrap={"wrap"}
      >
        {/* Image Box */}
        <Box className="center-y" gapX={2}>
          <Image src="/logo.png" alt="Logo" />
          <Heading size="2xl" fontWeight="bold">
            Foodie Haven
          </Heading>
        </Box>
        {/* Button Toggle */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          colorPalette="red"
          display={{ base: "block", md: "none" }}
        >
          <FaBars />
        </Button>
        {/* List */}
        <List.Root
          width={{ base: "100%", md: "fit-content" }}
          display={{ base: isOpen ? "flex" : "none", md: "flex" }}
          padding={{ base: 4, md: 0 }}
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          {ListLinks.map((link) => (
            <List.Item key={link.name}>
              <Link
                color={pathname === link.path ? "red" : "black"}
                _hover={{ color: "red" }}
                fontSize={18}
                display="block"
                href={link.path}
                transitionDuration={"200ms"}
              >
                {link.name}
              </Link>
            </List.Item>
          ))}
          {token ? (
            <>
              <List.Item>
                <Link
                  color={pathname === "/Profile/Favorites" ? "red" : "black"}
                  _hover={{ color: "red" }}
                  fontSize={18}
                  display="block"
                  href={"/Profile/Favorites"}
                  transitionDuration={"200ms"}
                >
                  Profile
                </Link>
              </List.Item>
              <UserMenu />
            </>
          ) : (
            <>
              <List.Item>
                <Button onClick={() => navigate("/Login")} colorPalette="red">
                  Login
                </Button>
              </List.Item>
              <List.Item>
                <Button onClick={() => navigate("/SignUp")} colorPalette="blue">
                  Sign Up
                </Button>
              </List.Item>
            </>
          )}
        </List.Root>
      </Container>
    </Box>
  );
}
