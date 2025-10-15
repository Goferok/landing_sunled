import { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SunMedium, Cpu, Smartphone, Menu, X } from "lucide-react";

// === Изображения ===
import windowinterior from "./assets/window-interior1.png";
import windowinterior2 from "./assets/window-interior2.png";
import windowinterior3 from "./assets/window-interior3.png";
import room2 from "./assets/room2.png";
import office4 from "./assets/office4.png";
import office2 from "./assets/office.png";
import kids2 from "./assets/kids2.png";
import spectrumHarmful from "./assets/spectrum_harmful.png";
import spectrumSafe from "./assets/spectrum_safe.png";
import window3000 from "./assets/window-3000.png";
import window4000 from "./assets/window-4000.png";
import window5700 from "./assets/window-5700.png";
import sky from "./assets/sky.png";
import led from "./assets/led.png";


/* ---------- Анимации ---------- */
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: easing },
  },
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2.2, ease: easing },
  },
};
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.55, delayChildren: 0.4 },
  },
};

function MonoIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-amber-600 w-16 h-16 flex items-center justify-center">
      {children}
    </div>
  );
}

export default function Landing() {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
// === Активная секция (для точек справа) ===
const [activeSection, setActiveSection] = useState("home");
// === Определение мобильного экрана ===
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // mobile <768px
    checkScreen(); // сразу проверяем при загрузке
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);

  // === Автоматическое форматирование телефона ===
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("8")) value = "7" + value.slice(1);
    if (!value.startsWith("7")) value = "7" + value;
    if (value.length > 1)
      value =
        "+" +
        value[0] +
        " (" +
        (value.slice(1, 4) || "") +
        (value.length > 4 ? ") " : "") +
        (value.slice(4, 7) || "") +
        (value.length > 7 ? "-" : "") +
        (value.slice(7, 9) || "") +
        (value.length > 9 ? "-" : "") +
        (value.slice(9, 11) || "");
    setPhone(value.slice(0, 18));
  };

  const modes = [
    { name: "3000K", color: "#F5E6C8", image: window3000 },
    { name: "4000K", color: "#F3EEDC", image: window4000 },
    { name: "5700K", color: "#E7EEF5", image: window5700 },
  ];
  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* === ШАПКА === */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <img src="/logo4.png" alt="Логотип" className="h-14 w-auto" />
            <span className="text-sm sm:text-base font-semibold text-neutral-900">
              Искусственное окно
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
            <a href="#home" className="hover:text-amber-600 transition">
              Главная
            </a>
            <a href="#benefits" className="hover:text-amber-600 transition">
              Технология
            </a>
            <a href="#why" className="hover:text-amber-600 transition">
              Безопасность
            </a>
            <a href="#places" className="hover:text-amber-600 transition">
              Применение
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="ml-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
            >
              Заказать демо
            </button>
          </nav>
          <button
            className="md:hidden text-neutral-800 hover:text-amber-600 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>
        {/* === Мобильное меню (выпадает под шапкой) === */}
{isMenuOpen && (
  <div className="fixed top-14 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200 z-30 md:hidden animate-fadeIn">
    <nav className="flex flex-col items-center text-neutral-800 py-6 space-y-4 text-base">
      <a
        href="#home"
        className="hover:text-amber-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Главная
      </a>
      <a
        href="#benefits"
        className="hover:text-amber-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Технология
      </a>
      <a
        href="#why"
        className="hover:text-amber-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Безопасность
      </a>
      <a
        href="#places"
        className="hover:text-amber-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        
        Где полезно
      </a>
      <a
        href="#contacts"
        className="hover:text-amber-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Контакты
      </a>
      <button
        onClick={() => {
          setShowModal(true);
          setIsMenuOpen(false);
        }}
        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg transition"
      >
        Заказать демо
      </button>
    </nav>
  </div>
)}
{/* === Боковая навигация (точки справа) === */}
<div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-10 z-40 hidden md:flex">
  {["home", "modes", "benefits", "why", "places", "order"].map((id) => (
    <button
      key={id}
      onClick={() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
      className={`w-5 h-5 rounded-full transition-all duration-300 ${
        activeSection === id
          ? "bg-amber-500 scale-150 shadow-md"
          : "bg-neutral-400/40 hover:bg-amber-400/70"
      }`}
    />
  ))}
</div>
      {/* === Контейнер постраничной прокрутки === */}
      <motion.div
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >

{/* === 1️⃣ HERO-СЛАЙДЕР (адаптивные изображения) === */}

<motion.section
  id="home"
  className="relative h-screen w-full flex flex-col items-center justify-end text-center snap-start overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2 }}
>
  {(() => {
    const desktopSlides = [
      {
        image: windowinterior, // офис
        title: "Естественный ритм в вашем офисе",
        subtitle:
          "Поддерживайте концентрацию и энергию на протяжении всего дня.",
      },
      {
        image: windowinterior3, // квартира
        title: "Свет, который оживляет пространство",
        subtitle:
          "Искусственное окно — естественное солнце там, где его не хватает.",
      },
      {
        image: windowinterior2, // школа
        title: "Комфортный свет для школ и детских садов",
        subtitle:
          "Безопасный спектр и дневная динамика для здоровья и внимания детей.",
      },
    ];

    const mobileSlides = [
      {
        image: office2, // мобильная версия офиса
        title: "Естественный ритм в вашем офисе",
        subtitle:
          "Поддерживайте концентрацию и энергию на протяжении всего дня.",
      },
      {
        image: room2, // мобильная версия комнаты
        title: "Свет, который оживляет пространство",
        subtitle:
          "Искусственное окно — естественное солнце там, где его не хватает.",
      },
      {
        image: kids2, // мобильная версия школы
        title: "Комфортный свет для школ и детских садов",
        subtitle:
          "Безопасный спектр и дневная динамика для здоровья и внимания детей.",
      },
    ];

    const slides = isMobile ? mobileSlides : desktopSlides;

    const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
    const currentSlide = ((page % slides.length) + slides.length) % slides.length;

    const paginate = (newDirection: number) =>
      setPage(([p]) => [p + newDirection, newDirection]);

    const swipePower = (offset: number, velocity: number) =>
      Math.abs(offset) * velocity;

    const swipeConfidenceThreshold = 10000;

    return (
      <>
        {/* === СЛАЙД со свайпом === */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={slides[currentSlide].image}
            src={slides[currentSlide].image}
            alt="Искусственное окно"
            custom={direction}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.9] select-none touch-pan-y"
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 1.05,
              }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (dir: number) => ({
                x: dir > 0 ? -1000 : 1000,
                opacity: 0,
                scale: 1.05,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 260, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
          />
        </AnimatePresence>

        {/* === ГРАДИЕНТ === */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* === ТЕКСТ === */}
        <motion.div
          key={slides[currentSlide].title}
          className="relative z-10 w-full px-4 pb-[12vh]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white/80 text-base md:text-lg">
            {slides[currentSlide].subtitle}
          </p>
        </motion.div>

        {/* === ТОЧКИ === */}
        <div
          className="
            absolute 
            bottom-[max(3.5rem,env(safe-area-inset-bottom,1rem))]
            sm:bottom-[max(2.5rem,env(safe-area-inset-bottom,1rem))]
            md:bottom-[max(1.5rem,env(safe-area-inset-bottom,0.5rem))]
            left-1/2 -translate-x-1/2 
            flex gap-3 z-20
            bg-black/30 backdrop-blur-md rounded-full px-4 py-2
            shadow-lg border border-white/10
          "
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, 0])}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-amber-400 scale-125 shadow-md"
                  : "bg-white/70 hover:bg-amber-300"
              }`}
            />
          ))}
        </div>
      </>
    );
  })()}
</motion.section>






{/* === 2️⃣ ДИНАМИЧЕСКИЙ БЛОК (адаптивный и сбалансированный) === */}
<motion.section
  id="modes"
  className="
    relative w-full flex flex-col lg:flex-row 
    items-center justify-center 
    snap-start overflow-hidden 
    px-4 sm:px-8 md:px-16 lg:px-[8vw] xl:px-[10vw]
    transition-all duration-700
    gap-6 sm:gap-10 md:gap-16
    max-[380px]:gap-4
    max-[380px]:px-3
  "
  style={{
    minHeight: "100dvh",
    paddingTop: "calc(env(safe-area-inset-top, 8px) + 3rem)",
    paddingBottom: "calc(env(safe-area-inset-bottom, 8px) + 1rem)",
    background: `
      radial-gradient(
        circle at 70% 50%, 
        rgba(255, 245, 215, 0.9) 0%, 
        ${activeMode.color} 40%, 
        #f7efdc 70%, 
        #ede2cf 100%
      ),
      linear-gradient(to bottom, #fff8e6 0%, #f8f3e3 60%, #f3ecda 100%)
    `,
  }}
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {/* === "Дыхание света" (мягкая анимация) === */}
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at 75% 40%, rgba(255,230,150,0.25) 0%, transparent 70%)",
    }}
    animate={{
      opacity: [0.25, 0.45, 0.25],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* === Контентная область === */}
  <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center relative z-10">
    {/* === Левая часть (текст + кнопки) === */}
    <div className="
      flex-1 flex flex-col items-center lg:items-start 
      text-center lg:text-left justify-center
      max-w-[480px] lg:max-w-[520px]
      order-1 lg:order-none
    ">
      <motion.h1
        initial="visible"
        variants={fadeInUp}
        className="
          text-3xl sm:text-4xl lg:text-5xl 
          max-[380px]:text-2xl 
          font-bold text-neutral-900 leading-snug 
          mb-3 sm:mb-5
        "
      >
        Искусственное окно —{" "}
        <span className="text-amber-500">
          свет, который живёт по вашим ритмам
        </span>
        .
      </motion.h1>

      <motion.p
        initial="visible"
        variants={fadeInUp}
        className="
          text-neutral-700 text-base sm:text-lg 
          max-[380px]:text-sm 
          mb-3 sm:mb-5 max-w-md
        "
      >
        Естественный свет и комфорт даже там, где нет окон. 
        Управляйте светом, который подстраивается под вас.
      </motion.p>

      {/* === Окно для мобильных === */}
      <motion.div
        variants={fadeInUp}
        initial="visible"
        className="
          relative flex items-center justify-center my-5 lg:hidden 
          w-[220px] h-[300px]
          sm:w-[260px] sm:h-[360px]
          max-h-[55vh] sm:max-h-[60vh]
          max-[380px]:w-[180px] max-[380px]:h-[250px]
          transition-all duration-300
        "
      >
        <motion.div
          className="absolute inset-0 rounded-3xl blur-[80px] opacity-50 animate-pulse-slow"
          style={{ backgroundColor: activeMode.color }}
          aria-hidden
        />
        <img
          src={activeMode.image}
          alt="Искусственное окно"
          className="relative z-10 w-full h-auto object-contain drop-shadow-[10px_10px_40px_rgba(0,0,0,0.15)]"
        />
      </motion.div>

      {/* === Переключатели === */}
      <motion.div
        initial="visible"
        variants={fadeInUp}
        className="
          flex gap-2 sm:gap-3 mb-5 md:mb-6 
          flex-wrap justify-center lg:justify-start
        "
      >
        {modes.map((mode) => (
          <button
            key={mode.name}
            onClick={() => setActiveMode(mode)}
            className={`px-4 py-1 sm:px-5 sm:py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeMode.name === mode.name
                ? "bg-black text-white border-black shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {mode.name}
          </button>
        ))}
      </motion.div>

      {/* === Кнопки действий === */}
      <motion.div
        initial="visible"
        variants={fadeInUp}
        className="
          flex flex-col md:flex-row gap-3 
          w-full max-w-xs md:max-w-none md:w-auto 
          justify-center lg:justify-start 
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <button
          onClick={() => setShowModal(true)}
          className="
            bg-amber-400 hover:bg-amber-500 text-black font-medium 
            py-3 px-8 rounded-xl shadow-md transition 
            w-full md:w-auto 
            max-[380px]:py-2 max-[380px]:text-sm
          "
        >
          Почувствуй свет солнца
        </button>
        <button
          onClick={() =>
            document
              .getElementById("benefits")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="
            border border-gray-400 text-gray-700 font-medium 
            py-3 px-8 rounded-xl hover:bg-gray-50 transition 
            w-full md:w-auto 
            max-[380px]:py-2 max-[380px]:text-sm
          "
        >
          Подробнее
        </button>
      </motion.div>
    </div>

    {/* === Правая часть (окно для десктопа) === */}
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="hidden lg:flex flex-1 items-center justify-center relative"
    >
      <div className="relative w-[360px] sm:w-[420px] lg:w-[450px] h-auto max-h-[70vh] flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-3xl blur-[120px] opacity-40"
          style={{ backgroundColor: activeMode.color }}
          animate={{
            opacity: [0.3, 0.55, 0.3],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <img
          src={activeMode.image}
          alt="Искусственное окно"
          className="relative z-10 w-full h-auto object-contain drop-shadow-[20px_20px_50px_rgba(0,0,0,0.2)]"
        />
      </div>
    </motion.div>
  </div>
</motion.section>












        {/* === 3️⃣ УНИКАЛЬНОСТЬ === */}
        <SectionBenefits />

        {/* === 4️⃣ СПЕКТР === */}
        <SectionSpectrum />

        {/* === 5️⃣ ПРИМЕНЕНИЕ === */}
        <SectionPlaces />

        {/* === 6️⃣ CTA === */}
        <SectionCTA
  onClick={() => setShowModal(true)}
  phone={phone}
  handlePhoneChange={handlePhoneChange}
/>

{/* === Глобальное модальное окно === */}
<ModalOrder
  show={showModal}
  onClose={() => setShowModal(false)}
  phone={phone}
  handlePhoneChange={handlePhoneChange}
/>

      </motion.div>
    </div>
  );
}

/* ==== Подсекции (вынесены для чистоты) ==== */

function SectionBenefits() {
  return (
    <section
      id="benefits"
      className="
        relative 
        w-full 
        flex flex-col items-center justify-center
        text-center 
        px-3 sm:px-5 md:px-6 
        pt-[calc(env(safe-area-inset-top)+4rem)]   /* отступ от шапки */
        pb-[calc(env(safe-area-inset-bottom)+3rem)]
        md:py-20
        snap-start
        overflow-y-auto
        bg-white/10
        min-h-screen
        md:min-h-[100vh]
      "
      style={{
        backgroundImage: `url(${sky})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="
          relative z-10 
          w-full max-w-6xl 
          flex flex-col items-center 
          justify-start
          md:justify-center
          gap-1 sm:gap-10
        "
      >
        {/* === Заголовок === */}
        <h2
    className="
      text-2xl sm:text-4xl 
      max-[480px]:text-xl
      font-semibold mb-6 text-neutral-900 leading-snug text-center
    "
  >
          Что делает Искусственное окно уникальным
        </h2>

        {/* === Верхний блок текста === */}
        <div className="text-center mb-2 sm:mb-6 max-w-3xl mx-auto px-2">
          <h3 className="text-lg sm:text-2xl font-bold text-amber-600 mb-3 leading-snug">
            Свет, приближённый к настоящему солнцу
          </h3>

          <p className="text-sm sm:text-lg text-neutral-800 leading-snug max-w-2xl mx-auto">
            Благодаря многоканальной LED-матрице искусственное окно формирует{" "}
            <strong className="text-amber-600">сбалансированный спектр</strong>{" "}
            без синего пика и с высоким индексом цветопередачи (CRI 90+),
            обеспечивая естественное восприятие и комфорт для глаз.
          </p>
        </div>

        {/* === Контейнер карточек === */}
        <div
  className="
    flex flex-col md:grid md:grid-cols-3 
    gap-2 sm:gap-3 md:gap-4 
    w-full max-w-5xl
    px-2 sm:px-0
    mt-2 sm:mt-4
  "
>
          <FlipCard
            title="Естественный свет"
            frontNote="Плавный переход от рассвета до заката."
            backText="Высокий индекс цветопередачи CRI 90+ и регулировка 3000–5700 K создают свет, максимально близкий к солнечному."
            icon={<SunMedium className="w-10 h-10 text-amber-500" strokeWidth={1.75} />}
          />

          <FlipCard
            title="Интеллект внутри"
            frontNote="Автономная работа и энергоэффективность."
            backText="Контроллер ESP32 управляет каналами света и регулирует спектр автоматически."
            icon={<Cpu className="w-10 h-10 text-amber-500" strokeWidth={1.75} />}
          />

          <FlipCard
            title="Комфорт и контроль"
            frontNote="С телефона или автоматически."
            backText="Приложение, расписание и режимы дня — всё под контролем."
            icon={<Smartphone className="w-10 h-10 text-amber-500" strokeWidth={1.75} />}
          />
        </div>
      </div>
    </section>
  );
}



function SectionSpectrum() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isTwoColumnMode, setIsTwoColumnMode] = useState(false);
  const toggleExpand = (id: string | null) =>
    setExpanded(id === expanded ? null : id);

  // === Проверяем высоту и включаем 2-колоночный режим ===
  useEffect(() => {
    const checkLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsTwoColumnMode(width >= 768 && height < 1000);
    };
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  const cards = [
    {
      id: "harmful",
      title: "Обычные источники",
      img: spectrumHarmful,
      text: (
        <>
          <strong className="text-sky-600">Синий пик</strong> усиливает
          усталость и мешает сну.
        </>
      ),
    },
    {
      id: "safe",
      title: "Искусственное окно",
      img: spectrumSafe,
      text: (
        <>
          Без синего пика — безопасно для глаз и сна, близко к
          естественному солнечному свету.
        </>
      ),
    },
  ];

  const quotes = [
    {
      quote:
        "“Синий свет (440–460 нм) вызывает окислительный стресс и ускоряет возрастные изменения сетчатки.”",
      source: "— Tosini et al., *Nature Aging Mechanisms*, 2024",
    },
    {
      quote:
        "“Синий свет подавляет выработку мелатонина в два раза сильнее зелёного, нарушая сон и циркадные ритмы человека.”",
      source: "— Harvard Health Publishing, 2018",
    },
    {
      quote:
        "“Хроническое воздействие коротковолнового света связано с развитием макулярной дегенерации и зрительной усталости.”",
      source: "— Framingham Eye Study, 2021",
    },
  ];

  return (
    <section
      id="why"
      className="
        relative w-full snap-start snap-always
        flex flex-col items-center justify-center
        text-center px-6
        h-screen min-h-[100dvh]
        overflow-hidden
        pt-[calc(env(safe-area-inset-top)+4rem)]
        pb-[calc(env(safe-area-inset-bottom)+3rem)]
      "
      style={{
        background:
          "radial-gradient(circle at 35% 40%, rgba(90,160,255,0.25), rgba(255,255,255,1) 80%)",
      }}
    >
      <div className="max-w-6xl w-full flex flex-col items-center justify-center h-full">
        {/* === Заголовок === */}
        <h2
          className="
            text-2xl sm:text-4xl max-[480px]:text-xl
            font-semibold mb-1 sm:mb-4 text-neutral-900 leading-snug text-center
          "
        >
          Почему обычное искусственное освещение вредно
        </h2>

        {/* === Описание === */}
        <p
          className="
            text-base sm:text-lg max-[480px]:text-sm
            text-neutral-700 mb-1 sm:mb-4 text-center leading-relaxed
            max-w-3xl mx-auto
          "
        >
          Большинство источников света используют{" "}
          <strong className="text-sky-600">синий кристалл (440–460 нм)</strong>,
          создающий выраженный “синий пик” в спектре. Такое излучение вызывает
          фотохимическое повреждение сетчатки, подавляет выработку мелатонина и
          нарушает циркадные ритмы — особенно у{" "}
          <strong className="text-sky-700">детей</strong> и{" "}
          <strong className="text-sky-700">пожилых</strong>.
        </p>

        {/* === Карточки спектров === */}
        <div
          className="
            flex flex-row flex-wrap justify-center items-start
            gap-4 sm:gap-10
            w-full max-w-6xl mb-1 sm:mb-1
          "
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => toggleExpand(card.id)}
              className="
                flex flex-col items-center text-center
                flex-1 min-w-[140px] max-w-[180px] md:max-w-[400px]
                transition-transform duration-300 active:scale-95
                cursor-pointer md:cursor-default
                p-2 sm:p-4
              "
            >
              <h3 className="text-sm sm:text-base font-semibold mb-3 text-neutral-800">
                {card.title}
              </h3>
              <img
                src={card.img}
                alt={card.title}
                className="
                  w-[130px] sm:w-[250px] md:w-[380px]
                  object-contain mix-blend-multiply
                  drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                "
              />
              <p className="mt-3 text-xs sm:text-sm text-neutral-700 max-w-sm">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* === Цитаты === */}
        <div
          className="
            w-full max-w-5xl mx-auto text-neutral-700 leading-snug
            text-[13px] sm:text-base max-[360px]:text-[12px]
            px-2 sm:px-0 pb-3 sm:pb-0
          "
        >
          {/* Мобильный свайп */}
          <div
            className="
              flex md:hidden flex-row overflow-x-auto scroll-smooth snap-x snap-mandatory
              whitespace-nowrap -mx-4 px-4
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              touch-pan-x
            "
          >
            {quotes.map((item, i) => (
              <blockquote
                key={i}
                className="
                  inline-block align-top min-w-[85vw] snap-start mr-3 last:mr-0
                  border-l-4 border-amber-400 pl-4 pr-4 py-3 italic
                  rounded-2xl bg-white/60 backdrop-blur-sm shadow-md
                  leading-relaxed whitespace-normal
                "
              >
                <p className="m-0">{item.quote}</p>
                <span className="not-italic text-[11px] max-[360px]:text-[10px] text-gray-500 block mt-1">
                  {item.source}
                </span>
              </blockquote>
            ))}
          </div>

          {/* Десктопная версия */}
          <div
            className={`
              hidden md:grid gap-5 transition-all duration-300
              ${isTwoColumnMode ? "grid-cols-2" : "grid-cols-1"}
            `}
          >
            {quotes.map((item, i) => (
              <blockquote
                key={i}
                className="
                  border-l-4 border-amber-400 pl-4 pr-4 py-3 italic
                  rounded-2xl bg-white/60 backdrop-blur-sm shadow-md
                  leading-relaxed whitespace-normal
                "
              >
                <p className="m-0">{item.quote}</p>
                <span className="not-italic text-[11px] sm:text-sm text-gray-500 block mt-1">
                  {item.source}
                </span>
              </blockquote>
            ))}
          </div>
        </div>
      </div>

      {/* === Раскрытая карточка (мобильная версия) === */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="expanded"
            className="fixed inset-0 z-[999] flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleExpand(null)}
            style={{
              background:
                "radial-gradient(circle at 35% 40%, rgba(90,160,255,0.25), rgba(255,255,255,1) 80%)",
            }}
          >
            <motion.div
              className="
                bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl
                border border-white/60 flex flex-col items-center text-center
                p-6 mx-4 max-w-[90vw]
              "
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              {cards
                .filter((c) => c.id === expanded)
                .map((card) => (
                  <div key={card.id}>
                    <h3 className="text-lg font-semibold mb-3 text-neutral-800">
                      {card.title}
                    </h3>
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-[85vw] max-w-[500px] object-contain mix-blend-multiply drop-shadow-md"
                    />
                    <p className="mt-4 text-sm text-neutral-700">{card.text}</p>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}








function SectionPlaces() {
  return (
    <section id="places" className="w-full snap-start">
      <FullImageBlock
        image={room2}
        title="Дом"
        text={
          <div className="bg-black/30 backdrop-blur-md rounded-3xl px-5 py-6 sm:px-10 sm:py-8 max-w-4xl mx-auto">
            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 font-medium leading-relaxed">
              Просыпайтесь с рассветом и засыпайте в мягком вечернем свете.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 leading-relaxed">
              Искусственное окно наполняет комнату естественным сиянием, меняя оттенок света в течение дня —
              от бодрящего утреннего до тёплого вечернего. Оно бережно гаснет, когда вы уходите,
              создавая ощущение живого солнца у вас дома.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center leading-relaxed">
              Идеально для <strong>спальни, гостиной и детской</strong> — там, где важны уют,
              мягкий свет и естественный ритм дня.
            </p>
          </div>
        }
      />

      <FullImageBlock
        image={office4}
        title="Офис"
        text={
          <div className="bg-black/30 backdrop-blur-md rounded-3xl px-5 py-6 sm:px-10 sm:py-8 max-w-4xl mx-auto">
            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 font-medium leading-relaxed">
              Искусственное окно делает офис светлее, продуктивнее и комфортнее.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 leading-relaxed">
              Свет без мерцания и бликов снижает усталость глаз и устраняет ощущение замкнутого пространства.
              В переговорных, open space и домашних кабинетах появляется естественное ощущение дня.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 leading-relaxed">
              Естественный свет — даже без окон: устройства устанавливаются вдоль рабочих зон,
              создавая эффект настоящих окон. Контроллер автоматически регулирует цветовую температуру и яркость.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center leading-relaxed">
              <strong>Результат —</strong> команда работает дольше без усталости, а пространство выглядит современно и живо.
            </p>
          </div>
        }
      />

      <FullImageBlock
        image={kids2}
        title="Образовательные учреждения"
        text={
          <div className="bg-black/30 backdrop-blur-md rounded-3xl px-5 py-6 sm:px-10 sm:py-8 max-w-4xl mx-auto">
            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 font-medium leading-relaxed">
              Искусственное окно создаёт здоровую световую среду для обучения и отдыха.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center mb-4 leading-relaxed">
              В детских садах, школах и университетах оно помогает сохранять концентрацию днём
              и плавно снижает активность к вечеру. Безопасный спектр без синего пика бережно защищает зрение детей
              и поддерживает естественные биоритмы.
            </p>

            <div className="w-50 h-[2px] bg-amber-600 mx-auto mb-4 rounded-full opacity-60"></div>

            <p className="text-[14px] sm:text-[17px] md:text-[20px] text-center leading-relaxed">
              <strong>Результат —</strong> комфортное пространство, где детям легче учиться,
              меньше устают глаза и сохраняется гармоничный ритм дня.
            </p>
          </div>
        }
      />
    </section>
  );
}






// ================================
// === Основной компонент CTA ===
// ================================
function SectionCTA({
  onClick,
  phone,
  handlePhoneChange,
}: {
  onClick: () => void;
  phone: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  


  return (
    <>
      <section
        id="order"
        className="snap-start w-full min-h-screen bg-amber-50 text-center flex flex-col"
      >
        <div className="flex flex-col justify-between flex-1">
          {/* === CTA === */}
          <div className="flex flex-col items-center justify-start px-6 sm:px-10 pt-20 sm:pt-24 pb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-snug">
              Почувствуйте солнце, даже без окон
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
              Искусственное окно — ваш личный источник естественного света.{" "}
              <br className="hidden sm:block" />
              Поддержка здоровья, спокойствия и настроения каждый день.
            </p>
            <button
              onClick={onClick}
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 sm:py-4 px-10 sm:px-12 rounded-xl shadow-md transition text-base sm:text-lg"
            >
              Почувствуй свет солнца
            </button>
          </div>

          {/* === Форма === */}
          <div id="contacts" className="w-full bg-amber-50 py-12 sm:py-16 px-6 sm:px-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-900 mb-3 sm:mb-4">
              Оставьте заявку
            </h3>
            <p className="text-neutral-700 mb-6 text-sm sm:text-base">
              Мы свяжемся и подберём решение под ваше пространство.
            </p>

            <form
              action="https://formspree.io/f/mqayljgp"
              method="POST"
              className="
                mt-2
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]
                gap-4
                max-w-5xl w-full mx-auto
              "
            >
              <input
                name="name"
                required
                placeholder="Имя"
                className="border rounded-lg p-4 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="border rounded-lg p-4 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={handlePhoneChange}
                className="border rounded-lg p-4 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
              <button
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg p-4 text-sm sm:text-base transition min-w-[150px]"
              >
                Отправить
              </button>
            </form>
          </div>

{/* === Футер === */}
<footer className="bg-neutral-900 text-white py-12 sm:py-16 px-6 sm:px-8 mt-auto">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-8 sm:gap-10 text-left items-stretch">
    
    {/* === Левая колонка: логотип на всю высоту === */}
    <div className="flex justify-center md:justify-start items-center md:items-stretch">
      <img
        src="/logo4.png"
        alt="Логотип Искусственное окно"
        className="h-40 max-h-40 md:max-h-none object-contain"
      />
    </div>

    {/* === Колонка: описание === */}
    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
        Искусственное окно
      </h3>
      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-[260px]">
        Свет, который живёт по тем же законам, что и солнце. <br />
        Уют, здоровье и ритм природы — в каждом дне.
      </p>
    </div>

    {/* === Колонка: навигация === */}
    <div className="flex flex-col justify-center text-center md:text-left">
      <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-amber-400">
        Разделы
      </h4>
      <ul className="space-y-1 sm:space-y-2 text-neutral-300 text-sm sm:text-base">
        <li><a href="#home" className="hover:text-amber-400 transition">Главная</a></li>
        <li><a href="#benefits" className="hover:text-amber-400 transition">Преимущества</a></li>
        <li><a href="#places" className="hover:text-amber-400 transition">Где полезно</a></li>
        <li>
          <button onClick={onClick} className="hover:text-amber-400 transition">
            Заказать
          </button>
        </li>
      </ul>
    </div>

    {/* === Колонка: контакты === */}
    <div className="flex flex-col justify-center text-center md:text-left">
      <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-amber-400">
        Контакты
      </h4>
      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
        info@smartwindow.ru <br />
        +7 (921) 914-11-71 <br />
        Санкт-Петербург
      </p>
    </div>
  </div>

  <div className="mt-10 border-t border-neutral-800 pt-5 text-center text-neutral-500 text-xs sm:text-sm">
    © {new Date().getFullYear()} Искусственное окно. Все права защищены.
  </div>
</footer>


        </div>
      </section>

    </>
  );
}


// ================================
// === Вспомогательные компоненты ===
// ================================
function ModalOrder({
  show,
  onClose,
  phone,
  handlePhoneChange,
}: {
  show: boolean;
  onClose: () => void;
  phone: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 sm:p-10 max-w-lg w-[90%] shadow-xl text-center relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Заказать демо</h3>
        <p className="text-neutral-700 mb-6">
          Оставьте контакты — мы свяжемся и подберём подходящее решение.
        </p>

        <form
          action="https://formspree.io/f/mqayljgp"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            name="name"
            required
            placeholder="Имя"
            className="border rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="border rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={handlePhoneChange}
            className="border rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg p-3 text-base transition"
          >
            Отправить заявку
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-neutral-400 hover:text-neutral-600 text-2xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/* === Вспомогательные компоненты === */
/* === Компонент FlipCard (выровненные заголовки и линии) === */

interface FlipCardProps {
  title: string;
  frontNote: string;
  backText: string;
  icon: React.ReactNode;
}

export function FlipCard({ title, frontNote, backText, icon }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (flipped) setShowHint(false);
  }, [flipped]);

  return (
    <motion.div
      onClick={() => setFlipped(!flipped)}
      initial={{ scale: 0.95, opacity: 0, y: 40 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
      className="
        relative w-full flex-1 cursor-pointer group select-none
        [perspective:1000px]
        min-h-[110px] sm:min-h-[240px] md:min-h-[260px]
      "
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* === Передняя сторона === */}
        <div className="
          relative w-full h-full bg-white/40 backdrop-blur-md 
          rounded-2xl p-2 sm:p-4 lg:p-6 shadow-md 
          flex flex-col justify-between text-center 
          backface-hidden border border-white/40
        ">
          {/* Верхняя часть: иконка + заголовок + линия */}
          <div className="flex flex-col items-center justify-start flex-none space-y-1.5 sm:space-y-2 lg:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 flex items-center justify-center text-amber-500">
              {icon}
            </div>

            {/* Заголовок — теперь фиксированный по высоте */}
            <h3 className="
              text-base sm:text-lg lg:text-xl font-semibold text-amber-600 leading-tight
              min-h-[1.8em] sm:min-h-[2em] flex items-center justify-center
            ">
              {title}
            </h3>

            <div className="w-8 lg:w-10 h-[2px] bg-amber-400 rounded-full"></div>
          </div>

          {/* Центральная часть (описание) */}
          <div className="flex-1 flex items-center justify-center">
            <p className="
              text-[13px] sm:text-sm lg:text-base text-neutral-700 leading-snug px-2
            ">
              {frontNote}
            </p>
          </div>

          {/* Подсказка ↻ */}
          {showHint && (
            <motion.div
              className="absolute bottom-1.5 right-2 text-amber-500 text-[10px] sm:text-[11px] lg:text-[13px] opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↻
            </motion.div>
          )}
        </div>

        {/* === Задняя сторона === */}
        <div className="
          absolute inset-0 bg-white/50 backdrop-blur-md rounded-2xl 
          p-4 sm:p-5 lg:p-6 shadow-md flex items-center justify-center 
          rotate-y-180 backface-hidden border border-white/40
        ">
          <p className="text-[13px] sm:text-sm lg:text-base text-neutral-800 leading-relaxed text-center px-1">
            {backText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}










function SpectrumCard({
  title,
  color,
  img,
  desc,
}: {
  title: string;
  color: string;
  img: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl p-6 sm:p-8 text-center">
      <h3 className={`text-xl font-semibold mb-4 ${color}`}>{title}</h3>
      <div className="w-full flex justify-center">
        <img
          src={img}
          alt={title}
          className="w-full max-w-md object-contain mix-blend-multiply"
          style={{
            background: "transparent",
          }}
        />
      </div>
      <p className="mt-4 text-base text-neutral-700 leading-relaxed max-w-md mx-auto">
        {desc}
      </p>
    </div>
  );
}



function FullImageBlock({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center text-center">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="relative z-10 max-w-3xl px-6 text-white">
        <h3 className="text-3xl font-semibold text-amber-400 mb-4">{title}</h3>
        <p className="text-lg text-white/90 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
