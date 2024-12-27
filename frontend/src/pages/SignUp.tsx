import { Box, createListCollection, Input } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { countryList } from "../assets/countries";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { mainUrl } from "../assets/data";
import { toaster, Toaster } from "../components/ui/toaster";

type User = {
  username: string;
  email: string;
  password: string;
  country: string;
  phone: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [loading, setLoading] = useState(false);
  const frameworks = createListCollection({ items: countryList });
  const onSubmit = async (userData: User) => {
    try {
      setLoading(true);
      const { data } = await axios.post(mainUrl + "sign-up", userData);
      toaster.create({
        title: "Done",
        type: "success",
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
      toaster.create({
        title: "Error",
        type: "error",
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
          {/* Username */}
          <Field
            label="Username"
            errorText={errors.username?.message}
            invalid={Boolean(errors.username?.message)}
          >
            <Input
              autoComplete="off"
              placeholder="Write Username"
              {...register("username", {
                required: "Username is Required",
                minLength: {
                  message: "Minimum Length is 5",
                  value: 5,
                },
                maxLength: {
                  message: "Maximum Length is 20",
                  value: 20,
                },
              })}
            />
          </Field>
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
          {/* Phone */}
          <Field
            label="Phone"
            errorText={errors.phone?.message}
            invalid={Boolean(errors.phone?.message)}
          >
            <Input
              placeholder="Write Your Phone Number"
              {...register("phone", {
                required: "Password is Required",
              })}
            />
          </Field>
          {/* Country */}
          <Field
            label="Country"
            invalid={Boolean(errors.country?.message)}
            errorText={errors.country?.message}
          >
            <SelectRoot
              collection={frameworks}
              {...register("country", { required: "Country is Required" })}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.items.map((country) => (
                  <SelectItem item={country} key={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
          {/* Button Submit */}
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
