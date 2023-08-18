'use client';

import React, { useEffect } from 'react'
import { Button, Card, Title, Header, FieldContainer, Input, Label, Form, ButtonContainer, FormContainer, FormErrorField } from "@/app/styles/Global";
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { setEditUserData, setFetchingUserState, selectEditUserData } from "@/app/store/slices/editUserSlice";
import { editUser, getUser } from "@/app/api/user";
import { useDispatch, useSelector } from "react-redux";

export default function Edit({ params }: { params: { id: string } }) {

  const userData = useSelector(selectEditUserData);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
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
    fetchUser();
  }, []);

  const fetchUser = async () => {
    dispatch(setFetchingUserState('loading'));
    try {
      const user: any = await getUser(params.id);
      reset(
        { name: user.name, username: user.username, email: user.email, city: user.city }
      );
      dispatch(setEditUserData(user));
      dispatch(setFetchingUserState('done'));
    } catch (error) {
      dispatch(setFetchingUserState('error'));
    }
  }

  const editUserData = async (data: any) => {
    await editUser({...userData, ...data}, userData["id"]);
  }

  return (
    <FormContainer>
      <Card>
        <Header>
          <Title>Edit Form</Title>
        </Header>
        <Form
          onSubmit={handleSubmit((data) => {
            editUserData(data);
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
      </Card>
    </FormContainer>
  )
}
