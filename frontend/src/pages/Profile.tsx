import { Box } from "@chakra-ui/react";
import ProfileSidebar from "../components/ProfileSidebar";
import { Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Box
        as="main"
        id="profile"
        display="grid"
        paddingRight={4}
        gridTemplateColumns={{ base: "auto 1fr", lg: "250px 1fr" }}
        gap={2}
      >
        <ProfileSidebar />
        <Box
          border="1px solid"
          marginBottom={4}
          borderColor="gray.200"
          padding={4}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
