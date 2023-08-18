'use client';

import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer, ModalPosition, ModalTitleContainer, ModalBody, ModalTextContainer, ButtonContainer, Button  } from "@/app/styles/Global";
import { setModalState, selectModalUser } from "@/app/store/slices/modalSlice";
import { setUsersData, selectUsersData } from "@/app/store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/app/api/user";

interface ModalProps {
    children: React.ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({
    children,
  }) => {

    const modalUser = useSelector(selectModalUser);
    const usersData = useSelector(selectUsersData);
    const dispatch = useDispatch();

    const deleteChoosenUser = async () => {
      await deleteUser(modalUser["id"]);
      dispatch(setModalState(false));
      const usersDataFiltered = usersData.filter((userItem: any) => (userItem["id"] !== modalUser["id"]));
      dispatch(setUsersData(usersDataFiltered));
    }

    const modalContent = (
        <ModalContainer>
            <ModalPosition>
                <ModalBody>
                    <ModalTitleContainer>Delete</ModalTitleContainer>
                    <ModalTextContainer>{children} {modalUser["name"]}</ModalTextContainer>
                    <ButtonContainer>
                        <Button onClick={() => {
                            dispatch(setModalState(false));
                        }} $background="#777777ff" >Cancel
                        </Button>
                        <Button onClick={() => {
                            deleteChoosenUser();
                        }} $background="#e8241aff" >Delete</Button>
                    </ButtonContainer>
                </ModalBody>
            </ModalPosition>
        </ModalContainer>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default Modal
