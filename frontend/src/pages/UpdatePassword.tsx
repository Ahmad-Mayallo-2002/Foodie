import { Button } from "../components/ui/button";
import { Box, Input } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { mainUrl } from "../assets/data";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

type Password = { password: string; confirmPassword: string };

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>();
  const navigate = useNavigate();
  const onSubmit = async (userPasswords: Password) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        mainUrl + "update-password",
        userPasswords
      );
      console.log(data);
      navigate("/Login");
    } catch (error: any) {
      setLoading(false);
      toaster.error({
        title: "Error",
        description: "error.response.msg.data",
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      console.log(error);
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
        {/* OTP */}
        <Field
          label="New Password"
          errorText={errors.password?.message}
          invalid={Boolean(errors.password?.message)}
        >
          <Input
            autoComplete="off"
            type="password"
            placeholder="Write OTP"
            {...register("password", {
              required: "Password is Required",
            })}
          />
        </Field>
        {/* Confirm Password */}
        <Field
          label="Confirm Password"
          errorText={errors.confirmPassword?.message}
          invalid={Boolean(errors.confirmPassword?.message)}
        >
          <Input
            autoComplete="off"
            type="password"
            placeholder="Write OTP"
            {...register("confirmPassword", {
              required: "Check Password is Required",
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
    </Box>
  );
}
