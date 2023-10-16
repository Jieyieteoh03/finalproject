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
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTalents } from "../api/talents";
import { getPost, updatePost, uploadPostImage } from "../api/posts";
import { useCookies } from "react-cookie";

function PostsEdit() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [talent, setTalent] = useState("");
  const [uploading, setUploading] = useState("");
  const { data: talents = [] } = useQuery({
    queryKey: ["talents"],
    queryFn: () => fetchTalents(),
  });
  const {} = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    onSuccess: (data) => {
      console.log(data);
      setName(data.name);
      setDesc(data.description);
      setCategory(data.category);
      setImage(data.image);
      setTalent(data.talent);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      notifications.show({
        title: "Post Edited",
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

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    updateMutation.mutate({
      id: id,
      data: JSON.stringify({
        name: name,
        description: desc,
        category: category,
        image: image,
        talents: talents,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutation = useMutation({
    mutationFn: uploadPostImage,
    onSuccess: (data) => {
      setImage(data.image_url);
      setUploading(false);
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleImageUpload = (files) => {
    uploadMutation.mutate(files[0]);
    setUploading(true);
  };
  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Edit Posts
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
            <Image src={"http://10.1.104.1:5000/" + image} width="100%" />
            <Button color="dark" mt="15 px" onClick={() => setImage("")}>
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
          placeholder="Enter the video description here"
          label="Description"
          description="The description of the video"
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
        <Divider />
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

        <Button fullWidth onClick={handleUpdatePost}>
          Update
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

export default PostsEdit;
