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
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchTalents, deleteTalent } from "../api/talents";
import { useCookies } from "react-cookie";
import Header from "../Header";
import { LuSettings2 } from "react-icons/lu";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Footer from "../Footer";

function Talents() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const [opened, { toggle }] = useDisclosure(false);
  const [currentTalents, setCurrentTalents] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState([]);
  const { data: talents } = useQuery({
    queryKey: ["talents"],
    queryFn: () => fetchTalents(),
  });

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

    setTotalPages(total);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    newList = newList.slice(start, end);

    setCurrentTalents(newList);
  }, [talents, category, perPage, currentPage]);

  const memoryTalents = queryClient.getQueryData(["talents"]);
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
        queryKey: ["talents"],
      });
      notifications.show({
        title: "Talent deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Header page="talents" />
      <Container>
        <Space h="20px" />
        <Title style={{ fontSize: "50px", color: "#063f5c" }} align="center">
          TALENTS
        </Title>
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
        <Grid>
          {currentTalents
            ? currentTalents.map((talent) => {
                return (
                  <Grid.Col key={talent._id} lg={3} md={4} sm={6} xs={6}>
                    <Card>
                      <Title order={5}>{talent.title}</Title>
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
                                to={"/edit_talents/" + talent._id}
                                icon={<BsPencilSquare />}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                color="red"
                                onClick={() => {
                                  deleteMutation.mutate({
                                    id: talent._id,
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
                      <img
                        onClick={() => navigate("/details/" + talent._id)}
                        src={"http://localhost:5000/" + talent.image}
                        height="100%"
                        width="100%"
                      />
                      <Space h="20px" />
                      <Title order={4}>{talent.name}</Title>
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

export default Talents;
