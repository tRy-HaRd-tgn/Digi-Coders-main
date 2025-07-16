import React from "react";

const About = () => {
  return (
    <div>
      <div
        className="about-section"
        style={{
          backgroundImage: "url(/images/background-img3.webp)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            filter: "blur(4px)",
            backgroundImage: "inherit",
            backgroundSize: "cover",
            backgroundPosition: "50% 65%",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(30, 40, 60, 0.7)",
            zIndex: 2,
          }}
        />
        <div
          className="about-content"
          style={{ position: "relative", zIndex: 3 }}
        >
          <h1 className="about-title">О НАС</h1>
          <p className="about-description">
            Добро пожаловать в Digi Coders! Мы верим, что обучение
            программированию должно быть увлекательным и интересным. Наша
            команда опытных педагогов и инновационные методики обучения помогают
            детям не только освоить важные навыки программирования, но и
            получать удовольствие от процесса.
          </p>
        </div>
      </div>

      <>
        <div className="mb-7">
          <div style={{ display: "none" }} />
          <div>
            <div data-draggable="true" style={{ position: "relative" }}>
              <section
                draggable="false"
                className="overflow-hidden pt-0"
                data-v-271253ee=""
              >
                <section>
                  {" "}
                  <div
                    className="py-2 text-center"
                    style={{ backgroundColor: "#f6feff" }}
                  >
                    <div className="container pb-md-5">
                      <div className="row d-flex justify-content-center">
                        <div className="header-text col-lg-10">
                          <div className="heading">
                            <h2 className="mt-5 mb-3 display-3">
                              <span>Почему выбирают нас?</span>
                            </h2>
                          </div>
                          <div className="sub-heading">
                            <h4 className="mb-6">
                              <span>Инновационный подход к обучению</span>
                            </h4>
                          </div>
                          <div className="content">
                            <p className="mb-3">
                              <span>
                                Digi Coders — это программа блочного
                                программирования для детей, где они могут
                                изучать основы кода в игровой форме. Через
                                интерактивные и увлекательные задания дети
                                развивают логическое мышление, навыки решения
                                проблем и другие важные умения, которые
                                пригодятся им в будущем.
                              </span>
                            </p>
                            <p className="mb-3">
                              <span>
                                В Digi Coders мы уверены, что каждый ребенок
                                может стать создателем, новатором и решателем
                                проблем. Именно поэтому мы создали интересную
                                платформу для юных программистов, чтобы они
                                могли учиться, создавать и исследовать мир
                                программирования. Наша программа помогает детям
                                раскрыть творческий потенциал, создавать
                                собственные проекты и развивать важные навыки
                                программирования для успешного будущего. С
                                нашими опытными преподавателями, инновационной
                                программой и поддерживающим сообществом мы
                                помогаем детям открыть для себя увлекательный
                                мир программирования и воплотить свои идеи в
                                жизнь.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </section>
              </section>
            </div>
          </div>
        </div>
      </>

      <div className="container mb-5">
        <div className="mission-vision-section" style={{ background: "#fff" }}>
          <div className="mission-vision-image">
            <img src="/images/background-img4.jpg" alt="Миссия" />
          </div>
          <div className="mission-vision-content">
            <h2>
              <strong>НАША МИССИЯ</strong>
            </h2>
            <p>
              Наша миссия — предоставить качественное образование в области
              цифровых технологий. Мы стремимся дать нашим ученикам необходимые
              знания и навыки для успешной реализации в цифровом мире. Мы
              создаём образовательную среду, способствующую развитию
              креативности, инноваций и сотрудничества.
            </p>
          </div>
        </div>
      </div>

      <div className="container mb-10">
        <div
          className="mission-vision-section reverse"
          style={{ background: "#f6feff" }}
        >
          <div className="mission-vision-image">
            <img src="/images/background-img5.jpg" alt="Видение" />
          </div>
          <div className="mission-vision-content">
            <h2>
              <strong>НАШЕ ВИДЕНИЕ</strong>
            </h2>
            <p>
              Наше видение — создать мир, где каждый имеет равный доступ к
              качественному образованию и технологиям. Мы стремимся дать людям
              цифровые навыки и знания, чтобы они могли раскрыть свой потенциал
              и реализовать мечты. Наша цель — преодолеть цифровое неравенство и
              способствовать формированию более инклюзивного и связанного
              общества.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
