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
import { useMutation } from "@tanstack/react-query";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { addTalents, addTalentImage } from "../api/talents";

function TalentAdd() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser } = cookies;
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
  const [uploading, setUploading] = useState(false);

  const isAdmin = useMemo(() => {
    return cookies &&
      cookies.currentUser &&
      cookies.currentUser.role === "admin"
      ? true
      : false;
  }, [cookies]);

  const createMutation = useMutation({
    mutationFn: addTalents,
    onSuccess: () => {
      notifications.show({
        title: "Talent Added",
        color: "green",
      });
      navigate("/talents");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddTalent = async (event) => {
    event.preventDefault();
    createMutation.mutate({
      data: JSON.stringify({
        name: name,
        birthday: birthday,
        debut: debut,
        height: height,
        category: category,
        illustrator: illustrator,
        dream: dream,
        fanName: fanName,
        image: image,
      }),
      token: currentUser ? currentUser.token : "",
    });
  };

  const uploadMutaion = useMutation({
    mutationFn: addTalentImage,
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
        Add New Talent
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the talent name here"
          label="Name"
          description="The name of the talent"
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
          value={birthday}
          placeholder="Enter the talent birthday here"
          label="Birthday"
          description="The birthday of the talent"
          withAsterisk
          onChange={(event) => setBirthday(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={debut}
          placeholder="Enter the talent debut here"
          label="Debut"
          description="The debut of the talent"
          withAsterisk
          onChange={(event) => setDebut(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={height}
          placeholder="Enter the talent height here"
          label="Height"
          description="The height of the talent"
          withAsterisk
          onChange={(event) => setHeight(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={category}
          placeholder="Enter the category here"
          label="Category"
          description="The category of the talent"
          withAsterisk
          onChange={(event) => setCategory(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={illustrator}
          placeholder="Enter the talent illustrator here"
          label="Illustrator"
          description="The illustrator of the talent"
          withAsterisk
          onChange={(event) => setIllustrator(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={dream}
          placeholder="Enter the talent dream here"
          label="Dream"
          description="The dream of the talent"
          withAsterisk
          onChange={(event) => setDream(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={fanName}
          placeholder="Enter the talent Fan Name here"
          label="Fan Name"
          description="The Fan Name of the talent"
          withAsterisk
          onChange={(event) => setFanName(event.target.value)}
        />
        <Space h="20px" />
        {isAdmin ? (
          <Button fullWidth onClick={handleAddTalent}>
            Add New Talent
          </Button>
        ) : null}
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button
          component={Link}
          to="/talents"
          variant="subtle"
          size="xs"
          color="gray"
        >
          Go back to Talent
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default TalentAdd;
