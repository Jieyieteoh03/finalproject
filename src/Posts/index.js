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
    queryFn: () => fetchPosts(),
  });
  console.log(posts);
  useEffect(() => {
    let newList = posts ? [...posts] : [];

    if (category !== "") {
      newList = newList.filter((p) => p.category === category);
    }

    const total = Math.ceil(newList.length / perPage);
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    setTotalPages(pages);

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
      <Container>
        <Title order={1} align="center">
          Hololive News
        </Title>
        <Header />
        <Space h="20px" />
        <Group position="right">
          <Button component={Link} to="/add_posts" color="green">
            Add new
          </Button>
        </Group>
        <Space h="20px" />
        <Group>
          <Button
            onClick={() => {
              setCategory("");
            }}
          >
            All
          </Button>
          {categoryOptions.map((category) => {
            return (
              <Button
                key={category}
                onClick={() => {
                  setCategory(category);
                }}
              >
                {category}
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
                    <Menu shadow="md" width={200} position="bottom-end">
                      <Menu.Target>
                        <Group position="right">
                          <Button>
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
                    <Space h="20px" />
                    <Group position="apart">
                      <img
                        src={"http://localhost:5000/" + post.image}
                        height="90px"
                        onClick={() => navigate("/posts_2/" + post._id)}
                      />
                      <Space h="20px" />
                      <Title order={5}>{post.name}</Title>
                      <Badge color="yellow">{post.category}</Badge>
                      <Badge color="yellow">
                        {post.talent ? post.talent.name : null}
                      </Badge>
                      <Space h="20px" />
                    </Group>
                  </Card>
                  <Space h="20px" />
                </>
              );
            })
          : null}

        <Space h="40px" />
        <div>
          <span style={{ marginRight: "10px" }}>
            Page {currentPage} of {totalPages.length}
          </span>
          {totalPages.map((page) => {
            return (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}
              >
                {page}
              </button>
            );
          })}
        </div>
        <Space h="40px" />
      </Container>
    </>
  );
}

export default Posts;
