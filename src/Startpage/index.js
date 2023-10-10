import {
  Space,
  Container,
  Image,
  Card,
  Group,
  Button,
  Overlay,
} from "@mantine/core";

import { Link } from "react-router-dom";

export default function Startpage() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url(/images/5559852.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Space h="200px" />

        <div style={{ display: "flex" }}>
          {" "}
          <Card p="90px">
            <Card.Section>
              <Group position="center">
                {" "}
                <Image
                  src="/images/Hololive-Logo_PNG1.png"
                  height={100}
                  width={200}
                />
                <Space h="100px" />
                <Button component={Link} to="/login">
                  Let's go
                </Button>
              </Group>
            </Card.Section>
          </Card>
          <Space w="200px" />
          <div style={{ display: "flex" }}>
            <Image src="/images/holo1.png" height={500} width={500} />
          </div>
        </div>
      </Container>
    </div>
  );
}
