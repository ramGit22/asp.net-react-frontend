import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

export class EditEmpModal extends Component {
  constructor(props) {
    super(props);
    this.state = { omis: [] };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API + "employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ omis: data });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OmistajaId: event.target.OmistajaId.value,
        Nimi: event.target.Nimi.value,
        Omistajarhymä: event.target.Omistajarhymä.value,
        Osoite: event.target.Osoite.value,
        Postitoimipaikka: event.target.Postitoimipaikka.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header clooseButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Omistaja
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="OmistajaId">
                    <Form.Label>OmistajaId</Form.Label>
                    <Form.Control
                      type="text"
                      name="OmistajaId"
                      required
                      placeholder="OmistajaId"
                      disabled
                      defaultValue={this.props.omisid}
                    />
                  </Form.Group>

                  <Form.Group controlId="Nimi">
                    <Form.Label>Nimi</Form.Label>
                    <Form.Control
                      type="text"
                      name="Nimi"
                      required
                      defaultValue={this.props.omisname}
                      placeholder="Nimi"
                    />
                  </Form.Group>

                  <Form.Group controlId="Omistajarhymä">
                    <Form.Label>Omistajarhymä</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={this.props.omisgroup}
                    >
                      {this.state.omis.map((dep) => (
                        <option key={dep.OmistajaId}>
                          {dep.Omistajarhymä}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="Osoite">
                    <Form.Label>Osoite</Form.Label>
                    <Form.Control
                      type="text"
                      name="Osoite"
                      required
                      defaultValue={this.props.omisosoite}
                      placeholder="Osoite"
                    />
                  </Form.Group>

                  <Form.Group controlId="Postitoimipaikka">
                    <Form.Label>Postitoimipaikka</Form.Label>
                    <Form.Control
                      type="text"
                      name="Postitoimipaikka"
                      required
                      defaultValue={this.props.omisposti}
                      placeholder="Postitoimipaikka"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="dark" type="submit">
                      Update Omistaja
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
