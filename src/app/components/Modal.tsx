'use client';

import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer, ModalPosition, ModalTitleContainer, ModalBody, ModalTextContainer, ButtonContainer, Button  } from "@/app/styles/Global";

interface ModalProps {
    isShown: boolean;
    children: React.ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({
    isShown,
    children
  }) => {

    const modalContent = (
        <ModalContainer>
            <ModalPosition>
                <ModalBody>
                    <ModalTitleContainer>Delete</ModalTitleContainer>
                    <ModalTextContainer>{children}</ModalTextContainer>
                    <ButtonContainer>
                        <Button $background="#777777ff" >Cancel</Button>
                        <Button $background="#e8241aff" >Delete</Button>
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
