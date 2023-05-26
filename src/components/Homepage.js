import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";
import GoToTop from "../goToTop";

const { Title } = Typography;
const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={18}>
        <Col span={6}>
          <Statistic
            className="stat-card"
            title="Total Cryptocurrencies"
            value={globalStats.totalCoins}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="stat-card"
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="stat-card"
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="stat-card"
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="stat-card"
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world :
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/cryptocurrencies"}>Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News :
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/news"}>Show More</Link>
        </Title>
      </div>
      <News simplified={true} />
      <GoToTop />
    </>
  );
};

export default Homepage;
