import {
  Container,
  Title,
  Space,
  Divider,
  Card,
  Group,
  Badge,
} from "@mantine/core";
import Header from "../Header";
import { fetchVideos } from "../api/videos";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: videos } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(),
  });
  console.log(videos);
  return (
    <Container>
      <Header />
      <Space h="30px" />
      <Group>
        {videos
          ? videos.map((video) => {
              return (
                <>
                  <Card key={video._id}>
                    <Group position="apart">
                      <a href={video.link} target="_blank">
                        <img
                          src={"http://localhost:5000/" + video.image}
                          height="90px"
                        />
                      </a>
                      <Space h="20px" />
                      <Title order={5}>{video.name}</Title>
                      <Badge color="yellow">{video.category}</Badge>
                      <Space h="20px" />
                    </Group>
                  </Card>
                  ;
                </>
              );
            })
          : null}
      </Group>
    </Container>
  );
}
