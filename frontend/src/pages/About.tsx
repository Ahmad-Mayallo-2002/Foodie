import { Box, Heading, List } from "@chakra-ui/react";
import Hero from "../components/Hero";

export default function AboutUs() {
  return (
    <>
      <Hero title="About Us" image="url(/hero.webp)" />
      <Box padding="2rem" lineHeight={2}>
        <Box marginY="2rem">
          <p>
            Welcome to <strong>Foodie Haven</strong>, where your cravings meet
            convenience!
          </p>
          <p>
            We’re passionate about bringing delicious food straight to your
            doorstep. Whether you’re in the mood for a quick bite, a hearty
            meal, or gourmet cuisine, we’ve partnered with the best restaurants
            and local chefs to ensure every order satisfies your taste buds.
          </p>
        </Box>

        <Box marginY="2rem">
          <Heading size="2xl" marginBottom={4} color="#ff6347">
            Our Mission
          </Heading>
          <p>
            At <strong>Foodie Haven</strong>, we believe food is more than just
            sustenance—it’s an experience. Our mission is to connect you with
            your favorite meals effortlessly and efficiently, so you can enjoy
            fresh and flavorful dishes wherever you are.
          </p>
        </Box>

        <Box marginY="2rem">
          <Heading size="2xl" marginBottom={4} color="#ff6347">
            Why Choose Us?
          </Heading>
          <List.Root listStyleType="disc" paddingLeft="1.5rem">
            <List.Item>
              Wide Variety: From comfort food to healthy choices, explore menus
              from top-rated restaurants and cuisines from around the globe.
            </List.Item>
            <List.Item>
              Fast Delivery: Our dedicated team ensures that your food arrives
              hot and fresh in no time.
            </List.Item>
            <List.Item>
              Easy to Use: Browse, order, and track your delivery with our
              user-friendly platform.
            </List.Item>
            <List.Item>
              Support Local: We’re proud to collaborate with local businesses,
              helping them reach more customers and grow their brand.
            </List.Item>
          </List.Root>
        </Box>

        <Box marginY="2rem">
          <Heading size="2xl" marginBottom={4} color="#ff6347">
            Our Story
          </Heading>
          <p>
            Started with a simple idea to make delicious meals accessible to
            everyone, we’ve grown into a trusted platform for food lovers across
            the region. Our journey is fueled by the love and trust of our
            customers and partners.
          </p>
        </Box>
      </Box>
    </>
  );
}
