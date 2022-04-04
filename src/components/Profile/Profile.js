import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./Profile.css";
import { Helmet } from "react-helmet";
import $ from "jquery"
import "jquery-ui-dist/jquery-ui"

const Profile = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [taxPayerName, setTaxPayerName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const [isus, setIsus] = useState("");
  const [taxClassification, setTaxClassification] = useState("");
  const [ssn, setSsn] = useState("");
  const [ein, setEin] = useState("");

  var $overlay = $('<div class="overlay"></div>');

  useEffect(() => {
    const getProfile = () => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}/auth/getUserProfile`, {
          email: props.email
        })
        .then((res) => {
          setName(res.data.data.name)
          setEmail(res.data.data.email)
          setSkills(res.data.data.skills)
          setAddress(res.data.data.address)
          setCity(res.data.data.city)
          setState(res.data.data.state)
          setZipCode(res.data.data.zipCode)
          setCountry(res.data.data.country)
          setTaxPayerName(res.data.data.taxPayerName)
          setPanNumber(res.data.data.panNumber)
          setGstin(res.data.data.gstin)
          setIsus(res.data.data.isus)
          setTaxClassification(res.data.data.taxClassification)
          setSsn(res.data.data.ssn)
          setEin(res.data.data.ein)

          res.data.data.skills.forEach(skill => {
            $('#skills').append(`<span class="skill">${skill.name}</span>`)
          });

          if (res.data.data.isus) {
            $('#us').prop('checked', true)
            $('#notus').prop('checked', false)
            $('#w8-form').hide()
            $('#w9-form').show()
            $('#wtitle').html('W-9')
            $('#wtitle-2').html('W-9')
          } else {
            $('#us').prop('checked', false)
            $('#notus').prop('checked', true)
            $('#w9-form').hide()
            $('#w8-form').show()
            $('#wtitle').html('W8-BEN')
            $('#wtitle-2').html('W8-BEN')
          }

          if (res.data.data.ssn) {
            $('#ssn-check').prop('checked', true)
            $('#ein-check').prop('checked', false)
            $('#ssn-input').show()
            $('#ssn-input').hide()
          } else if (res.data.data.ein) {
            $('#ein-check').prop('checked', true)
            $('#ssn-check').prop('checked', false)
            $('#ein-input').show()
            $('#ssn-input').hide()
          } else {
            $('#ssn-check').prop('checked', true)
            $('#ein-check').prop('checked', false)
            $('#ssn-input').show()
            $('#ssn-input').hide()
          }

        })
        .catch((err) => {
          console.log(err)
        })
    }
    getProfile()

    $('body').append($overlay);

    $('#us').change(function () {
      if ($('#us').prop('checked')) {
        $('#notus').prop('checked', false)
        $('#w8-form').hide()
        $('#w9-form').show()
        $('#wtitle').html('W-9')
        $('#wtitle-2').html('W-9')
      } else {
        $('#notus').prop('checked', true)
        $('#w8-form').show()
        $('#w9-form').hide()
        $('#wtitle').html('W8-BEN')
        $('#wtitle-2').html('W8-BEN')
      }
    });

    $('#notus').change(function () {
      if ($('#notus').prop('checked')) {
        $('#us').prop('checked', false)
        $('#w8-form').show()
        $('#w9-form').hide()
        $('#wtitle').html('W8-BEN')
        $('#wtitle-2').html('W8-BEN')
      } else {
        $('#us').prop('checked', true)
        $('#w8-form').hide()
        $('#w9-form').show()
        $('#wtitle').html('W-9')
        $('#wtitle-2').html('W-9')
      }
    });

    $('#ssn-check').change(function () {
      if ($('#ssn-check').prop('checked')) {
        $('#ein-check').prop('checked', false)
        setEin('')
        $('#ein-input').hide()
        $('#ssn-input').show()
      } else {
        $('#ssn-check').prop('checked', false)
        setSsn('')
        $('#ssn-input').hide()
        $('#ein-input').show()
      }
    });

    $('#ein-check').change(function () {
      if ($('#ein-check').prop('checked')) {
        $('#ssn-check').prop('checked', false)
        setSsn('')
        $('#ssn-input').hide()
        $('#ein-input').show()
      } else {
        $('#ein-check').prop('checked', false)
        setEin('')
        $('#ein-input').hide()
        $('#ssn-input').show()
      }
    });


    $('#open-profile').click(function (event) {
      event.preventDefault();
      $overlay.fadeIn(300);
      window.scrollTo(0, 0);
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
      });
      $('.slidein-profile').toggle('slide', {
        direction: 'right'
      }, 200);
    });

    $('#open-address').click(function (event) {
      event.preventDefault();
      window.scrollTo(0, 0);
      $overlay.fadeIn(300);
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
      });
      $('.slidein-address').toggle('slide', {
        direction: 'right'
      }, 200);
    });

    $('#open-tax').click(function (event) {
      event.preventDefault();
      window.scrollTo(0, 0);
      $overlay.fadeIn(300);
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
      });
      $('.slidein-tax').toggle('slide', {
        direction: 'right'
      }, 200);
    });

    $('#open-gst').click(function (event) {
      event.preventDefault();
      window.scrollTo(0, 0);
      $overlay.fadeIn(300);
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
      });
      $('.slidein-gst').toggle('slide', {
        direction: 'right'
      }, 200);
    });

    $('#open-w9').click(function (event) {
      event.preventDefault();
      window.scrollTo(0, 0);
      $overlay.fadeIn(300);
      $('html, body').css({
        overflow: 'hidden',
        height: '100%'
      });
      $('.slidein-w9').toggle('slide', {
        direction: 'right'
      }, 200);
    });

    $('.close-profile').click(function () {
      $('.slidein-profile').toggle('slide', {
        direction: 'right'
      }, 200);
      $('html, body').css({
        overflow: 'auto',
        height: 'auto'
      })
      getProfile()
      $overlay.fadeOut(300);
    });

    $('.close-address').click(function () {
      $('.slidein-address').toggle('slide', {
        direction: 'right'
      }, 200);
      $('html, body').css({
        overflow: 'auto',
        height: 'auto'
      })
      getProfile()
      $overlay.fadeOut(300);
    });

    $('.close-tax').click(function () {
      $('.slidein-tax').toggle('slide', {
        direction: 'right'
      }, 200);
      $('html, body').css({
        overflow: 'auto',
        height: 'auto'
      })
      getProfile()
      $overlay.fadeOut(300);
    });

    $('.close-gst').click(function () {
      $('.slidein-gst').toggle('slide', {
        direction: 'right'
      }, 200);
      $('html, body').css({
        overflow: 'auto',
        height: 'auto'
      })
      getProfile()
      $overlay.fadeOut(300);
    });

    $('.close-w9').click(function () {
      $('.slidein-w9').toggle('slide', {
        direction: 'right'
      }, 200);
      $('html, body').css({
        overflow: 'auto',
        height: 'auto'
      })
      getProfile()
      $overlay.fadeOut(300);
    });

    $('.close-w9-1').click(function () {
      $('.slidein-w9').toggle('slide', {
        direction: 'right'
      }, 200);
      $('html, body').css({
        overflow: 'auto',
        height: 'auto'
      })
      getProfile()
      $overlay.fadeOut(300);
    });

  }, []);

  const handleSubmit = text => event => {
    event.preventDefault()

    console.log(text)

    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/auth/updateProfile`, {
        name,
        email: props.email,
        address,
        city,
        state,
        zipCode,
        country,
        taxPayerName,
        panNumber,
        gstin,
        isus,
        taxClassification,
        ssn,
        ein
      })
      .then((res) => {

        const classx = '.slidein-' + text
        console.log(classx)

        $(classx).toggle('slide', {
          direction: 'right'
        }, 200);
        $('html, body').css({
          overflow: 'auto',
          height: 'auto'
        })
        $('body').children('.overlay').css({
          display: 'none'
        })

      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="profile_class">

      {/* <div id="loader">
        <div className="spinner-border" role="status">
        </div>
      </div> */}

      <div className="container-fluid profile">

        <h1>{props.role} Profile</h1>
        <Row>
          <Col lg="6">
            <div className="box-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>Profile</h2>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-end align-items-center"><a id="open-profile"
                    href="#"><i class="fa-solid fa-pen-to-square"></i>Manage</a></div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <div className="circle"></div>
                  </div>
                  <div className="col-sm-9">
                    <h3>Name</h3>
                    <p>{name}</p>

                    <h3>email address</h3>
                    <p>{email}</p>

                    <h3>Phone</h3>
                    <p>+91 999*****71</p>

                    <h3>Expertise</h3>
                    <p id="skills"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>Address Location</h2>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-end align-items-center"><a id="open-address"
                    href="#"><i className="fa-solid fa-pen-to-square"></i>Manage</a></div>
                </div>

                <div className="row">

                  <div className="col-sm-8">
                    <h3>Time Zone</h3>
                    <p>UTC+05:30 Mumbai, Kolkata, Chennai, New Delhi</p>

                    <h3>Primary</h3>
                    <p>{address}, {city}, {zipCode}, {state}, {country}</p>



                  </div>

                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="box-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-9">
                    <h2>Tax Identification (ID)</h2>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-end align-items-center"><a id="open-tax"
                    href="#"><i className="fa-solid fa-pen-to-square"></i>Manage</a></div>
                </div>
                <small id="" className="form-text text-muted">Provide the same name as
                shown on your tax
                                return.</small>


                <div className="row">

                  <div className="col-sm-8">

                    <h3>Legal taxpayer name</h3>
                    <p>{taxPayerName}</p>

                    <h3>Pan Number</h3>
                    <p>{panNumber}</p>
                    <small id="" className="form-text red"> *PAN
                    Pending
                                        Verification</small>
                    <br />
                    <button className="btn btn-sm btn-info">Verify Now</button>



                  </div>

                </div>
              </div>
            </div>
            <div className="box-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-9">
                    <h2>GSTIN</h2>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-end align-items-center"><a id="open-gst"
                    href="#"><i className="fa-solid fa-pen-to-square"></i>Manage</a></div>
                </div>
                <small id="" className="form-text text-muted">A Good & Services Tax
                Identification Number is requested from all persons located in country where Binamite
                                Supports GSTIN.</small>
                <br />

                <div className="row">

                  <div className="col-sm-8">


                    <h3>GSTIN</h3>
                    <p>{gstin}</p>




                  </div>

                </div>
              </div>
            </div>


            <div className="box-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-9">
                    <h2 id='wtitle-2'>W8-BEN</h2>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-end align-items-center"><a id="open-w9"
                    href="#"><i className="fa-solid fa-pen-to-square"></i>Manage</a></div>
                </div>

                <div className="row">

                  <div className="col-sm-8">

                    <h3>LEGAL TAXPAYER NAME</h3>
                    <p>{taxPayerName}</p>

                  </div>

                </div>
              </div>
            </div>

          </Col>
        </Row>


      </div>

      <div className="slidein slidein-profile">
        <div className="container-fluid">

          {/* <span className="close-profile"><i class="fa fa-times"></i></span> */}
          <br /><br />
          <h2>Profile</h2>
          <br />

          <form onSubmit={handleSubmit('profile')}>
            <div className="form-group">
              <label for="">Full Name</label>
              <input type="text" name="name" className="slidein-input form-control" value={name} onChange={(e) => setName(e.target.value)} />

            </div>
            <div className="form-group">
              <label for="">Email address</label>
              <input type="text" name="email" className="slidein-input form-control" value={email} onChange={(e) => setName(e.target.value)} readOnly />

            </div>
            <div className="form-group">
              <label for="">Phone</label>
              <input type="text" name="phone" className="slidein-input form-control" value="+91 999*****71" id="" readOnly />

            </div>
            <div className="form-group">
              <label for="">Expertise</label>
              <input type="text" name="skills" className="slidein-input form-control" id="" readOnly />

            </div>
            <br />
            <button className="btn btn-md btn-primary" type="submit"><i
              className="fa-solid fa-arrow-left"></i>Save</button>
            <span className="btn btn-md btn-secondary close-profile" type="">Cancel</span>
          </form>

        </div>
      </div>

      <div class="slidein slidein-address">
        <div class="container-fluid">


          <br /><br />
          <h2>Address Location</h2>
          <br />

          <form onSubmit={handleSubmit('address')}>
            <div class="form-group">
              <label for="">Time Zone</label>
              <input type="text" name="time" value="UTC+05:30 Mumbai, Kolkata, Chennai, New Delhi" class="slidein-input form-control" id="" readOnly />

            </div>
            <div class="form-group">
              <label for="">Address</label>
              <input type="text" name="address" class="slidein-input form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div class="form-group">
              <label for="">City</label>
              <input type="text" name="address" class="slidein-input form-control" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div class="form-group">
              <label for="">Zip</label>
              <input type="text" name="address" class="slidein-input form-control" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </div>
            <div class="form-group">
              <label for="">State</label>
              <input type="text" name="address" class="slidein-input form-control" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div class="form-group">
              <label for="">Country</label>
              <input type="text" name="address" class="slidein-input form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>



            <br />
            <button class="btn btn-md btn-primary" type="submit"><i
              class="fa-solid fa-arrow-left"></i>Save</button>
            <span class="btn btn-md btn-secondary close-address" type="">Cancel</span>
          </form>


        </div>
      </div>

      <div className="slidein slidein-tax">
        <div className="container-fluid">
          <br /><br />
          <h2>Tax Identification (ID)</h2>
          <br />
          <p>Provide the same name as shown on your tax return.</p>
          <br />
          <form onSubmit={handleSubmit('tax')}>
            <div className="form-group">
              <label for="">Legal Name of Taxpayer</label>
              <input type="text" className="slidein-input form-control" id="" value={taxPayerName} onChange={(e) => setTaxPayerName(e.target.value)} />
              <small id="" className="form-text text-muted">Provide the same name as shown on your tax
                            return.</small>
            </div>
            <div className="form-group">
              <label for="">Pan Number</label>
              <input type="text" name="email" className="slidein-input form-control" id="" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
            </div>

            <br />
            <button className="btn btn-md btn-primary" type="submit"><i
              className="fa-solid fa-arrow-left"></i>Save</button>
            <span className="btn btn-md btn-secondary close-tax" type="">Cancel</span>
          </form>

          <form>

          </form>
        </div>
      </div>

      <div class="slidein slidein-gst">
        <div class="container-fluid">

          <br /><br />
          <h2>GSTIN</h2>
          <br />

          <form onSubmit={handleSubmit('gst')}>
            <div class="form-group">
              <label for="">GSTIN</label>
              <input type="text" name="name" class="slidein-input form-control" id="" value={gstin} onChange={(e) => setGstin(e.target.value)} />
            </div>


            <br />
            <button class="btn btn-md btn-primary" type="submit"><i
              class="fa-solid fa-arrow-left"></i>Save</button>
            <span class="btn btn-md btn-secondary close-gst" type="">Cancel</span>
          </form>

          <form>

          </form>
        </div>
      </div>

      <div class="slidein slidein-w9">
        <div class="container-fluid">

          <br /><br />
          <h2 id='wtitle'>W8-BEN</h2>
          <br />
          <p>To collect the right information, indicate if you are a<span style={{ color: "green" }}> U.S.
                        person.</span></p>
          <br />
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id='notus' />
            <p>I am not a U.S. person</p>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id='us' />
            <p>I am a U.S. person</p>
          </div>

          <hr />
          <p>Before withdrawing funds, all non-US, persons
                    must provide their W8-BEN tax information.</p>
          <hr />

          <form onSubmit={handleSubmit('w9')} id="w9-form">
            <div class="form-group">
              <label for="">Legal Name of Taxpayer</label>
              <input type="text" class="slidein-input form-control" value={taxPayerName} onChange={(e) => setTaxPayerName(e.target.value)} />
              <small id="" class="form-text text-muted">Provide the same name as shown on your tax
                            return.</small>
            </div>


            <br />
            <div class="form-group">
              <label for="">Federal Tax Classification</label>

              <select class="form-control slidein-input" value={taxClassification} onChange={(e) => setTaxClassification(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <br />
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id='ssn-check' />
              <p>Social Security Number(SSN)</p>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id='ein-check' />
              <p>Employer Identification Number</p>
            </div>

            <br />

            <div class="form-group" id='ssn-input'>
              <label for="">SSN/EIN</label>
              <input type="text" class="slidein-input form-control" value={ssn} onChange={(e) => setSsn(e.target.value)} />
            </div>

            <div class="form-group" id='ein-input'>
              <label for="">SSN/EIN</label>
              <input type="text" class="slidein-input form-control" value={ein} onChange={(e) => setEin(e.target.value)} />
            </div>


            <br />
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" checked />
              <label class="form-check-label" for="">I certify under penalities of perjury that the
                            representations in this <span style={{ color: "green" }}> Tax Certificate</span> are true and
                            correct.</label>
            </div>

            <br />
            <button class="btn btn-md btn-primary" type="submit"><i
              class="fa-solid fa-arrow-left"></i>Save</button>
            <span class="btn btn-md btn-secondary close-w9-1" type="">Cancel</span>
          </form>

          <form onSubmit={handleSubmit('w9')} id="w8-form">
            <div class="form-group">
              <label for="">Legal Name of Taxpayer</label>
              <input type="text" class="slidein-input form-control" value={taxPayerName} onChange={(e) => setTaxPayerName(e.target.value)} />
              <small id="" class="form-text text-muted">Provide the same name as shown on your tax
                            return.</small>
            </div>
            <br />
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" checked />
              <label class="form-check-label" for="">I certify under penalities of perjury that the
                            representations in this <span style={{ color: "green" }}> Tax Certificate</span> are true and
                            correct.</label>
            </div>
            <br />
            <button class="btn btn-md btn-primary" type="submit"><i
              class="fa-solid fa-arrow-left"></i>Save</button>
            <span class="btn btn-md btn-secondary close-w9" type="">Cancel</span>
          </form>

        </div>
      </div>

      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
          integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Helmet>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
          integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Helmet>
    </div >
  )
}

export default Profile;