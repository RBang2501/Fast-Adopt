import { React, useState, useEffect } from "react";
import { Accordion, AccordionBody, AccordionItem, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { useNavigate,Link } from "react-router-dom";
import { database, db, storage } from "../../firebase";
import * as XLSX from "xlsx";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import {IoIosArrowDropdown} from 'react-icons/io'
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import exportToExcel from "../../excel";

const AddChild = ({ user, id }) => {

  const { t } = useTranslation();

  const [open, setOpen] = useState("1");
  const [imageUpload, setImageUpload] = useState(null);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        data.forEach((element) => {
          // Write the child profile document to Firestore
          const id = element["Case Number"].split("/").join("");
          db.collection("children")
            .doc(id)
            .set(element)
            .then(() => {
              console.log("Document successfully written with ID: ", id);
              // Create an entry in the Realtime Database for the child profile
              database
                .ref("childProfile/" + id)
                .set(db.collection("children").doc(id).id);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      };
    }
  };

  const handleSubmitInformation = async (element) => {
    element.preventDefault();
    console.log(element);

    const id = element.target[9].value.split("/").join("");
    let url;
    // const storage = getStorage()
    const imageRef = storageRef(storage, `children/${id}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDoc(doc(db, "children", id), {
          Name: element.target[0].value,
          Gender: element.target[1].value,
          "Date of Birth": element.target[2].value,
          Age: element.target[3].value,
          "Child Category": element.target[4].value,
          Image: url,
          State: element.target[6].value,
          District: element.target[7].value,
          Home: element.target[8].value,
          "Case Number": element.target[9].value,
          "Reason For Admission": element.target[10].value,
          "Reason For Flagging": element.target[11].value,
          "Last Visit Since": element.target[12].value,
          "Last Call Since": element.target[13].value,
          Guardian: element.target[14].value,
          Sibling: element.target[15].value,
          "Total Shelter Home Stay": element.target[16].value,
          "Case History": element.target[17].value,
        });
        alert("Child Added!");
      });
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== "CaseManager") navigate("/");
  }, [user]);
  return (
    <div className="container mt-4 bg-color2">
      <Accordion
        className="row overflow-y-scroll overflow-x-hidden"
        open={open}
        toggle={toggle}
      >
        <Form
          className="!bg-color5/[0.6] !border-none rounded-2"
          onSubmit={(event) => handleSubmitInformation(event)}
        >
          <AccordionItem className="!bg-transparent !border-none">
            <h4 className="m-2 ms-4 cursor-pointer" onClick={() => toggle("1")}>
              {t('Section-1')}
              <span>
                <IoIosArrowDropdown className="text-4xl block float-right"></IoIosArrowDropdown>
              </span>
            </h4>
            <AccordionBody className="!bg-transparent" accordionId="1">
              <FormGroup row>
                <Label for="fullname" sm={2}>
                  {" "}
                  {t('Full Name')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="gender" sm={2}>
                  {" "}
                  {t('Gender')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dob" sm={2}>
                  {" "}
                  {t('Date of Birth')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    type="date"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="age" sm={2}>
                  {" "}
                  {t('Estimated Age')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="age"
                    name="age"
                    placeholder="Estimated Age"
                    type="text"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="childCategory" sm={2}>
                  {" "}
                  {t('Category')}{" "}
                </Label>
                <Col sm={10}>
                  <Input id="childCategory" name="category" type="select">
                    <option> {t('Abandoned / Family not traceable')}</option>
                    <option> {t('Surrendered')}</option>
                    <option> {t('Orphaned - No Guardians')} </option>
                    {/* <option> Child Admitted in CCI by Family </option> */}
                    <option> {t('Admitted by Guardians')} </option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="image" sm={2}>
                  {" "}
                  {t('Photo')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="image"
                    name="image"
                    placeholder="Image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="state" sm={2}>
                  {" "}
                  {t('State')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="disctrict" sm={2}>
                  {" "}
                  {t('District')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="disctrict"
                    name="disctrict"
                    placeholder="Disctrict"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="home" sm={2}>
                  {" "}
                  {t('Home')}{" "}
                </Label>
                <Col sm={10}>
                  <Input id="home" name="home" placeholder="Home" type="text" />
                </Col>
              </FormGroup>
            </AccordionBody>
            <hr className="solid" />
            <h4
              className="me-2 ms-4 mt-3 mb-3 cursor-pointer"
              onClick={() => toggle("2")}
            >
              {t('Section-2')}
              <span>
                <IoIosArrowDropdown className="text-4xl block float-right"></IoIosArrowDropdown>
              </span>
            </h4>
            <AccordionBody accordionId="2">
              <FormGroup row>
                <Label for="caseno" sm={2}>
                  {" "}
                  {t('Case Number')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="caseno"
                    name="caseno"
                    placeholder={t('Case Number')}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="rfa" sm={2}>
                  {" "}
                  {t('Reason For Admission')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="rfa"
                    name="rfa"
                    placeholder={t('Reason For Admission')}
                    type="textarea"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="rff" sm={2}>
                  {" "}
                  {t('Reason For Flagging')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="rff"
                    name="rff"
                    placeholder={t('Reason For Flagging')}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lvs" sm={2}>
                  {" "}
                  {t('Last Visit Since')}<span className="text-red-500">*</span>{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="lvs"
                    name="lvs"
                    placeholder={t('Last Visit Since')}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lcs" sm={2}>
                  {" "}
                  {t('Last Call Since')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="lcs"
                    name="lcs"
                    placeholder={t('Last Call Since')}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="guardian" sm={2}>
                  {" "}
                  {t('Guardian')}{" "}
                </Label>
                <Col sm={10}>
                  <Input
                    id="guardian"
                    name="guardian"
                    placeholder={t('Guardian')}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="sibling" sm={2}>
                  {t('Sibling Details')}
                </Label>
                <Col sm={10}>
                  <Input
                    id="sibling"
                    name="sibling"
                    placeholder={t('Sibling Details')}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row></FormGroup>

              <FormGroup row>
                <Label for="casehistory" sm={2}>
                  {t('Case History')}
                </Label>
                <Col sm={10}>
                  <Input
                    id="casehistory"
                    name="casehistory"
                    placeholder={t('Case History')}
                    type="textarea"
                  />
                </Col>
              </FormGroup>
            </AccordionBody>
          </AccordionItem>
          <FormGroup row>
            <div className="m-2 justify-items-center">
              <Button
                type="submit"
                className="!bg-color3 !border-none !text-textcolor"
              >
                {t('Submit')}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Accordion>
      <div className="row">
        <Form onSubmit={(event) => handleUpload(event)}>
          <div className="row m-2 text-3xl font-bold">{t('Insert Excel Sheet')}</div>
          <div className="row m-1">
            <div className="col-12 col-sm-8 col-lg-6">
              <Input
                id="excelsheet"
                name="excelsheet"
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <FormGroup row>
            <div className="col-2 m-2">
              <Button
                type="submit"
                className="!bg-color3 !border-none !text-textcolor"
                onClick={handleUpload}
              >
                {t('Submit')}
              </Button>
              </div>
              <div className="col-auto offset-1 m-2">

              <Button
                type="submit"
                className="!bg-color3 !border-none !text-textcolor"
                onClick={()=>exportToExcel()}
                >
                {t('Download Excel Template')}
              </Button>
                </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};
export default AddChild