import styled from "styled-components";
import NavBar from "../Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import MiniChart from "../coinList/MiniChart";
import { useParams } from "react-router";
import TradeViewChart from "react-crypto-chart";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const CoinInfo = () => {
  const [metadata, setMetadata] = useState(null);
  const { coin } = useParams();
  const [price, setPrice] = useState(0.0);

  console.log(coin);

  useEffect(() => {
    fetchGrahp();

    const socket = SockJS('http://localhost:8080/wss');
    const stompClient = Stomp.over(socket);
    
    stompClient.connect({}, () => {
      stompClient.subscribe('/crypto/' + coin, (data) => {
        let json = JSON.parse(data.body);
        setPrice(() => json.price)
        console.log(price, json.price)
      });
    }); 

    console.log("useEffect")

    return () => stompClient.disconnect(() => { })
  }, []);

  console.log(price)
  const fetchGrahp = () => {
    axios
      .get("http://localhost:8080/api/assets/" + coin, {
        headers: { "Access-Control-Allow-Origin": "*" },
        auth: { username: "sergio.bernal", password: "1234" },
      })
      .then((data) => {
        console.log(data);
        setMetadata(data.data.data);
      });
  };

  const imgStyle = { height: 40, width: 40 };
  console.log(metadata);
  
  if (metadata === null) {
    return null;
  }

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <TitleContainer>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FirstTitleContainer>
                <img
                  src={metadata.image}
                  style={imgStyle}
                />
                <Typography
                  variant="h4"
                  display="block"
                  style={{
                    color: "white",
                    marginLeft: "20px",
                    marginTop: "1px",
                    fontWeight: "bold",
                  }}
                >
                  {metadata.name}
                </Typography>
                <SymbolContainer>
                  <Typography
                    variant="body1"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {metadata.symbol.toUpperCase()}
                  </Typography>
                </SymbolContainer>
              </FirstTitleContainer>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                display="block"
                style={{ color: "#8a919e", fontWeight: "bold" }}
              >
                {metadata.name} price ({metadata.symbol.toUpperCase()})
              </Typography>
              <SecondTitleContainer>
                <Typography
                  variant="h4"
                  display="block"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "6px",
                  }}
                >
                  ${price}
                </Typography>
                <NegativeContainer>
                  <MdKeyboardArrowUp
                    style={{ marginTop: "15px", marginLeft: "10px" }}
                  />
                  <Typography
                    variant="body1"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    0.01%
                  </Typography>
                </NegativeContainer>
              </SecondTitleContainer>

              <Divider style={{ marginTop: "40px", marginBottom: "10px" }} />

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "#a1a7bb",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    Market Cap
                  </Typography>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    $459,939,862,561
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "#a1a7bb",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    Market Cap
                  </Typography>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    $459,939,862,561
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "#a1a7bb",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    Market Cap
                  </Typography>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    $459,939,862,561
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "#a1a7bb",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    Market Cap
                  </Typography>
                  <Typography
                    variant="body2"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginRight: "10px",
                    }}
                  >
                    $459,939,862,561
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TitleContainer>

        <SecondPart>
          <ChartContainer>
            <Typography
              variant="h5"
              display="block"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {metadata.name} to USD Chart
            </Typography>
            <ActualChartContainer>
              <TradeViewChart
                containerStyle={{
                  minHeight: "300px",
                  minWidth: "400px",
                  marginBottom: "30px",
                }}
                pair={metadata.symbol.toUpperCase() + "USDT"}
                chartLayout={{
                  layout: {
                    backgroundColor: "transparent",
                    textColor: "white",
                  },
                  grid: {
                    vertLines: {
                      color: "#838fa3",
                    },
                    horzLines: {
                      color: "#838fa3",
                    },
                  },

                  priceScale: {
                    borderColor: "#485c7b",
                  },
                  timeScale: {
                    borderColor: "#485c7b",
                    timeVisible: true,
                    secondsVisible: false,
                  },
                }}
                candleStickConfig={{
                  upColor: "red",
                  borderDownColor: "transparent",
                  borderUpColor: "transparent",
                }}
              />
              {/* <MiniChart history={history} /> */}
            </ActualChartContainer>
          </ChartContainer>

          <DescriptionContainer>
            <Typography
              variant="h5"
              display="block"
              style={{ color: "white", fontWeight: "bold" }}
            >
              What Is {metadata.name} ({metadata.symbol.toUpperCase()})?
            </Typography>

            <Typography
              variant="body1"
              style={{
                color: "#8a919e",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              {metadata.description}
            </Typography>
          </DescriptionContainer>
        </SecondPart>
      </Wrapper>
    </>
  );
};

export default CoinInfo;

const Wrapper = styled.div`
  padding-left: 80px;
  padding-right: 80px;
`;

const TitleContainer = styled.div`
  margin-top: 120px;
  margin-left: 60px;
  margin-right: 60px;
  color: white;
`;

const FirstTitleContainer = styled.div`
  display: flex;
  margin-top: 25px;
`;

const SecondTitleContainer = styled.div`
  display: flex;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const SymbolContainer = styled.div`
  margin-left: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #495057;
`;

const SecondPart = styled.div`
  background-color: #181a20;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  margin-top: 30px;
  margin-top: 80px;
  padding-top: 1px;
  padding-bottom: 100px;
`;

const NegativeContainer = styled.div`
  display: flex;
  margin-left: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #ea3943;
`;

const PositiveContainer = styled.div`
  display: flex;
  margin-left: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #16c784; ;
`;

const ChartContainer = styled.div`
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
`;

const DescriptionContainer = styled.div`
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
`;

const ActualChartContainer = styled.div`
  border: 1px solid #282b2f;
  margin-top: 30px;
  padding: 1rem 2rem;
`;
