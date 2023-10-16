import {
  Space,
  Container,
  Image,
  Card,
  Group,
  Button,
  BackgroundImage,
  MediaQuery,
} from "@mantine/core";

import { Link } from "react-router-dom";

export default function Startpage() {
  return (
    <BackgroundImage
      src="/images/ina.jpg"
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Group position="center">
        <Image src="/images/Hololive_logo.png" height="200px" width="auto" />
      </Group>
      <Group position="center">
        <Space
          h="500px"
          sx={{
            "@media (max-width: 768px)": {
              display: "none",
            },
          }}
        />
        <Space
          h="10px"
          sx={{
            "@media (min-width: 768px)": {
              display: "none",
            },
          }}
        />
        <Card
          p="90px"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          shadow="md"
          radius="lg"
        >
          <Card.Section>
            <Group>
              <Image
                src="/images/Hololive-Logo_PNG1.png"
                height={100}
                width={200}
              />
              <Button size="xl" component={Link} to="/login">
                LET'S GO
              </Button>
            </Group>
          </Card.Section>
        </Card>
      </Group>
    </BackgroundImage>
  );
}
