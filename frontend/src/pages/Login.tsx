import { Box, Input, Link } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { mainUrl } from "../assets/data";
import { Toaster, toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (userData: User) => {
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "login", userData, {
        withCredentials: true,
      });
      toaster.create({
        title: "Done",
        description: data.msg,
        type: "success",
        duration: 2000,
        action: {
          label: "Close",
          onClick() {},
        },
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toaster.create({
        title: "Error",
        description: error.response.data.msg,
        type: "error",
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
    <>
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
          {/* Password */}
          <Field
            label="Password"
            errorText={errors.password?.message}
            invalid={Boolean(errors.password?.message)}
          >
            <Input
              placeholder="Write Password"
              type="password"
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  message: "Minimum Length is 9",
                  value: 9,
                },
                maxLength: {
                  message: "Maximum Length is 20",
                  value: 20,
                },
              })}
            />
          </Field>
          <Link
            href="/ConfirmEmail"
            _hover={{ color: "red.500" }}
            transitionDuration="300ms"
          >
            You Don't Remember The Password ?
          </Link>
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
      <Toaster />
    </>
  );
}
