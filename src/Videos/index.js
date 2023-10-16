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
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchVideos, deleteVideo } from "../api/videos";
import { useCookies } from "react-cookie";
import Header from "../Header";
import { LuSettings2 } from "react-icons/lu";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Footer from "../Footer";

function Videos() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const [currentVideos, setCurrentVideos] = useState([]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState([]);
  const { data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(),
  });

  const isAdmin = useMemo(() => {
    return cookies &&
      cookies.currentUser &&
      cookies.currentUser.role === "admin"
      ? true
      : false;
  }, [cookies]);

  useEffect(() => {
    let newList = videos ? [...videos] : [];

    if (category !== "") {
      newList = newList.filter((v) => v.category === category);
    }

    const total = Math.ceil(newList.length / perPage);

    setTotalPages(total);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    newList = newList.slice(start, end);

    setCurrentVideos(newList);
  }, [videos, category, perPage, currentPage]);

  const memoryVideos = queryClient.getQueryData(["videos"]);
  const categoryOptions = useMemo(() => {
    let options = [];

    if (memoryVideos && memoryVideos.length > 0) {
      memoryVideos.forEach((video) => {
        if (!options.includes(video.category)) {
          options.push(video.category);
        }
      });
    }
    return options;
  }, [memoryVideos]);

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
      notifications.show({
        title: "Video deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Header page="videos" />
      <Container>
        <Space h="20px" />
        <Title style={{ fontSize: "50px", color: "#063f5c" }} align="center">
          VIDEOS
        </Title>
        <Space h="20px" />
        <Group position="right">
          {isAdmin && (
            <Button component={Link} to="/add_videos" color="green">
              Add new
            </Button>
          )}
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
        <Grid>
          {currentVideos
            ? currentVideos.map((video) => {
                return (
                  <Grid.Col key={video._id} lg={4} sm={6} xs={12}>
                    <Card p="10px">
                      {isAdmin && (
                        <>
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
                                to={"/edit_videos/" + video._id}
                                icon={<BsPencilSquare />}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                color="red"
                                onClick={() => {
                                  deleteMutation.mutate({
                                    id: video._id,
                                    token: currentUser ? currentUser.token : "",
                                  });
                                }}
                                icon={<BsTrash />}
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </>
                      )}
                      <Space h="20px" />

                      <a href={video.link} target="_blank">
                        <img
                          src={"http://localhost:5000/" + video.image}
                          height={140}
                        />
                      </a>

                      <Space h="20px" />
                      <Title order={5}>{video.name}</Title>
                      <Space h="20px" />
                      <Group position="apart">
                        <Badge style={{ color: "#063f5c" }} variant="outline">
                          {video.category}
                        </Badge>
                      </Group>
                      <Space h="20px" />
                    </Card>
                  </Grid.Col>
                );
              })
            : null}
        </Grid>
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

export default Videos;
