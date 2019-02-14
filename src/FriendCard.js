import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const FriendCard = (props) => {
    return (
        <Card style={{ width: "14rem"}}>
            <Card.Body>
                <Card.Title>
                    Friend
                </Card.Title>
                <Card.Text>
                    {props.friend}
                </Card.Text>
                <Button style={{ backgroundColor: "red"}}>Remove Friend</Button>
            </Card.Body>
        </Card>
    )
};