import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { omis: [], addModalShow: false, editModalShow: false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ omis: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }
  deleteEmp(empid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "employee/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }
  render() {
    const { omis, omisid, omisname, omisgroup, omisosoite, omisposti } =
      this.state;
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>OmistajaId</th>
              <th>Nimi</th>
              <th>Omistajarhymä</th>
              <th>Osoite</th>
              <th>Postitoimipaikka</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {omis.map((omi) => (
              <tr key={omi.OmistajaId}>
                <td>{omi.OmistajaId}</td>
                <td>{omi.Nimi}</td>
                <td>{omi.Omistajarhymä}</td>
                <td>{omi.Osoite}</td>
                <td>{omi.Postitoimipaikka}</td>

                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="secondary"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          omisid: omi.OmistajaId,
                          omisname: omi.Nimi,
                          omisgroup: omi.Omistajarhymä,
                          omisosoite: omi.Osoite,
                          omisposti: omi.Postitoimipaikka,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteEmp(omi.OmistajaId)}
                    >
                      Delete
                    </Button>

                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      omisid={omisid}
                      omisname={omisname}
                      omisgroup={omisgroup}
                      omisosoite={omisosoite}
                      omisposti={omisposti}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
