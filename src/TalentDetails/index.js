import {
  Title,
  Group,
  Space,
  Container,
  Text,
  Card,
  Badge,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTalent } from "../api/talents";
import { fetchPosts } from "../api/posts";
import { fetchVideos } from "../api/videos";
import { useCookies } from "react-cookie";
import Header from "../Header";

function TalentDetails() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [debut, setDebut] = useState("");
  const [height, setHeight] = useState("");
  const [category, setCategory] = useState("");
  const [illustrator, setIllustrator] = useState("");
  const [dream, setDream] = useState("");
  const [fanName, setFanName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");
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
      <Container>
        <Title order={5}>{name}</Title>
        <Space h="20px" />
        <img src={"http://localhost:5000/" + image} />
        <Space h="20px" />
        <Title>Data</Title>
        <Group>
          <Text>Birthday:{birthday}</Text>
          <Space h="20px" />
          <Text>Debut:{debut}</Text>
          <Space h="20px" />
          <Text>Height:{height}</Text>
          <Space h="20px" />
          <Text>Unit:{category}</Text>
          <Space h="20px" />
          <Text>Illustrator:{illustrator}</Text>
          <Space h="20px" />
          <Text>Dream:{dream}</Text>
          <Space h="20px" />
          <Text>Fan Name:{fanName}</Text>
          <Space h="20px" />
        </Group>
        <Group>
          {posts
            ? posts.map((post) => {
                return id === post.talent._id ? (
                  <Card key={post._id}>
                    <Group position="apart">
                      <img
                        src={"http://localhost:5000/" + post.image}
                        height="90px"
                      />
                      <Space h="20px" />
                      <Title order={5}>{post.name}</Title>
                      <Badge color="yellow">{post.category}</Badge>
                      <Space h="20px" />
                    </Group>
                  </Card>
                ) : null;
              })
            : null}
        </Group>
        <Group>
          {videos
            ? videos.map((video) => {
                return id === video.talent._id ? (
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
                ) : null;
              })
            : null}
        </Group>
      </Container>
    </>
  );
}

export default TalentDetails;
