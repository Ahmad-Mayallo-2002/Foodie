import { Box, Text, VStack, Input, Textarea, Button } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import Hero from "../components/Hero";

const ContactUs = () => {
  return (
    <>
      <Hero title="Contact Us" image="url(/hero.webp)" />
      <Box p={8}>
        <Text fontSize="xl" textAlign="center" mb={8}>
          Have a question, feedback, or need assistance? We’re here to help!
          Reach out to us, and we’ll get back to you as soon as possible.
        </Text>

        <VStack gap={4} maxW="600px" mx="auto">
          <Field label="Name">
            <Input placeholder="Write Your Name" />
          </Field>
          <Field label="Email">
            <Input placeholder="Write Your Email" />
          </Field>
          <Field label="Message">
            <Textarea
              placeholder="Write Your Message"
              resize="none"
              height={200}
            />
          </Field>
          <Button colorScheme="teal" size="lg" w="full">
            Submit
          </Button>
        </VStack>
      </Box>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1011.209651265367!2d31.842566299041795!3d31.516186301765895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1734918717402!5m2!1sen!2seg"
        width="100%"
        height="450"
        loading="lazy"
      ></iframe>
    </>
  );
};

export default ContactUs;
