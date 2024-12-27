import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Input } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { useState } from "react";
import axios from "axios";
import { mainUrl } from "../assets/data";
import { Toaster, toaster } from "../components/ui/toaster";
import Cookies from "universal-cookie";

export default function ConfirmEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (userEmail: { email: string }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "confirm-email", userEmail, {
        withCredentials: true,
      });
      console.log(data);
      cookies.set("email", userEmail.email);
      navigate("/WriteOTP");
    } catch (error: any) {
      console.log(error);
      toaster.error({
        title: "Error",
        description: "Error",
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box as="main" id="login" className="center" height="calc(100vh - 100px)">
      <Box
        as="form"
        maxWidth="650px"
        display="grid"
        gap={4}
        w="100%"
        px={6}
        mx="auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <Field
          label="Email"
          errorText={errors.email?.message}
          invalid={Boolean(errors.email?.message)}
        >
          <Input
            autoComplete="off"
            placeholder="Write Email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[A-Za-z]{5,20}[0-9]+@gmail\.com$/,
                message: "Email Syntax Must End By Numbers",
              },
            })}
          />
        </Field>
        <Button
          loading={loading}
          loadingText={"Loading..."}
          colorPalette="blue"
          type="submit"
        >
          Submit
        </Button>
      </Box>
      <Toaster />
    </Box>
  );
}
