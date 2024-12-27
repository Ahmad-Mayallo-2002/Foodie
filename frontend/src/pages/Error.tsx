import { Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <Heading fontWeight="bold" size="2xl">
        404 Error Page Not Found
      </Heading>
      <Text fontSize={20}>
        Return to <Link to="/">Home Page</Link>
      </Text>
    </div>
  );
}
