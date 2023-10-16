import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  Container,
  Text,
  TextInput,
  Avatar,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchComments, addComments, deleteComment } from "../api/comments";
import { getPost } from "../api/posts";
import { useCookies } from "react-cookie";
import { BsTrash } from "react-icons/bs";
import { BiSolidLeftArrow } from "react-icons/bi";
import Footer from "../Footer";

function Posts_2() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState("");
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const {} = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    onSuccess: (data) => {
      setUser(data.user);
      setName(data.name);
      setDesc(data.description);
      setCategory(data.category);
      setImage(data.image);
    },
  });
  // get comments usequery
  const {} = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
    onSuccess: (data) => {
      setComments(data);
    },
  });

  const createMutation = useMutation({
    mutationFn: addComments,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      notifications.show({
        title: "Comment Added",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddComment = async (event) => {
    event.preventDefault();
    createMutation.mutate({
      data: JSON.stringify({
        post: id,
        comments: inputComment,
      }),
      token: currentUser ? currentUser.token : "",
    });
    setInputComment("");
  };

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      notifications.show({
        title: "Comment deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Container p="auto">
        <Space h="20px" />
        <img src={"http://10.1.104.1:5000/" + image} width="800px" />
        <Space h="20px" />
        <Title order={5}>{name}</Title>
        <Space h="20px" />
        <Group position="apart">
          <Badge color="yellow">{category}</Badge>
        </Group>
        <Space h="20px" />
        <Text>{desc}</Text>
        <Space h="20px" />

        <Card withBorder shadow="sm" p="20px">
          <Title order={4}>Comments</Title>
          <Space h="20px" />

          {comments
            ? comments.map((comment) => {
                return id === comment.post ? (
                  <>
                    <Card withBorder key={comment._id}>
                      <Group position="apart">
                        <Grid>
                          <Group>
                            <Avatar src={null} radius="xl" />
                            <Text>{comment.user.name}</Text>
                          </Group>

                          <Grid.Col>
                            <Text style={{ fontWeight: "bold" }}>
                              {comment.comments}
                            </Text>
                          </Grid.Col>
                        </Grid>

                        {cookies &&
                        cookies.currentUser &&
                        comment.user &&
                        cookies.currentUser._id === comment.user._id ? (
                          <Button
                            color="red"
                            onClick={() => {
                              deleteMutation.mutate({
                                id: comment._id,
                                token: currentUser ? currentUser.token : "",
                              });
                            }}
                          >
                            <BsTrash />
                          </Button>
                        ) : null}
                      </Group>
                    </Card>
                    <Space h="20px" />
                  </>
                ) : null;
              })
            : null}
          <Space h="20px" />
          <Group>
            <TextInput
              value={inputComment}
              placeholder="Enter comment here..."
              onChange={(event) => setInputComment(event.target.value)}
            ></TextInput>
            <Button onClick={handleAddComment}>Add</Button>
          </Group>
        </Card>
        <Space h="40px" />
      </Container>
      <Space h="100px" />
      <Group position="center">
        <Button size="xl" component={Link} to="/posts">
          {<BiSolidLeftArrow />} <Space w={200} />
          NEWS
          <Space w={200} />
        </Button>
      </Group>
      <Space h="100px" />
      <Footer />
    </>
  );
}

export default Posts_2;
