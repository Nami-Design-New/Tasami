export default function HeroSection() {
  return (
    <section className="hero_section">
      <img
        src="/images/brainstorming-with-coworkers-office.webp"
        alt="hero section image"
      />{" "}
      <div className="hero_content">
        <h1>مرحبا بك في تسامي </h1>
        <h3>حقق أهدافك... ولا تنجز مهامك وحدك!</h3>
        <p>
          منصة تسامي تساعدك في الوصول لمساعدين شخصيين متخصصين لتحقيق أهدافك أو
          إنجاز مهامك بأسلوب آمن واحترافي.
        </p>
        <div className="hero_buttons">
          <button className="btn primary">ابدا الان</button>
          <button className="btn secondary">المزيد</button>
        </div>
      </div>
    </section>
  );
}
