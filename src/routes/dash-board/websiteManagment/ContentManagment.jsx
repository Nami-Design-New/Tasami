import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import "ckeditor5/ckeditor5.css";

export default function ContentManagment() {
  const [terms, setTerms] = useState();
  const [privacy, setPrivacy] = useState("");
  const [about, setAbout] = useState("");

  const [termsDraft, setTermsDraft] = useState(terms);
  const [privacyDraft, setPrivacyDraft] = useState(privacy);
  const [aboutDraft, setAboutDraft] = useState(about);

  const handleTermsSave = () => {
    setTerms(termsDraft);
  };

  const handlePrivacySave = () => {
    setPrivacy(privacyDraft);
  };

  const handleAboutSave = () => {
    setAbout(aboutDraft);
  };

  return (
    <section>
      <PageHeader />

      <div className="row p-0 m-0">
        {/* Terms Section */}
        <div className="col-12 p-0 py-2">
          <p className="mb-3 editor-label">الشروط و الاحكام</p>
          <CKEditor
            editor={ClassicEditor}
            data={termsDraft}
            onChange={(event, editor) => {
              setTermsDraft(editor.getData());
            }}
          />
          <div className="d-flex align-items-center mt-3 justify-content-end gap-2">
            <CustomButton onClick={handleTermsSave}>حفظ</CustomButton>
            <CustomButton color="secondary">إلغاء</CustomButton>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <div className="col-12 p-0 py-2">
          <p className="mb-3 editor-label">سياسات الخصوصية</p>
          <CKEditor
            editor={ClassicEditor}
            data={privacyDraft}
            onChange={(event, editor) => {
              setPrivacyDraft(editor.getData());
            }}
          />
          <div className="d-flex align-items-center mt-3 justify-content-end gap-2">
            <CustomButton onClick={handlePrivacySave}>حفظ</CustomButton>
            <CustomButton color="secondary">إلغاء</CustomButton>
          </div>
        </div>

        {/* About Section */}
        <div className="col-12 p-0 py-2">
          <p className=" mb-3 editor-label">عن تسامي</p>
          <CKEditor
            editor={ClassicEditor}
            data={aboutDraft}
            onChange={(event, editor) => {
              setAboutDraft(editor.getData());
            }}
          />
          <div className="d-flex align-items-center mt-3 justify-content-end gap-2">
            <CustomButton onClick={handleAboutSave}>حفظ</CustomButton>
            <CustomButton color="secondary">إلغاء</CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
}
