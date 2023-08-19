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
  FormStatusMessage, 
  ButtonContainer, 
  FormContainer, 
  FormErrorField,
  Error
} from "@/app/styles/Global";
import { selectUsersData, setUsersData } from "@/app/store/slices/usersSlice";
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { setEditUserData, setFetchingUserState, selectFetchingUserState, selectEditUserData, setSubmitFormStatus, selectSubmitFormStatus } from "@/app/store/slices/editUserSlice";
import { editUser, getUser } from "@/app/api/user";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';

export default function Edit({ params }: { params: { id: string } }) {

  const userData = useSelector(selectEditUserData);
  const usersData = useSelector(selectUsersData);
  const userStatus = useSelector(selectSubmitFormStatus);
  const loadingState = useSelector(selectFetchingUserState);
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
    return () => {
      dispatch(setSubmitFormStatus(''));
    };
    // eslint-disable-next-line
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
    try {
      //update user list store
      const updatedUser = await editUser({...userData, ...data}, userData["id"]);
      let usersDataToUpdate: any = [...usersData];
      [updatedUser].forEach((userItem: any) => {
        const indexItem: any = usersDataToUpdate.findIndex((itemFromUserData: any) => itemFromUserData.id === userItem.id);
        if(indexItem > -1) {
          usersDataToUpdate[indexItem] = userItem;
        } else {
          usersDataToUpdate = usersDataToUpdate.push(userItem);
        }       
      });
      dispatch(setUsersData(usersDataToUpdate));
      dispatch(setSubmitFormStatus('success'));
    } catch (error) {
      dispatch(setSubmitFormStatus('error'));
    }
  }

  return (
    <FormContainer>
      <Card>
        {(loadingState === 'loading') && (
          <Image
            src="/loading.png"
            width={50}
            height={50}
            alt="Loading"
            style={{display: "block", margin: "auto"}}
          />
        )}
        {(loadingState === 'done') && (
          <React.Fragment>
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
              <ButtonContainer $paddingRight="0">
              <Link href="/home"><Button $color="#e8241aff" $border="1px solid #e8241aff" >Cancel</Button></Link>
              <Button $background="#11b524" >Submit</Button>
              </ButtonContainer>
            </Form>
            {(userStatus === 'success') && <FormStatusMessage $color="green">User updated successfully</FormStatusMessage>}
            {(userStatus === 'error') && <FormStatusMessage $color="red">Update failed, try again</FormStatusMessage>}
          </React.Fragment>
        )}
        {(loadingState === 'error') && (
        <Error>Something is wrong, please go to homepage<Link href={`/home`}><Button $background="#e88e1a" >Home</Button></Link></Error>
        )}
      </Card>
    </FormContainer>
  )
}
