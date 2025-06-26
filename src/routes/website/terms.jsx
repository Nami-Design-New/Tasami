import React from "react";
import { motion } from "framer-motion";

export default function Terms() {
    return (
        <section className="terms page px-3">
            <div className="container">
            <motion.div
                className="section-head text-center mb-5"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="main-title mb-3">الشروط <span>والأحكام</span></h2>
                <p className="desc">
                    يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا.
                </p>
            </motion.div>

            <div className="terms-content">
                <h3>1. المقدمة</h3>
                <p>باستخدامك لموقعنا، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها...</p>

                <h3>2. حقوق النشر والملكية الفكرية</h3>
                <p>جميع المواد المنشورة على هذا الموقع...</p>

                <h3>3. الاستخدام المسموح</h3>
                <p>يُسمح لك باستخدام الموقع لأغراضك الشخصية فقط...</p>

                <h3>4. إخلاء المسؤولية</h3>
                <p>نحن نبذل قصارى جهدنا لتقديم محتوى دقيق ومحدث، ولكننا لا نضمن خلوه من الأخطاء أو انقطاعه.</p>

                <h3>5. روابط الأطراف الثالثة</h3>
                <p>قد يحتوي الموقع على روابط لمواقع خارجية. نحن لسنا مسؤولين عن محتوى أو سياسات خصوصية هذه المواقع.</p>

                <h3>6. التغييرات على الشروط</h3>
                <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. نوصي بزيارة الصفحة بشكل دوري.</p>

                <h3>7. التواصل</h3>
                <p>يمكنك التواصل معنا عبر البريد الإلكتروني: <a href="mailto:support@example.com">support@example.com</a></p>
            </div>
            </div>
        </section>
    );
}
