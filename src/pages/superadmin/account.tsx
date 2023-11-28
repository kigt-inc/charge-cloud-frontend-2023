import { ChangeEvent, useState } from "react";
import {
  Box,
  Card,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Alert,
} from "@chakra-ui/react";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useAppSelector } from "@/hooks/useReduxToolkit";
import withAuth from "@/components/Auth/WithAuth";

const EMAIL_VALIDATION_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const Account = () => {
  const user = useAppSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountForm, setAccountForm] = useState({
    name: user?.first_name,
    email: user?.email,
  });
  const [accountFormErrors, setAccountFormErrors] = useState<{
    name: boolean;
    email: boolean;
  }>({
    name: false,
    email: false,
  });

  const validateNameValue = () => {
    if (accountForm.name === "") {
      setAccountFormErrors((prev) => ({ ...prev, name: true }));
      return false;
    } else {
      setAccountFormErrors((prev) => ({ ...prev, name: false }));
      return true;
    }
  };

  const validateEmailValue = () => {
    if (accountForm.email) {
      const regexResult = EMAIL_VALIDATION_REGEX.test(accountForm.email);
      if (regexResult === false) {
        setAccountFormErrors((prev) => ({
          ...prev,
          email: true,
        }));
        return false;
      } else {
        setAccountFormErrors((prev) => ({
          ...prev,
          email: false,
        }));
        return true;
      }
    }
  };

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    let res1 = validateEmailValue();
    let res2 = validateNameValue();
    if (res1 === false || res2 === false) {
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
    setIsSubmitting(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <Container maxWidth="6xl" p="1.5rem">
        <Text fontSize="1.625rem" fontWeight="600">
          Account Settings
        </Text>
        <Text color="GrayText">Update your account settings here</Text>

        <Card p="2rem" mt="2rem">
          <FormControl
            label="name"
            isRequired
            id="name"
            mb="2rem"
            isInvalid={accountFormErrors.name}
          >
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              value={accountForm.name}
              onChange={handleChange}
            />
            <FormErrorMessage>A valid name is required.</FormErrorMessage>
          </FormControl>
          <FormControl
            label="email"
            isRequired
            id="email"
            isInvalid={accountFormErrors.email}
          >
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="text"
              value={accountForm.email}
              onChange={handleChange}
            />

            <FormErrorMessage>A valid email is required.</FormErrorMessage>
          </FormControl>

          <Button
            bgColor="#00A067"
            color="white"
            variant={"solid"}
            onClick={handleFormSubmit}
            float="right"
            mt="2rem"
            alignSelf="flex-end"
            isDisabled={isSubmitting}
          >
            Save
          </Button>
        </Card>
        {showAlert && (
          <Alert status="success" variant="left-accent" mt="2rem">
            Changes saved.
          </Alert>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(Account, "superadmin");
