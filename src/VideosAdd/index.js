import { useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  Divider,
  Button,
  Group,
  Image,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { addVideos, addVideoImage } from "../api/videos";
import { fetchTalents } from "../api/talents";

function VideosAdd() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [talent, setTalent] = useState("");
  const [uploading, setUploading] = useState(false);
  const { data: talents = [] } = useQuery({
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

  const createMutation = useMutation({
    mutationFn: addVideos,
    onSuccess: () => {
      notifications.show({
        title: "Video Added",
        color: "green",
      });
      navigate("/videos");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddVideos = async (event) => {
    event.preventDefault();
    createMutation.mutate({
      data: JSON.stringify({
        name: name,
        link: link,
        category: category,
        image: image,
        talent: talent,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutaion = useMutation({
    mutationFn: addVideoImage,
    onSuccess: (data) => {
      setImage(data.image_url);
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleImageUpload = (files) => {
    uploadMutaion.mutate(files[0]);
    setUploading(true);
  };

  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Add New Video
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the video name here"
          label="Name"
          description="The name of the video"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        {image && image !== "" ? (
          <>
            <Image src={"http://10.1.104.1:5000/" + image} width="100%" />
            <Button color="dark" mt="15px" onClick={() => setImage("")}>
              Remove Image
            </Button>
          </>
        ) : (
          <Dropzone
            multiple={false}
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => {
              handleImageUpload(files);
            }}
          >
            <Title order={4} align="center" py="20px">
              Click to upload or Drag image to upload
            </Title>
          </Dropzone>
        )}
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={link}
          placeholder="Enter the video link here"
          label="Link"
          description="The link of the video"
          withAsterisk
          onChange={(event) => setLink(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={category}
          placeholder="Enter the category here"
          label="Category"
          description="The category of the video"
          withAsterisk
          onChange={(event) => setCategory(event.target.value)}
        />
        <Space h="20px" />
        <select
          value={talent}
          onChange={(event) => {
            setTalent(event.target.value);
          }}
        >
          <option value="">Select a talent</option>
          {talents.map((t) => {
            return (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            );
          })}
        </select>
        <Space h="20px" />
        {isAdmin ? (
          <Button fullWidth onClick={handleAddVideos}>
            Add New Video
          </Button>
        ) : null}
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button
          component={Link}
          to="/videos"
          variant="subtle"
          size="xs"
          color="gray"
        >
          Go back to Videos
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default VideosAdd;
