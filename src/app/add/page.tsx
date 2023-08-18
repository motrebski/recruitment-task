'use client';

import React from "react";
import { Button, Card, Title, Header, FieldContainer, Input, Label, Form, ButtonContainer, FormContainer, FormErrorField } from "@/app/styles/Global";
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { addUser } from "@/app/api/user";

export default function Add() {

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

  return (
    <FormContainer>
      <Card>
        <Header>
          <Title>Add Form</Title>
        </Header>
        <Form
          onSubmit={handleSubmit((data) => {
            addUser(data);
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
