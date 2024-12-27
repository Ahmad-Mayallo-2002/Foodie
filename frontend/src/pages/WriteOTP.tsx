import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Input } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Toaster, toaster } from "../components/ui/toaster";

export default function WriteOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ otp: string }>();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const otp = cookies.get("otp");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: { otp: string }) => {
    try {
      setLoading(true);
      if (otp !== Number(data.otp)) {
        toaster.error({
          title: "Error",
          description: "Invalid OTP Number",
          duration: 2000,
          action: {
            label: "Close",
            onClick() {},
          },
        });
        return;
      }
      navigate("/UpdatePassword");
    } catch (error) {
      console.log(error);
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
        {/* OTP */}
        <Field
          label="OTP"
          errorText={errors.otp?.message}
          invalid={Boolean(errors.otp?.message)}
        >
          <Input
            autoComplete="off"
            placeholder="Write OTP"
            {...register("otp", {
              required: "OTP is Required",
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
