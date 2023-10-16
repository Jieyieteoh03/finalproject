import {
  Title,
  Space,
  Divider,
  Group,
  Button,
  Text,
  Avatar,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header({ title, page = "" }) {
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);
  const navigate = useNavigate("");

  return (
    <div className="header">
      <Space h="50px" />
      <Title align="center">{title}</Title>
      <Space h="20px" />
      <Group
        position="apart"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <Group>
          <Button
            component={Link}
            to="/"
            variant={page === "home" ? "filled" : "light"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/talents"
            variant={page === "talents" ? "filled" : "light"}
          >
            Talents
          </Button>
          <Button
            component={Link}
            to="/posts"
            variant={page === "posts" ? "filled" : "light"}
          >
            News
          </Button>
          <Button
            component={Link}
            to="/videos"
            variant={page === "videos" ? "filled" : "light"}
          >
            Videos
          </Button>
        </Group>
        <Group>
          {cookies && cookies.currentUser ? (
            <>
              <Group>
                <Avatar src={null} radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {cookies.currentUser.name}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {cookies.currentUser.email}
                  </Text>
                </div>
              </Group>
              <Button
                variant={"light"}
                onClick={() => {
                  // clear the currentUser cookie to logout
                  removeCookies("currentUser");

                  navigate("/startpage");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant={page === "login" ? "filled" : "light"}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant={page === "signup" ? "filled" : "light"}
              >
                Signup
              </Button>
            </>
          )}
        </Group>
      </Group>

      <Space h="20px" />
      <Divider />
    </div>
  );
}
