import { Box, Input, Button, Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Post from "./Post";
import useShowToast from "../hooks/useShowToast";
import React from 'react';

const HashtagSearch = () => {
    const [hashtag, setHashtag] = useState("");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const showToast = useShowToast();

    const handleSearch = async () => {
        if (!hashtag.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/posts/hashtag/${hashtag}`);
            const data = await res.json();

            if (!res.ok) {
                showToast("Error", data.error || "Failed to fetch posts", "error");
                setPosts([]);
                return;
            }

            if (Array.isArray(data)) {
                setPosts(data);
            } else {
                showToast("Error", "Unexpected response format", "error");
                setPosts([]);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Flex mb={4}>
                <Input
                    placeholder="Search by hashtag"
                    value={hashtag}
                    onChange={(e) => setHashtag(e.target.value)}
                />
                <Button onClick={handleSearch} ml={2}>Search</Button>
            </Flex>
            {loading && (
                <Flex justify='center'>
                    <Spinner size='xl' />
                </Flex>
            )}
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))
            ) : (
                !loading && <p>No posts found</p>
            )}
        </Box>
    );
};

export default HashtagSearch;
