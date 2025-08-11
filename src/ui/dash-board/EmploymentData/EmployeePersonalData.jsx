import { useState } from "react";
import CustomButton from "../../CustomButton";
import FormWrapper from "../../forms/FormWrapper";
import MapModal from "../../modals/MapModal";
import UpdateDataModal from "../../modals/UpdateDataModal";

const EmployeePersonalData = () => {
  const defaultBirthday = "2000-01-01";
  const [attachments] = useState([
    {
      id: 1,
      date: "2025-05-25",
      time: "14:45 PM",
      name: "سلطان م",
      account: "E-2202023-000125",
      title: "شهادة تدريب",
      filename: "FFNFCertificate.pdf",
    },
  ]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);

  return (
    <>
      <FormWrapper title=" البيانات الشخصية">
        <div className="employee__data">
          <div className="row">
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6>الاسم الاول :</h6>
                <p>محمد</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> اسم الاب :</h6>
                <p>رضوان</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> اسم العائله :</h6>
                <p>رضوان</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> تاريخ الميلاد :</h6>
                <p>{defaultBirthday}</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> الجنس :</h6>
                <p>ذكر</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> الجنسية :</h6>
                <p>السعوديه</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> بلد الاقامه :</h6>
                <p>السعوديه</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> المدينه:</h6>
                <p>الرياض</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> رقم الهويه او الجواز :</h6>
                <p>12345678</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> البريد الالكتروني الشخصي :</h6>
                <p>mohamed.radwan@tasami.com</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2 ">
              <div className="employee__data--item">
                <h6> العنوان :</h6>
                <p>السعودية-الرياض</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2">
              <div className="employee__data--item">
                <h6> العنوان الوطني:</h6>
                <p>السعوديه </p>
              </div>
            </div>
            <div className="col-12   p-2">
              <div className="employee__data--item w-full">
                <div className="w-full  ">
                  <h4 className="attachments-title fs-6 mb-1"> المرفقات : </h4>
                  <div className="table-container table-responsive border">
                    <table className="custom-table table table-bordered text-center align-middle mb-0 attachments-table">
                      <thead className="table-light">
                        <tr>
                          <th>التاريخ</th>
                          <th>الوقت</th>

                          <th>الملف المرفق</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attachments.map((item) => (
                          <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.filename}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-">
              <div className="personal-data__button ">
                <CustomButton
                  type="button"
                  size="large"
                  onClick={() => setShowUpdateDataModal(true)}
                >
                  طلب تحديث بيانات
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
        {/* <form className="form_ui personal-data__form">
          <div className="row g-2">
            <div className="col-12">
              <ProfileImageUploader imageUrl={image} onChange={handleUpload} />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField label="الاسم الاول" value="محمود" readonly disabled />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField label="اسم الاب" value="عباس" readonly disabled />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField label="اسم العائله" value="عباس" readonly disabled />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField
                type="date"
                label="تاريخ الميلاد"
                value={defaultBirthday}
                max={today}
                readonly
                disabled
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField
                type="text"
                label="الجنس"
                value={"ذكر"}
                readonly
                disabled
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField
                value={"السعوديه"}
                type="text"
                label="الجنسيه"
                readonly
                disabled
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField type="text" label="بلد الاقامه " value="السعوديه" />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField type="text" label=" المدينه  " value="الرياض" />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField
                type="text"
                label=" رقم الهويه او الجواز "
                value="12345678"
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField
                type="text"
                label=" البريد الالكتروني الشخصي"
                value="mohamed.radwan@tasami.com"
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <MapLocationField
                htmlFor="companyLocationOnMap"
                label="العنوان "
                hint="(علي الخريطه)"
                name={"السعودية"}
                setShowModal={setShowMapModal}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4">
              <InputField
                type="text"
                label=" العنوان الوطني "
                value="السعوديه "
              />
            </div>
            <FileUploader
              files={files}
              onFilesChange={handleFilesChange}
              label=" اضف المرفقات "
            />
          </div>
        </form>
         */}

        <MapModal
          title="العنوان علي الخريطة"
          showModal={showMapModal}
          setShowModal={setShowMapModal}
          // setSearchedPlace={setSearchedPlace}
          target="companyLocation"
          showLocationFirst={true}
          // formData={watch()}
          // setFormData={(data) => {
          //   if (data.lat)
          //     register("lat").onChange({ target: { value: data.lat } });
          //   if (data.lng)
          //     register("lng").onChange({ target: { value: data.lng } });
          // }}
        />
        <UpdateDataModal
          title="طلب تحديث البيانات"
          setShowModal={setShowUpdateDataModal}
          showModal={showUpdateDataModal}
        />
      </FormWrapper>
    </>
  );
};

export default EmployeePersonalData;
