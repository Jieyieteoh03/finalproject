import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  Container,
  Menu,
  Pagination,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "../api/posts";
import { useCookies } from "react-cookie";
import Header from "../Header";
import { LuSettings2 } from "react-icons/lu";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Footer from "../Footer";

function Posts() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const navigate = useNavigate("");
  const [currentPosts, setCurrentPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState([]);
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(currentUser ? currentUser.token : ""),
  });
  useEffect(() => {
    let newList = posts ? [...posts] : [];

    if (category !== "") {
      newList = newList.filter((p) => p.category === category);
    }

    const total = Math.ceil(newList.length / perPage);

    setTotalPages(total);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    newList = newList.slice(start, end);

    setCurrentPosts(newList);
  }, [posts, category, perPage, currentPage]);

  const memoryPosts = queryClient.getQueryData(["posts"]);
  const categoryOptions = useMemo(() => {
    let options = [];

    if (memoryPosts && memoryPosts.length > 0) {
      memoryPosts.forEach((post) => {
        if (!options.includes(post.category)) {
          options.push(post.category);
        }
      });
    }
    return options;
  }, [memoryPosts]);

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      notifications.show({
        title: "Post deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Header page="posts" />
      <Container>
        <Space h="20px" />
        <Title style={{ fontSize: "50px", color: "#063f5c" }} align="center">
          NEWS
        </Title>
        <Space h="20px" />
        <Group position="right">
          <Button component={Link} to="/add_posts" color="green">
            Add new
          </Button>
        </Group>
        <Space h="20px" />
        <Group>
          <Button
            size="md"
            onClick={() => {
              setCategory("");
            }}
          >
            <Space w="50px" />
            All
            <Space w="50px" />
          </Button>
          {categoryOptions.map((category) => {
            return (
              <Button
                size="md"
                key={category}
                onClick={() => {
                  setCategory(category);
                }}
              >
                <Space w="50px" />
                {category}
                <Space w="50px" />
              </Button>
            );
          })}
        </Group>
        <Space h="30px" />

        {currentPosts
          ? currentPosts.map((post) => {
              return (
                <>
                  <Card withBorder shadow="sm" p="20px">
                    {cookies &&
                    cookies.currentUser &&
                    post.user &&
                    cookies.currentUser._id === post.user._id ? (
                      <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                          <Group position="right">
                            <Button variant="outline">
                              <LuSettings2 />
                            </Button>
                          </Group>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            component={Link}
                            to={"/edit_posts/" + post._id}
                            icon={<BsPencilSquare />}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            onClick={() => {
                              deleteMutation.mutate({
                                id: post._id,
                                token: currentUser ? currentUser.token : "",
                              });
                            }}
                            icon={<BsTrash />}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    ) : null}
                    <Space h="20px" />
                    <Group position="apart">
                      <img
                        src={"http://localhost:5000/" + post.image}
                        width={200}
                        onClick={() => navigate("/posts_2/" + post._id)}
                      />
                      <Space h="20px" />
                      <Title order={5}>{post.name}</Title>
                      <Space h="20px" />
                    </Group>
                  </Card>
                  <Space h="20px" />
                </>
              );
            })
          : null}

        <Space h="40px" />
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
          size="xl"
          radius="xl"
          position="center"
        ></Pagination>
        <Space h="40px" />
      </Container>
      <Footer />
    </>
  );
}

export default Posts;
