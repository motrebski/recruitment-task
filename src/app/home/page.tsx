"use client";

import React, { useEffect } from 'react'
import { Title, Button, Card, Header, Table, Td, Th, Tr, TableContainer } from "@/app/styles/Global";
import Link from 'next/link';
import Modal from "@/app/components/Modal";
import { selectModalState, setModalState, setModalUser } from "@/app/store/slices/modalSlice";
import { setUsersData, setFetchingUsersState, selectUsersData, selectFetchingUsersState } from "@/app/store/slices/usersSlice";
import { getUsers } from "@/app/api/user";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const modalState = useSelector(selectModalState);
  const usersData = useSelector(selectUsersData);
  const loadingState = useSelector(selectFetchingUsersState);
  //const usersData = [{id: 1, name: 'dd', username: 'zz', email: 'rr', city: 'ww'}, {id: 1, name: 'dd', username: 'rr', email: 'rr', city: 'ww'}];
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    dispatch(setFetchingUsersState('loading'));
    try {
      const users = await getUsers();
      dispatch(setUsersData(users));
      dispatch(setFetchingUsersState('done'));
    } catch (error) {
      dispatch(setFetchingUsersState('error'));
    }
  }

  const sortByUsername = () => {
    const usersDataToSort = [...usersData];
    usersDataToSort.sort((a: any, b: any) => a.username > b.username ? 1 : -1);
    dispatch(setUsersData(usersDataToSort));
  }

  return (
    <Card>
      {(loadingState === 'loading') && (
        <div>Loading</div>
      )}
      {(loadingState === 'done') && (
      <React.Fragment>
        <Header>
          <Title $fontSize="large">User List</Title>
          <Link href="/add"><Button $background="#1a73e8ff" >Add new</Button></Link>
        </Header>
        <TableContainer>
          <Table>
            <thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th 
                  onClick={() => { 
                    sortByUsername(); 
                  }}>Username ↑
                </Th>
                <Th>Email</Th>
                <Th>City</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </thead>
            <tbody>
              {usersData.map((userItem: any, key) => (
                <Tr key={key}>
                  <Td>{userItem["id"]}</Td>
                  <Td>{userItem.name}</Td>
                  <Td>{userItem.username}</Td>
                  <Td>{userItem.email}</Td>
                  <Td>{userItem.city}</Td>
                  <Td><Link href={`/edit/${userItem["id"]}`}><Button $background="#e88e1a" >edit</Button></Link></Td>
                  <Td><Button 
                    onClick={() => {
                      dispatch(setModalState(true));
                      dispatch(setModalUser(userItem));
                    }} 
                    $background="#e8241aff" >delete</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        {modalState &&
          (<Modal>Do you want to cancel user: </Modal>)
        }
      </React.Fragment>
      )}
      {(loadingState === 'error') && (
        <div>Error</div>
      )}
    </Card>
  )
}
