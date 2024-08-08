import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const SuggestedUser = ({ user }) => {
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  return (
    <Flex
      gap={2}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={{ base: "column", sm: "row" }}
      w={"full"}
      p={2}
      borderWidth={1}
      borderRadius={"md"}
    >
      {/* left side */}
      <Flex gap={2} as={Link} to={`${user.username}`} alignItems={"center"} w={"full"}>
        <Avatar src={user.profilePic} />
        <Box>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            {user.name}
          </Text>
        </Box>
      </Flex>
      {/* right side */}
      <Button
        size={"sm"}
        color={following ? "black" : "white"}
        bg={following ? "white" : "blue.400"}
        onClick={handleFollowUnfollow}
        isLoading={updating}
        _hover={{
          color: following ? "black" : "white",
          opacity: ".8",
        }}
        mt={{ base: 2, sm: 0 }}
        w={{ base: "full", sm: "auto" }}
      >
        {following ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
