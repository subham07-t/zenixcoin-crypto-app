import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";


const CryptocurrenciesComponent = ({ currency }) => {
  return (
    <Col
      xs={24}
      sm={12}
      lg={6}
      key={currency.uuid}
      className="crypto-card"
    >
      <Link to={`/cryptocurrencies/${currency.uuid}`}>
        <Card
          title={`${currency.rank}. ${currency.name}`}
          extra={
            <img
              src={currency.iconUrl}
              alt="crypto"
              className="crypto-image"
            />
          }
          hoverable
        >
          <p>Price:{millify(currency.price)}</p>
          <p>Market Cap:{millify(currency.marketCap)}</p>
          <p>Daily Change:{millify(currency.change)}%</p>
        </Card>
      </Link>
    </Col>
  )
}

const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);



  useEffect(() => {
    setIsEmpty(false)
    setCryptos(cryptoList?.data?.coins)
    setIsLoading(false)
  }, [cryptoList])

  useEffect(() => {
    setIsEmpty(false)
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);

    if (filteredData?.length === 0) {
      setIsEmpty(true)
    }

  }, [cryptoList, searchTerm]);

  if (isLoading || isFetching || !cryptoList?.data) return <Loader />;


  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        </div>
      )}

      {isEmpty && (<Title level={3} className="heading">
        Not Found - search another crypto
      </Title>)}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {!cryptos ? cryptoList?.data?.coins?.map((currency, i) => <CryptocurrenciesComponent currency={currency} key={i} />) : cryptos?.map((currency, i) => <CryptocurrenciesComponent currency={currency} key={i} />)}
      </Row>


    </>
  );
};

export default Cryptocurrencies;




