import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import LandingImage from "./images/landing-image.png";
import Image2 from "./images/image-2.png";
import CheckmarkCircle from "./images/checkmark-circle.png";
import IncomeManagement from "./images/Income-Management.svg";
import EverythingInOnePlace from "./images/Everything-in-One-Place.svg";
import PaymentOnYourTerms from "./images/Payment-on-Your-Terms.svg";
import Client from "./images/Client.svg";
import Contractor from "./images/Contractor.svg";
import AboutUs from "./images/AboutUs.svg";

const Home = () => {

  return (
    <div className="Homepage page">
      <Header />
      <Container>
        <Row className="LandingSection justify-content-between">
          <Col lg="4" md="4" xs="8" className="LandingSection_left-section mb-5">
            <div>
              <h1 className="LandingSection--heading">
                Your money<br />where you<br />want it.
              </h1>
              <p className="LandingSection--content">On the blockchain and in your bank account.</p>
              <button className="LandingSection--button">How Binamite Works</button>
            </div>
          </Col>
          <Col lg="7" md="7" xs="9">
            <img className="LandingSection--image" src={LandingImage} />
          </Col>
        </Row>
        <Row className="ImgContent justify-content-around">
          <Col lg="4" md="4" xs="8">
            <img className="ImgContent--image" src={IncomeManagement} />
          </Col>
          <Col lg="5" md="5" xs="9" className="ImgContent_section">
            <div>
              <h2 className="ImgContent--heading">
                Income Management – Simplified
              </h2>
              <p className="ImgContent--content">
                Binamite makes it easier than ever to manage your digital asset income. Whether you want payment in fiat, stablecoins, cryptocurrency, or a combination of the three, we’ve got you covered.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="ImgContent justify-content-around">
          <Col lg="5" md="5" xs="9" className="ImgContent_section">
            <div>
              <h2 className="ImgContent--heading">Everything In One Place</h2>
              <p className="ImgContent--content">
                Whitelist addresses, save contacts, and send invoices in just a few clicks. 
              </p>
              <button className="ImgContent--button">Request a Demo</button>
            </div>
          </Col>
          <Col lg="4" md="4" xs="8">
            <img className="ImgContent--image" src={EverythingInOnePlace} />
          </Col>
        </Row>
        <Row className="ImgContent justify-content-around">
          <Col lg="4" md="4" xs="8">
            <img className="ImgContent--image" src={PaymentOnYourTerms} />
          </Col>
          <Col lg="5" md="5" xs="9" className="ImgContent_section">
            <div>
              <h2 className="ImgContent--heading">Payment On Your Terms</h2>
              <p className="ImgContent--content">
                Whether you’re an employer avoiding crypto exposure on the books, or an employee that wants a specific split, Binamite lets you pay – and get paid – on your terms. 
              </p>
            </div>
          </Col>
        </Row>
        <Row className="VideoSection justify-content-center">
          <Col lg="10">
            <img src={Image2} />
          </Col>
        </Row>
      </Container>
      <Container fluid className="WhiteBg">
        <Row className="justify-content-center">
          <Col lg="4" md="3" xs="10">
            <h2 className="WhiteBg--heading">15,000</h2>
            <p className="WhiteBg--title">Number of Contractors Paid Out.</p>
          </Col>
          <Col lg="4" md="3" xs="10">
            <h2 className="WhiteBg--heading">2 Million</h2>
            <p className="WhiteBg--title">Number of Client’s Onboarded.</p>
          </Col>
          <Col lg="4" md="3" xs="10">
            <h2 className="WhiteBg--heading">2 Million</h2>
            <p className="WhiteBg--title">Number of Client’s Onboarded.</p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="UserTypes">
        <Row>
          <Col className="UserTypes_head">
            <h2 className="UserTypes--heading">Add Title Here...</h2>
            <p className="UserTypes--sub-heading">
              Vestibulum aliquam orci eget neque laoreet, ut facilisis lectus consequat. Nunc in magna
              <br />
              consectetur, pretium eros sit amet, ultricies ligula.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="3" md="4" xs="10" className="UserTypes_box mx-3">
            <img className="UserTypes--image" src={Client} />
            <h4 className="UserTypes--for">For Clients</h4>
            <p className="UserTypes--point"><img src={CheckmarkCircle} />Sign Up for Binamite</p>
            <p className="UserTypes--point mb-4"><img src={CheckmarkCircle} />Add employees to your contacts</p>
            <Link className="UserTypes--button" to="/auth">Pay!</Link>
          </Col>
          <Col lg="3" md="4" xs="10" className="UserTypes_box box-2 mx-3">
            <img className="UserTypes--image" src={Contractor} />
            <h4 className="UserTypes--for">For Contractors</h4>
            <p className="UserTypes--point"><img src={CheckmarkCircle} />Add employees to your contacts</p>
            <p className="UserTypes--point"><img src={CheckmarkCircle} />Decide how you want your payment split up</p>
            <p className="UserTypes--point mb-4"><img src={CheckmarkCircle} />Whitelist your crypto addresses</p>
            <Link className="UserTypes--button" to="/auth">Get Paid!</Link>
          </Col>
        </Row>
      </Container>
      <Container fluid className="AboutUs">
        <Row className="justify-content-center">
          <Col lg="4" md="5" xs="10" className="mx-3">
            <p className="AboutUs--tagline">ABOUT US</p>
            <h2 className="AboutUs--heading">Built From<br />Necessity</h2>
            <p className="AboutUs--content">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              <br /><br />
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <button className="AboutUs--button">Meet the Team</button>
          </Col>
          <Col lg="4" md="5" xs="10" className="mx-3">
            <img className="AboutUs--image" src={AboutUs} />
          </Col>
        </Row>
      </Container>
      <footer className="p-5">
        <Container>
          <Row className="justify-content-between text-white">
            <Col lg="4" md="4" xs="12">
              <h2 className="footer--logo">Binamite</h2>
              <p className="footer--copyright">© Copyright 2022. All Rights Reserved.</p>
            </Col>
            <Col lg="2" md="2" xs="6" className="footer--links my-2">
              <h5>How it works</h5>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
            </Col>
            <Col lg="2" md="2" xs="6" className="footer--links my-2">
              <h5>Useful Links</h5>
              <Link to="/">Disclaimer</Link>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Services</Link>
              <Link to="/">Cookies Policy</Link>
              <Link to="/">Cookie Settings</Link>
            </Col>
            <Col lg="2" md="2" xs="6" className="footer--links my-2">
              <h5>Resources</h5>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
              <Link to="/">Link</Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
 
export default Home;