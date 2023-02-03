import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";



import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)



  if (isFetching) return "Loading ...";

  return <>
    <Row gutter={[32, 32]} className="crypto-card-comtainer">

      {
        cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={currency.uuid} className="crypto-card">
            <Link to={`./crypto/${currency.uuid}}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className="crypto-image" />}
                hoverable
              >
                <p>Price:{millify(currency.price)}</p>
                <p>Market Cap:{millify(currency.marketCap)}</p>
                <p>Daily Change:{millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))

      }
    </Row>
  </>
};

export default Cryptocurrencies;
