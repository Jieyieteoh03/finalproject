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
import { fetchTalents, deleteTalent } from "../api/talents";
// import { addToCart, getCartItems } from "../api/cart";
import { useCookies } from "react-cookie";
import Header from "../Header";

function Talents() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const [currentTalents, setCurrentTalents] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState([]);
  const { data: talents } = useQuery({
    queryKey: ["talents", category],
    queryFn: () => fetchTalents(category),
  });

  //   const { data: cart = [] } = useQuery({
  //     queryKey: ["cart"],
  //     queryFn: getCartItems,
  //   });

  const isAdmin = useMemo(() => {
    return cookies &&
      cookies.currentUser &&
      cookies.currentUser.role === "admin"
      ? true
      : false;
  }, [cookies]);

  useEffect(() => {
    let newList = talents ? [...talents] : [];

    if (category !== "") {
      newList = newList.filter((t) => t.category === category);
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

    setCurrentTalents(newList);
  }, [talents, category, perPage, currentPage]);

  const memoryTalents = queryClient.getQueryData(["talents", ""]);
  const categoryOptions = useMemo(() => {
    let options = [];

    if (memoryTalents && memoryTalents.length > 0) {
      memoryTalents.forEach((talent) => {
        if (!options.includes(talent.category)) {
          options.push(talent.category);
        }
      });
    }
    return options;
  }, [memoryTalents]);

  const deleteMutation = useMutation({
    mutationFn: deleteTalent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["talents", category],
      });
      notifications.show({
        title: "Talent deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Container>
        <Title order={1} align="center">
          Hololive Talents
        </Title>
        <Header />
        <Space h="20px" />
        {isAdmin && (
          <Group position="right">
            <Button component={Link} to="/add_talents" color="green">
              Add new
            </Button>
          </Group>
        )}
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
          {currentTalents
            ? currentTalents.map((talent) => {
                return (
                  <Grid.Col key={talent._id} lg={4} sm={6} xs={12}>
                    <Card withBorder shadow="sm" p="20px">
                      <Title order={5}>{talent.title}</Title>
                      <Space h="20px" />
                      <img src={"http://localhost:5000/" + talent.image} />
                      <Space h="20px" />
                      <Group position="apart">
                        <Badge color="yellow">{talent.category}</Badge>
                        <Badge color="yellow">{talent.name}</Badge>
                      </Group>
                      <Space h="20px" />
                      {isAdmin && (
                        <>
                          <Space h="20px" />
                          <Group position="apart">
                            <Button
                              component={Link}
                              to={"/edit_talents/" + talent._id}
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
                                  id: talent._id,
                                  token: currentUser ? currentUser.token : "",
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </Group>
                        </>
                      )}
                      <Space h="20px" />
                      <Button
                        component={Link}
                        to="/details/:id"
                        color="red"
                        size="xs"
                        radius="50px"
                      >
                        View details
                      </Button>
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

export default Talents;
