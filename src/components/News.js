import React, { useState } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import GoToTop from "../goToTop";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewscategory] = useState("cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  if (!cryptoNews?.articles) return <Loader />;
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewscategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin, index) => (
                <Option key={index} value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews.articles.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.title}
                  </Title>
                  {/* <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl}
                    alt="news"
                  /> */}
                </div>
                {/* <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p> */}
                <div className="provider-container">
                  <div>
                    {/* <Avatar
                      // src={news.provide[0]?.image?.thumbnail?.contentUrl}
                      alt="news"
                    /> */}
                    <Text className="Provider-name">
                      {news.publisher?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.published_date).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      <GoToTop />
    </>
  );
};

export default News;
