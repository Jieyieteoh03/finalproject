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
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { addPosts, addPostImage } from "../api/posts";
import { fetchTalents } from "../api/talents";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

function PostsAdd() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [talent, setTalent] = useState("");
  const [uploading, setUploading] = useState(false);
  const { data: talents = [] } = useQuery({
    queryKey: ["talents"],
    queryFn: () => fetchTalents(),
  });

  const createMutation = useMutation({
    mutationFn: addPosts,
    onSuccess: () => {
      notifications.show({
        title: "Post Added",
        color: "green",
      });
      navigate("/posts");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddPosts = async (event) => {
    event.preventDefault();
    createMutation.mutate({
      data: JSON.stringify({
        name: name,
        description: desc,
        category: category,
        image: image,
        talent: talent,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutaion = useMutation({
    mutationFn: addPostImage,
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
        Add New Post
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the post name here"
          label="Name"
          description="The name of the post"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        {image && image !== "" ? (
          <>
            <Image src={"http://localhost:5000/" + image} width="100%" />
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
          value={desc}
          placeholder="Enter the post description here"
          label="Description"
          description="The description of the post"
          withAsterisk
          onChange={(event) => setDesc(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={category}
          placeholder="Enter the category here"
          label="Category"
          description="The category of the post"
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
        <Button fullWidth onClick={handleAddPosts}>
          Add New Post
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button
          component={Link}
          to="/posts"
          variant="subtle"
          size="xs"
          color="gray"
        >
          Go back to News
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default PostsAdd;
