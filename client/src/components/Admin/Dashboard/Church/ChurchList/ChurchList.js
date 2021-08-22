import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, Spinner, Input, Row, Col } from "reactstrap";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { churchList } from "../../../../../store/actions/actions_church";

import "./ChurchList.css";

const ChurchList = () => {
  const dispatch = useDispatch();
  const [ searchTerm, setSearchTerm ] = useState("");
  const { churches, allLoading } = useSelector(state => state.church);

  useEffect(() => {
    const offset = 1;
    const limit = 10;
    const data = { offset, limit}
    dispatch(churchList(data));
  }, [ dispatch ]);

  const handleNextPage = (page_number) => {
    const offset = page_number;
    const limit = 10;
    const data = { offset, limit };
    dispatch(churchList(data));
  }

  const totalPages = churches?.totalPages;
  const page = churches?.page;
  const prevPage = churches?.prevPage;
  const nextPage = churches?.nextPage;

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i);
  }

  return (
    <div>
      <Card className="church-card">
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              <h1>Church List</h1>  
            </Col>
            <Col xs="12" sm="12" md="12" lg="9" xl="9">
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <th>S/N</th>
              <th>Head Pastor</th>
              <th>Branch</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>View Detail</th>
            </thead>
            <tbody className="mt-4">
              {allLoading ? 
                <div className="text-center">
                  <Spinner animation="grow" color="info">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div> : 
                churches && churches.docs && churches.docs.length > 0 ? churches.docs.map((church, i) => (
                  <tr key={church && church._id}>
                    <td>{i+1}</td>
                    <td>{church && church.head_pastor}</td>
                    <td>{church && church.branch}</td>
                    <td>{church && church.email}</td>
                    <td>{church && church.phone}</td>
                    <td>{church && church.address && church.address.street}</td>
                    <td>{church && church.address && church.address.city}</td>
                    <td>{church && church.address && church.address.state}</td>
                    <td className="view-church" onClick={() => window.location.href=`/church/${church && church.subdomain_name}`}>View <EyeOutlined size="large" /></td>
                  </tr>
                )) : <h2 className="text-center mt-5">No records found</h2>}
            </tbody>
          </Table>
            <div className="justify-content-center">
              {churches && churches.totalPages && churches.totalPages > 1 ? (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center mt-5">
                    <li className="page-item">
                      <span className="page-link" onClick={() => handleNextPage(prevPage)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        
                      </span>
                    </li>
                    {paginateArr && paginateArr.map((p, i) => (
                      <li key={i} onClick={() => handleNextPage(p && p)} className={p === page ? `page-item active` : "page-item"}><span className="page-link">{p}</span></li>
                    ))}
                    
                    <li className="page-item">
                      <span className="page-link" onClick={() => handleNextPage(nextPage && nextPage)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </span>
                    </li>
                  </ul>
                </nav>
              ) : null}
            </div>
        </CardBody>  
      </Card>
    </div>
  )
}

export default ChurchList;