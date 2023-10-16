import {
  Title,
  Space,
  Card,
  Group,
  Button,
  BackgroundImage,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import Header from "../Header";
import Footer from "../Footer";
import { fetchVideos } from "../api/videos";
import { fetchPosts } from "../api/posts";
import { fetchTalents } from "../api/talents";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import Fade from "react-reveal/Fade";

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const navigate = useNavigate();
  const { data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(),
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const { data: talents } = useQuery({
    queryKey: ["talents"],
    queryFn: () => fetchTalents(),
  });
  return (
    <>
      <Header page="home" />
      <Carousel
        withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide align={"center"}>
          <img src="/images/idolproject_list_thumb.jpg" width="100%" />
        </Carousel.Slide>
        <Carousel.Slide align={"center"}>
          <img src="/images/OGP_hololive-1-1440x810.png" width="100%" />
        </Carousel.Slide>
        <Carousel.Slide align={"center"}>
          <img src="/images/Hololive_Talents2.webp" width="100%" />
        </Carousel.Slide>
        <Carousel.Slide align={"center"}>
          <img src="/images/hololive 2.png" width="100%" />
        </Carousel.Slide>
      </Carousel>

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
            <Button
              variant="outline"
              radius="xl"
              color="gray"
              component={Link}
              to="/videos"
            >
              view all <Space w="20px" />
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
                  return (
                    <Carousel.Slide>
                      <Card
                        h="100%"
                        w="100%"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                        radius="lg"
                      >
                        <a href={video.link} target="_blank">
                          <img
                            src={"http://10.1.104.1:5000/" + video.image}
                            width="100%"
                          />
                        </a>
                        <Space h="20px" />
                        <Title order={5}>{video.name}</Title>
                        <Space h="20px" />
                      </Card>
                    </Carousel.Slide>
                  );
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
            <Button
              variant="outline"
              radius="xl"
              color="gray"
              component={Link}
              to="/posts"
            >
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
            loop
          >
            {posts
              ? posts.map((post) => {
                  return (
                    <Carousel.Slide>
                      <Card
                        h="100%"
                        w="100%"
                        radius="lg"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                      >
                        <img
                          src={"http://10.1.104.1:5000/" + post.image}
                          width="100%"
                          onClick={() => {
                            navigate("/posts_2/" + post._id);
                          }}
                          style={{}}
                        />
                        <Space h="20px" />
                        <Title order={5}>{post.name}</Title>
                        <Space h="20px" />
                      </Card>
                    </Carousel.Slide>
                  );
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
          backgroundImage: "url(/images/bg_pink.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Fade left duration={2000}>
          <Group
            position="apart"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <Title style={{ fontSize: "60px", color: "#063f5c" }}>
              TALENTS
            </Title>
            <Button
              variant="outline"
              radius="xl"
              color="gray"
              component={Link}
              to="/talents"
            >
              view all <Space w="20px" />
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
            {talents
              ? talents.map((talent) => {
                  return (
                    <Carousel.Slide>
                      <Card
                        h="100%"
                        w="100%"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
                      >
                        <img
                          src={"http://10.1.104.1:5000/" + talent.image}
                          width="100%"
                          onClick={() => navigate("/details/" + talent._id)}
                        />
                        <Space h="20px" />
                        <Title order={5}>{talent.name}</Title>
                      </Card>
                    </Carousel.Slide>
                  );
                })
              : null}
          </Carousel>
        </Fade>
      </BackgroundImage>
      <Footer />
    </>
  );
}
