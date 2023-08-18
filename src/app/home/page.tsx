"use client";

import React, { useState } from "react";
import { Title, Button, Card, Header, Table, Td, Th, Tr, TableContainer } from "@/app/styles/Global";
import Link from 'next/link';
import Modal from "@/app/components/Modal";

export default function Home() {

  const [showModal, setShowModal] = useState(false);

  return (
    <Card>
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
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>City</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>1</Td>
              <Td>World</Td>
              <Td>World</Td>
              <Td>World</Td>
              <Td>World</Td>
              <Td><Button $background="#e88e1a" >edit</Button></Td>
              <Td><Button $background="#e8241aff" >delete</Button></Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>World</Td>
              <Td>World</Td>
              <Td>World</Td>
              <Td>World</Td>
              <Td><Button $background="#e88e1a" >edit</Button></Td>
              <Td><Button onClick={() => {
                setShowModal(true);
              }} $background="#e8241aff" >delete</Button></Td>
            </Tr>
          </tbody>
        </Table>
      </TableContainer>
      {showModal &&(
        <Modal isShown={showModal}>Do you want to cancel user: </Modal>)
      }
    </Card>
  )
}
