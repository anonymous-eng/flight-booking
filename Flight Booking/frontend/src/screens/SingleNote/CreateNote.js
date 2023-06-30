import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
  var dd = new Date().toISOString().split("T")[0];
  
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setFlight("");
    setDate("");
    setSeats("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    
    dispatch(createNoteAction(flight, date, seats));
    if (!flight || !date || !seats) return;
    resetHandler();
    history.push("/admin/main");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create Flight">
      <Card>
        <Card.Header>Create Flight</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Flight Name</Form.Label>
              <Form.Control
                type="title"
                value={flight}
                placeholder="Enter the Flight Name"
                onChange={(e) => setFlight(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
            <label>
              Date From:
              <input
            type="date"
            value={date}
            placeholder="DD/MM/YY"
            min={dd}
            onChange={(e) => setDate(e.target.value)}
          />
            </label>
            <Form.Group controlId="content">
              <Form.Label>Total Seats</Form.Label>
              <Form.Control
                type="title"
                value={seats}
                placeholder="Enter the Total No of Seats"
                onChange={(e) => setSeats(e.target.value)}
              />
            </Form.Group>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Flight
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
