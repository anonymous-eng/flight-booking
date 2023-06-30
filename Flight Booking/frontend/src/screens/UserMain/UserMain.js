import React, { useEffect, useState } from "react";
import { Form, Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from'moment';

import { useDispatch, useSelector } from "react-redux";
import { searchNotes, bookNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function UserMain({ history}) {

  var dd = new Date().toISOString().split("T")[0];
  
  const [date, setDate] = useState("");
  const dispatch = useDispatch();


  const noteSearch = useSelector((state) => state.noteSearch);
  const { loading, error, trip } = noteSearch;
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteBook = useSelector((state) => state.noteBook);
  const { record} = noteBook;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [
    history,
    userInfo,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchNotes(date));
  };

  const bookHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(bookNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(trip)}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Tabs
      defaultActiveKey="Book"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Book" title="Book">
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="content">
            <Form.Label>Flight From</Form.Label>
            <Form.Control
              type="date"
              value={date}
              placeholder="DD/MM/YY"
              min={dd}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Search
          </Button>
          <br></br>
          {trip &&
        trip
          .map((tri) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={tri._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(tri)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                      <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {tri.flight}
                    </Accordion.Toggle>
                      
                      
                      
                  </span>
                  <div>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => bookHandler(tri._id)}
                    >
                      Book
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Date - {moment(tri.date).utc().format('DD/MM/YY')}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{tri.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Seats Left -
                        <cite title="Source Title">
                        {tri.seats}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              </Accordion>
          ))}
        </Form>
      </Tab>
      <Tab eventKey="My Bookings" title="My Bookings">
        Working...
      </Tab>
    </Tabs>
      
    </MainScreen>
  );
}

export default UserMain;
