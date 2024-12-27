import { Grid, Heading, Image, Input, Text, Textarea } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { useForm } from "react-hook-form";
import { getToken, mainUrl, MyProduct } from "../assets/data";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Toaster, toaster } from "../components/ui/toaster";

export default function AddProduct() {
  const { token, _id } = getToken();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const handleChangeImage = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    if (input.files) setImage(URL.createObjectURL(input.files[0]));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyProduct>();
  const onSubmit = async (_productData: MyProduct, event: any) => {
    const formData = new FormData(event.target);
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "add-product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
      toaster.success({
        title: "Success",
        description: data.msg,
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toaster.error({
        title: "Error",
        description: error.response.data.msg,
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Heading size="3xl" marginBottom={4}>
        Add Product
      </Heading>
      <Grid gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          pos="relative"
          as="label"
          h="400px"
          cursor="pointer"
          border="1px solid #eee"
          invalid={Boolean(errors.image)}
          errorText={errors.image?.message}
          borderRadius="sm"
        >
          {image ? (
            <Image src={image} w="100%" h="100%" />
          ) : (
            <Text
              position="absolute"
              bgColor="#2563eb"
              color="white"
              borderRadius={4}
              p=".75rem 1.5rem"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
            >
              Select Image
            </Text>
          )}
          <Input
            accept="image/*"
            {...register("image", {
              required: "Product Image is Required",
              onChange: handleChangeImage,
            })}
            type="file"
            id="image"
            hidden
          />
        </Field>
        <Field
          invalid={Boolean(errors.name)}
          errorText={errors.name?.message}
          label="Product Name"
        >
          <Input
            {...register("name", { required: "Product Name is Required" })}
            placeholder="Write Product Name"
          />
        </Field>
        <Field
          invalid={Boolean(errors.category)}
          errorText={errors.category?.message}
          label="Product Category"
        >
          <Input
            {...register("category", {
              required: "Product Category is Required",
            })}
            placeholder="Write Product Category"
          />
        </Field>
        <Field
          invalid={Boolean(errors.price)}
          errorText={errors.price?.message}
          label="Product Price"
        >
          <Input
            {...register("price", { required: "Product Price is Required" })}
            placeholder="Write Product Price"
            min="0"
          />
        </Field>
        <Field
          invalid={Boolean(errors.description)}
          errorText={errors.description?.message}
          label="Product Description"
        >
          <Textarea
            {...register("description", {
              required: "Product Description is Required",
            })}
            placeholder="Write Product Description"
            resize="none"
            h="200px"
          ></Textarea>
        </Field>
        <Button
          w="full"
          loading={loading}
          loadingText="Loading..."
          type="submit"
          colorPalette="blue"
        >
          Add Product
        </Button>
      </Grid>
      <Toaster />
    </>
  );
}
