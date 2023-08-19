'use client';

import React, { useEffect } from 'react';
import { 
  Button,
  Card,
  Title,
  Header,
  FieldContainer,
  Input,
  Label,
  Form,
  ButtonContainer,
  FormContainer, 
  FormErrorField,
  FormStatusMessage
} from "@/app/styles/Global";
import { setUsersData, selectUsersData } from "@/app/store/slices/usersSlice";
import { setSubmitFormStatus, selectSubmitFormStatus } from "@/app/store/slices/editUserSlice";
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { addUser } from "@/app/api/user";
import { useDispatch, useSelector } from "react-redux";

export default function Add() {

  const userStatus = useSelector(selectSubmitFormStatus);
  const usersData = useSelector(selectUsersData);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: ""
    }
  });

  useEffect(() => {
    return () => {
      dispatch(setSubmitFormStatus(''));
    };
    // eslint-disable-next-line
  }, []);

  const addNewUser = async (data: any) => {
    try {
      const user: any = await addUser(data);
      const usersDataToAdd = [...usersData];
      usersDataToAdd.push(user);
      dispatch(setUsersData(usersDataToAdd));
      dispatch(setSubmitFormStatus('success'));
    } catch (error) {
      dispatch(setSubmitFormStatus('error'));
    }
  }

  return (
    <FormContainer>
      <Card>
        <Header>
          <Title>Add Form</Title>
        </Header>
        <Form
          onSubmit={handleSubmit((data) => {
            addNewUser(data);
          })}
        >
          <FieldContainer>
            <Label>Name:</Label>
            <Input {...register("name", { required: "Required field"})} />
          </FieldContainer>
          {errors.name && <FormErrorField>{errors.name.message}</FormErrorField>}
          <FieldContainer>
            <Label>Username:</Label>
            <Input
              {...register("username", { required: "Required field"})}
            />
          </FieldContainer>
          {errors.username && <FormErrorField>{errors.username.message}</FormErrorField>}
          <FieldContainer>
            <Label>Email:</Label>
            <Input {...register("email", { 
              required: "Required field",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please use email format"
              }})} />
          </FieldContainer>
          {errors.email && <FormErrorField>{errors.email.message}</FormErrorField>}
          <FieldContainer>
            <Label>City:</Label>
            <Input {...register("city", { required: "Required field"})} />
          </FieldContainer>
          {errors.city && <FormErrorField>{errors.city.message}</FormErrorField>}
          <ButtonContainer>
          <Link href="/home"><Button $color="#e8241aff" $border="1px solid #e8241aff" >Cancel</Button></Link>
          <Button $background="#11b524" >Submit</Button>
          </ButtonContainer>
        </Form>
        {(userStatus === 'success') && <FormStatusMessage $color="green">User added successfully</FormStatusMessage>}
        {(userStatus === 'error') && <FormStatusMessage $color="red">User not added, try again</FormStatusMessage>}
      </Card>
    </FormContainer>
  )
}
