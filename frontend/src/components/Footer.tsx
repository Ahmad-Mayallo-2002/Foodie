import {
  Box,
  Container,
  Heading,
  Image,
  Input,
  Link,
  List,
  Text,
} from "@chakra-ui/react";
import { Button } from "./ui/button";
import { InputGroup } from "./ui/input-group";
import { FaSearch } from "react-icons/fa";
import { links } from "../assets/data";

export default function Footer() {
  return (
    <>
      <Box as="footer" bg="#1D2128FF" paddingTop={16} paddingX={6}>
        <Container>
          <Box
            color={"white"}
            flexDirection="column"
            className="center subscribe"
          >
            <Heading
              marginBottom={4}
              size="2xl"
              textAlign={{ base: "center", md: "start" }}
            >
              Subscribe to our newsletter
            </Heading>
            <Box as="form" display="flex">
              <InputGroup startElement={<FaSearch />}>
                <Input
                  borderRadius={24}
                  _focus={{ borderColor: "#BCC1CAFF" }}
                  borderRightRadius={0}
                  placeholder="Input Your Email"
                />
              </InputGroup>
              <Button
                borderRadius={24}
                colorPalette="red"
                borderLeftRadius={0}
                type="submit"
              >
                Subscribe
              </Button>
            </Box>
          </Box>
          <Box
            marginY={6}
            className="center-y"
            justifyContent="space-between"
            flexDir={{ base: "column", md: "row" }}
          >
            <Box
              className="logo center-y"
              gapX={4}
              justifyContent={{ base: "center", md: "start" }}
            >
              <Image src="/footer-logo.png" alt="Image" />
              <Heading as="h2" size={{ base: "2xl", md: "3xl" }} color="white">
                Tasteful Delights
              </Heading>
            </Box>
            <List.Root
              display="flex"
              flexDir={{ base: "column", md: "row" }}
              gap={4}
              fontSize={20}
              textAlign={{ base: "center", md: "start" }}
            >
              {[
                "Pricing",
                "About us",
                "Features",
                "Help Center",
                "Contact us",
                "FAQs",
                "Careers",
              ].map((link) => (
                <List.Item key={link}>
                  <Link href={"/"} color="white">
                    {link}
                  </Link>
                </List.Item>
              ))}
            </List.Root>
          </Box>
          <hr />
          <Box
            paddingY={4}
            className="center-y"
            justifyContent="space-between"
            flexDir={{ base: "column", md: "row" }}
            gapY={4}
          >
            <Text color="white">
              &copy; 2024 Brand, Inc. • Privacy • Terms • Sitemap
            </Text>
            <Box display="flex" gap={4}>
              {links.map((link, index) => (
                <Link
                  href={link.path}
                  color={link.color}
                  fontSize={24}
                  key={index}
                >
                  <link.icon />
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
