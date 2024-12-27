import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaUserEdit } from "react-icons/fa";
import { Input, Text } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useForm } from "react-hook-form";
import { getToken, mainUrl } from "../assets/data";
import axios from "axios";
import { Toaster, toaster } from "./ui/toaster";
import { countryList } from "../assets/countries";

type User = {
  username: string;
  email: string;
  country: string;
  phone: string;
};

export default function UserDialogUpdateData() {
  const { token, _id } = getToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit = async (userData: User) => {
    try {
      console.log(userData);
      const { data } = await axios.patch(mainUrl + "update-user", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: _id,
        },
      });
      toaster.success({
        title: "Success",
        duration: 2000,
        description: data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    } catch (error: any) {
      console.log(error);
      toaster.error({
        title: "Error",
        duration: 2000,
        description: error.response.data.msg,
        action: {
          label: "Close",
          onClick() {},
        },
      });
    }
  };
  return (
    <>
      <DialogRoot closeOnEscape={true}>
        {/* Trigger */}
        <DialogTrigger asChild>
          <Button size="sm" colorPalette="blue" w="full">
            <FaUserEdit />
            <Text as="span" display={{ base: "none", lg: "inline" }}>
              Edit Profile
            </Text>
          </Button>
        </DialogTrigger>
        {/* Content */}
        <DialogContent>
          {/* Header */}
          <DialogHeader>
            <DialogTitle>Update User Data</DialogTitle>
            {/* Close */}
            <DialogCloseTrigger />
          </DialogHeader>
          {/* Body As Form */}
          <DialogBody
            as="form"
            display="grid"
            gap={4}
            id="form"
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
                  pattern: {
                    value: /^[A-Za-z]{5,20}[0-9]+@gmail\.com$/,
                    message: "Email Syntax Must End By Numbers",
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
                {...register("phone")}
              />
            </Field>
            {/* Country */}
            <Field
              label="Country"
              invalid={Boolean(errors.country?.message)}
              errorText={errors.country?.message}
            >
              <select
                {...register("country")}
                style={{
                  padding: "0 12px",
                  height: "40px",
                  width: "100%",
                  border: "1px solid #e4e4e7",
                  borderRadius: "0.25rem",
                }}
              >
                {countryList.map((country) => (
                  <option key={country.label} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </Field>
          </DialogBody>
          {/* Footer */}
          <DialogFooter>
            <Button colorPalette="blue" w="full" form="form" type="submit">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      <Toaster />
    </>
  );
}
