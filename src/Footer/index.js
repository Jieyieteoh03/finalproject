import {
  Container,
  Title,
  Space,
  Card,
  Group,
  Badge,
  Center,
  Grid,
  BackgroundImage,
  Text,
} from "@mantine/core";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";

function Footer() {
  return (
    <footer>
      <BackgroundImage
        style={{
          width: "100%",
          paddingTop: "100px",
          paddingBottom: "100px",
          backgroundColor: " #43c5f5",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid w="100%">
          <Grid.Col>
            <Group position="center">
              <>
                <a href="https://twitter.com/hololive_En" target="_blank">
                  {
                    <RiTwitterXFill
                      style={{ color: "white", fontSize: "30px" }}
                    />
                  }
                </a>
              </>

              <Space w="10px" />
              <>
                <a
                  href="https://www.youtube.com/channel/UCJFZiqLMntJufDCHc6bQixg"
                  target="_blank"
                >
                  {
                    <AiOutlineYoutube
                      style={{ color: "white", fontSize: "40px" }}
                    />
                  }
                </a>
              </>
            </Group>
          </Grid.Col>
          <Space h="100px" />
          <Grid.Col>
            <Group position="center" style={{ color: "white" }}>
              <Text>Company・Recruit</Text>|<Text>Privacy Policy</Text>|
              <Text>Contact Us</Text>
            </Group>
          </Grid.Col>
          <Grid.Col>
            <Group position="center" style={{ color: "white" }}>
              <Text>Operating Company</Text>
              <img src="/images/foot_logo.png" width={160}></img>
            </Group>
          </Grid.Col>
          <Grid.Col>
            <Group position="center" style={{ color: "white" }}>
              <Text>© 2016 COVER Corp.</Text>
            </Group>
          </Grid.Col>
        </Grid>
      </BackgroundImage>
    </footer>
  );
}
export default Footer;
