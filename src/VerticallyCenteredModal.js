import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import CardColumns from "react-bootstrap/CardColumns";
import { FriendCard } from "./FriendCard";

export default class VerticallyCenteredModal extends React.Component {
    render (){
        let friendsMarkup = this.props.friends.map((friend, index) => {
            return (
                <FriendCard friend={friend}></FriendCard>
            )
        });

        return (
            <Modal
                {... this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>
                    <ModalTitle id="contained-modal-title-vcenter">
                        Your Friends
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <CardColumns>
                        {friendsMarkup}
                    </CardColumns>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.onHide}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}