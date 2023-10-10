import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  Container,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchVideos, deleteVideo } from "../api/videos";
import { useCookies } from "react-cookie";
import Header from "../Header";

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
    queryKey: ["videos", category],
    queryFn: () => fetchVideos(category),
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
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    setTotalPages(pages);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    newList = newList.slice(start, end);

    setCurrentVideos(newList);
  }, [videos, category, perPage, currentPage]);

  const memoryVideos = queryClient.getQueryData(["videos", ""]);
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
        queryKey: ["videos", category],
      });
      notifications.show({
        title: "Video deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Container>
        <Title order={1} align="center">
          Hololive Videos
        </Title>
        <Header />
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
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All category</option>
            {categoryOptions.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <select
            value={perPage}
            onChange={(event) => {
              setPerPage(parseInt(event.target.value));
              // reset it back to page 1
              setCurrentPage(1);
            }}
          >
            <option value="6">6 Per Page</option>
            <option value="10">10 Per Page</option>
            <option value={9999999}>All</option>
          </select>
        </Group>
        <Space h="30px" />
        <Grid>
          {currentVideos
            ? currentVideos.map((video) => {
                return (
                  <Grid.Col key={video._id} lg={4} sm={6} xs={12}>
                    <Card withBorder shadow="sm" p="20px">
                      <Space h="20px" />
                      <a href={video.link} target="_blank">
                        <img
                          src={"http://localhost:5000/" + video.image}
                          width="400px"
                        />
                      </a>
                      <Space h="20px" />
                      <Title order={5}>{video.name}</Title>
                      <Space h="20px" />
                      <Group position="apart">
                        <Badge color="yellow">{video.category}</Badge>
                      </Group>
                      <Space h="20px" />
                      {isAdmin && (
                        <>
                          <Space h="20px" />
                          <Group position="apart">
                            <Button
                              component={Link}
                              to={"/edit_videos/" + video._id}
                              color="blue"
                              size="xs"
                              radius="50px"
                            >
                              Edit
                            </Button>

                            <Button
                              color="red"
                              size="xs"
                              radius="50px"
                              onClick={() => {
                                deleteMutation.mutate({
                                  id: video._id,
                                  token: currentUser ? currentUser.token : "",
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </Group>
                        </>
                      )}
                    </Card>
                  </Grid.Col>
                );
              })
            : null}
        </Grid>
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

export default Videos;
