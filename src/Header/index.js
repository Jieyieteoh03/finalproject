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
      <Group position="apart">
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
            variant={page === "cart" ? "filled" : "light"}
          >
            Talents
          </Button>
          <Button
            component={Link}
            to="/posts"
            variant={page === "orders" ? "filled" : "light"}
          >
            News and update
          </Button>
          <Button
            component={Link}
            to="/videos"
            variant={page === "orders" ? "filled" : "light"}
          >
            Videos
          </Button>
        </Group>
        <Group position="right">
          {cookies && cookies.currentUser ? (
            <>
              <Group>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
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
                to="/Signup"
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
