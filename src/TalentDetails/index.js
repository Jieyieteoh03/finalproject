import {
  Title,
  Group,
  Space,
  Container,
  Text,
  Card,
  Badge,
  BackgroundImage,
  Grid,
  Divider,
  Button,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTalent } from "../api/talents";
import { fetchPosts } from "../api/posts";
import { fetchVideos } from "../api/videos";
import { useCookies } from "react-cookie";
import Footer from "../Footer";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Fade from "react-reveal/Fade";

function TalentDetails() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [debut, setDebut] = useState("");
  const [height, setHeight] = useState("");
  const [category, setCategory] = useState("");
  const [illustrator, setIllustrator] = useState("");
  const [dream, setDream] = useState("");
  const [fanName, setFanName] = useState("");
  const [image, setImage] = useState("");
  const {} = useQuery({
    queryKey: ["talents", id],
    queryFn: () => getTalent(id),
    onSuccess: (data) => {
      setName(data.name);
      setBirthday(data.birthday);
      setDebut(data.debut);
      setHeight(data.height);
      setCategory(data.category);
      setIllustrator(data.illustrator);
      setDream(data.dream);
      setFanName(data.fanName);
      setImage(data.image);
    },
  });
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });
  const { data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(),
  });

  return (
    <>
      <Space h="20px" />
      <Group position="center">
        <img src={"http://localhost:5000/" + image} height="500px" />
      </Group>
      <Space h="20px" />
      <Title style={{ fontSize: "30px" }} align="center">
        {name}
      </Title>
      <Space h="20px" />
      <BackgroundImage
        style={{
          width: "100%",
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundImage: "url(/images/bg_blue.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>
          <Title style={{ fontSize: "60px" }} align="center">
            TALENT DATA
          </Title>
          <Space h="20px" />
          <Divider />
          <Space h="20px" />
          <Grid justify="center">
            <Grid.Col>
              <Group>
                <Title order={2}>Birthday:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {birthday}
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col>
              <Group>
                <Title order={2}>Debut:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {debut}
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col>
              <Group>
                <Title order={2}>Height:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {height}
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col>
              <Group>
                <Title order={2}>Unit:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {category}
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col>
              <Group>
                <Title order={2}>Illustrator:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {illustrator}
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col>
              <Group>
                <Title order={2}>Dream:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {dream}
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col>
              <Group>
                <Title order={2}>Fan Name:</Title>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {fanName}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
          <Space h="20px" />
        </Container>
      </BackgroundImage>
      <BackgroundImage
        style={{
          width: "100%",
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundImage: "url(/images/bg_green.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Fade left duration={2000}>
          <Group
            position="apart"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <Title style={{ fontSize: "60px", color: "#063f5c" }}>VIDEOS</Title>
            <Button variant="outline" radius="xl" color="gray">
              view all
              <Space w="20px" />
              {<BiSolidRightArrow />}
            </Button>
          </Group>
        </Fade>

        <Space h="20px" />

        <Fade right duration={2000}>
          <Carousel
            slideSize="15%"
            slideGap="sm"
            align="start"
            style={{ marginLeft: "20px" }}
          >
            {videos
              ? videos.map((video) => {
                  return video.talent && id === video.talent._id ? (
                    <Carousel.Slide>
                      <Card h="100%" w="100%">
                        <a href={video.link} target="_blank">
                          <img
                            src={"http://localhost:5000/" + video.image}
                            width="100%"
                          />
                        </a>
                        <Space h="20px" />
                        <Title order={5}>{video.name}</Title>
                        <Space h="20px" />
                      </Card>
                    </Carousel.Slide>
                  ) : null;
                })
              : null}
          </Carousel>
        </Fade>
      </BackgroundImage>

      <BackgroundImage
        style={{
          width: "100%",
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundImage: "url(/images/bg_yellow.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Fade left duration={2000}>
          <Group
            position="apart"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <Title style={{ fontSize: "60px", color: "#063f5c" }}>NEWS</Title>
            <Button variant="outline" radius="xl" color="gray">
              view all
              <Space w="20px" />
              {<BiSolidRightArrow />}
            </Button>
          </Group>
        </Fade>
        <Space h="20px" />
        <Fade right duration={2000}>
          <Carousel
            slideSize="15%"
            slideGap="sm"
            align="start"
            style={{ marginLeft: "20px" }}
          >
            {posts
              ? posts.map((post) => {
                  return id === post.talent._id ? (
                    <Carousel.Slide>
                      <Card h="100%" w="100%">
                        <img
                          src={"http://localhost:5000/" + post.image}
                          width="100%"
                          onClick={() => {
                            navigate("/posts_2/" + post._id);
                          }}
                        />
                        <Space h="20px" />
                        <Title order={5}>{post.name}</Title>
                        <Space h="20px" />
                      </Card>
                    </Carousel.Slide>
                  ) : null;
                })
              : null}
          </Carousel>
        </Fade>
      </BackgroundImage>
      <Space h="100px" />
      <Group position="center">
        <Button size="xl" component={Link} to="/talents">
          {<BiSolidLeftArrow />} <Space w={200} />
          TALENTS
          <Space w={200} />
        </Button>
      </Group>
      <Space h="100px" />

      <Footer />
    </>
  );
}

export default TalentDetails;
