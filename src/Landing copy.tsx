import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { SunMedium, Cpu, Smartphone } from "lucide-react";
import { Menu, X } from "lucide-react"; // иконки бургера и закрытия

// Изображения для режимов свечения
import window3000 from "./assets/window-3000.png";
import window4000 from "./assets/window-4000.png";
import window5700 from "./assets/window-5700.png";

// Изображения для галереи “Дом”
import room1 from "./assets/room.png";
import room2 from "./assets/room2.png";
import room3 from "./assets/room3.png";
// Изображения для галереи “Офис”
import office1 from "./assets/office.png";
import office2 from "./assets/office2.png";
import office3 from "./assets/office3.png";
// Изображения для галереи “Образование”
import kids1 from "./assets/kids.png";
import kids2 from "./assets/kids2.png";
import kids3 from "./assets/kids3.png";

import lightIcon from "./assets/light-rays.png";
import chipIcon from "./assets/chip-ai.png";
import phoneIcon from "./assets/smart-control.png";
import windowinterior from "./assets/window-interior1.png";



// Изображения спектров
import spectrumHarmful from "./assets/spectrum_harmful.png";
import spectrumSafe from "./assets/spectrum_safe.png";

function MonoIcon({ children }: { children: React.ReactNode }) {
  return  <div className="text-amber-600 w-16 h-16 flex items-center justify-center">{children}</div>;
}

/* ---------- 🌤 Slow & Cinematic Animations ---------- */
import type { Variants, Transition } from "framer-motion";

// Более “медленная” кривая, как затухающий свет
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,          // 🕐 почти 2 секунды
      ease: easing as Transition["ease"],
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2.2,          // 🕐 дольше всего (как дыхание)
      ease: easing as Transition["ease"],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.55,  // 🕐 пауза между элементами почти полсекунды
      delayChildren: 0.4,     // первая пауза перед появлением
    },
  },
};
/* -------------------------------------------------------------------- */
/* 🔹 Плавные эффекты появления при скролле */
const revealUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInDelayed = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
  },
};

const modes = [
  { name: "3000K", color: "#F5E6C8", image: window3000 },
  { name: "4000K", color: "#F3EEDC", image: window4000 },
  { name: "5700K", color: "#E7EEF5", image: window5700 },
];

// ====== Компоненты ======

function Gallery({ images }: { images: string[] }) {

  return (
    <>
      {/* mobile scroll */}
      <div className="md:hidden -mx-2 mt-4 overflow-x-auto pb-2">
        <ul className="flex gap-3 px-2 snap-x snap-mandatory">
          {images.map((src, i) => (
            <li key={i} className="snap-start shrink-0">
              <img
                src={src}
                alt=""
                className="h-36 w-64 object-cover rounded-xl shadow-md"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-3 mt-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-32 w-full object-cover rounded-xl shadow-md"
          />
        ))}
      </div>
    </>
  );
}

function ScenarioCard({
  title,
  desc,
  images,
}: {
  title: string;
  desc: string;
  images: string[];
}) {
  return (
    <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition text-left">
      <h3 className="text-xl font-semibold mb-2 text-amber-600">{title}</h3>
      <p className="text-slate-700">{desc}</p>
      <Gallery images={images} />
    </div>
  );
}

// ====== Основной компонент ======

export default function Landing() {
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div
      className="min-h-screen transition-colors duration-700 flex flex-col items-center"
  style={{
    backgroundColor: activeMode.color,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    transition: "background-color 1s ease",
      }}
    >
        {/* Якорь для кнопки “Главная” */}
<div id="home" className="absolute top-0"></div>



      {/* === Верхнее меню с бургером === */}
<header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-neutral-200">
  <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
    {/* Логотип */}
    <a href="#home" className="flex items-center gap-2">
      <img src="/logo.png" alt="Логотип" className="h-9 w-auto" />
      <span className="text-sm sm:text-base font-semibold text-neutral-900">
  Искусственное окно
</span>
    </a>

    {/* Навигация для десктопа */}
    <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
      <a href="#home" className="hover:text-amber-600 transition">Главная</a>
      <a href="#benefits" className="hover:text-amber-600 transition">Технология</a>
      <a href="#places" className="hover:text-amber-600 transition">Где полезно</a>
      <a href="#contacts" className="hover:text-amber-600 transition">Контакты</a>
      <button
        onClick={() => setShowModal(true)}
        className="ml-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
      >
        Заказать демо
      </button>
    </nav>

    {/* Кнопка-бургер для мобильных */}
    <button
      className="md:hidden text-neutral-800 hover:text-amber-600 transition"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
    </button>
  </div>
</header>

{/* Отступ после фиксированной шапки — только для мобильных */}
<div className="block md:hidden h-" />

{/* Мобильное меню (выпадает под шапкой) */}
{isMenuOpen && (
  <div className="fixed top-14 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200 z-30 md:hidden animate-fadeIn">
    <nav className="flex flex-col items-center text-neutral-800 py-6 space-y-4 text-base">
      <a href="#home" className="hover:text-amber-600 transition" onClick={() => setIsMenuOpen(false)}>Главная</a>
      <a href="#benefits" className="hover:text-amber-600 transition" onClick={() => setIsMenuOpen(false)}>Технология</a>
      <a href="#places" className="hover:text-amber-600 transition" onClick={() => setIsMenuOpen(false)}>Где полезно</a>
      <a href="#contacts" className="hover:text-amber-600 transition" onClick={() => setIsMenuOpen(false)}>Контакты</a>
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
{/* === Контейнер для прокрутки секций === */}
<div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
   {/* === HERO (единый блок с фото и текстом) === */}
<motion.section
  id="home"
  initial={{ opacity: 0, scale: 1.02 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
  className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-end text-center"
>
  {/* Фон */}
  <img
    src={windowinterior}
    alt="Искусственное окно в интерьере"
    className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.9]"
  />

  {/* Градиент для контраста текста */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

  {/* Текст */}
  <motion.div
    className="relative z-10 w-full px-4 pb-[12dvh] sm:pb-24"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 1.1 }}
  >
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-snug drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
      Свет, который оживляет пространство
    </h1>
    <p className="text-white/90 text-sm sm:text-base md:text-lg leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
      Искусственное окно — естественное солнце там, где его не хватает
    </p>
  </motion.div>

  {/* Стрелка вниз */}
  <motion.div
    className="absolute bottom-[2.5dvh] sm:bottom-6 left-1/2 -translate-x-1/2 text-white opacity-80"
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6 sm:w-7 sm:h-7"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </motion.div>
</motion.section>









    {/* === HERO (мобильная версия) — с динамическим фоном === */}
<motion.section
  id="home"
  className="flex md:hidden flex-col items-center justify-center w-full text-center min-h-screen p-0 m-0 transition-colors duration-700"
  style={{
    backgroundColor: activeMode.color,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }}
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {/* Текст */}
  <motion.h1
    variants={fadeInUp}
    className="text-3xl font-bold text-neutral-900 leading-snug px-4"
  >
    Искусственное окно —{" "}
    <span className="text-amber-500">свет, который живёт по вашим ритмам</span>.
  </motion.h1>

  {/* Изображение окна + мягкое “дыхание света” */}
  <motion.div
    variants={fadeIn}
    className="relative w-[260px] h-[380px] flex items-center justify-center my-0"
  >
    {/* Световой ореол дышит медленно */}
    <motion.div
      className="absolute inset-0 rounded-3xl blur-[60px] opacity-40 animate-pulse-slow"
      style={{ backgroundColor: activeMode.color }}
      aria-hidden
    />
    <img
      src={activeMode.image}
      alt="Искусственное окно"
      className="relative z-10 w-full h-auto object-contain drop-shadow-2xl m-0"
    />
  </motion.div>

  {/* Переключатели режимов */}
  <motion.div variants={fadeInUp} className="flex gap-3 mt-2 mb-4">
    {modes.map((mode) => (
      <button
        key={mode.name}
        onClick={() => setActiveMode(mode)}
        className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all ${
          activeMode.name === mode.name
            ? "bg-black text-white border-black"
            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
        }`}
      >
        {mode.name}
      </button>
    ))}
  </motion.div>

  <motion.p
    variants={fadeInUp}
    className="text-neutral-700 text-base mb-6 max-w-sm px-4"
  >
    Естественный свет и комфорт даже там, где нет окон. Управляйте светом, который подстраивается под вас.
  </motion.p>

  {/* Кнопки */}
  <motion.div
    variants={fadeInUp}
    className="flex flex-col gap-3 w-full max-w-xs mb-4"
  >
    <button
      onClick={() => setShowModal(true)}
      className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 rounded-xl shadow-md transition"
    >
      Почувствуй свет солнца →
    </button>
    <button
      onClick={() =>
        document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
      }
      className="border border-gray-400 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition"
    >
      Подробнее
    </button>
  </motion.div>
</motion.section>

            
      {/* === HERO (десктоп) — поочерёдные появления + “дышащий” свет за окном === */}
      <motion.section
        id="home"
        className="hidden md:flex flex-row items-center justify-between max-w-7xl w-full px-10 py-20 mx-auto "
        variants={staggerContainer} // 🔹 NEW
        initial="hidden"            // 🔹 NEW
        whileInView="visible"       // 🔹 NEW (появление при прокрутке)
        viewport={{ once: true, amount: 0.4 }} // 🔹 NEW
      >
        {/* Текст */}
        <div className="flex-1 space-y-6 max-w-xl">
          <motion.h1 variants={fadeInUp} className="text-6xl font-bold text-neutral-900 leading-tight">
            Искусственное окно —{" "}
            <span className="text-amber-500">свет, который живёт по вашим ритмам.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-neutral-700 text-lg max-w-md">
            Естественный свет, динамика суток и спокойствие — даже там, где нет окон.
            Интеллектуальное устройство, которое имитирует естественный солнечный цикл.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-4 mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-6 rounded-xl shadow-md transition"
            >
              Почувствуй свет солнца →
            </button>

            <button
              onClick={() =>
                document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition"
            >
              Подробнее
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex gap-3 mt-8">
            {modes.map((mode) => (
              <button
                key={mode.name}
                onClick={() => setActiveMode(mode)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeMode.name === mode.name
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {mode.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Фото окна */}
        <motion.div variants={fadeIn} className="flex-1 flex justify-center relative">
          <div className="relative w-[450px] h-[820px] flex items-center justify-center">
            {/* “Дышащий” ореол */}
            <motion.div
              className="absolute inset-0 blur-[100px] opacity-40 rounded-3xl"
              style={{ backgroundColor: activeMode.color }}
              animate={{ scale: [1, 1.03, 1], opacity: [0.35, 0.5, 0.35] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <img
              src={activeMode.image}
              alt="Искусственное окно"
              className="relative z-10 transition-all duration-700 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </motion.section>
</div>



 {/* === УНИКАЛЬНОСТЬ === */}
<section id="benefits" className="py-20 px-6 bg-neutral-50 w-full text-center">
  <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-2">
    Что делает Искусственное окно уникальным
  </h2>
            {/* === Преимущество (жёлтый блок) === */}
    <div className=" from-amber-100/70 to-white/60  p-10 mx-auto max-w-5xl">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-400 rounded-full blur-[40px] opacity-30"></div>
      <h3 className="text-2xl md:text-3xl font-bold text-amber-600 mb-4 text-center">
        Свет, как у солнца — без вреда, с пользой
      </h3>
      <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl mx-auto text-center">
        Искусственное окно создаёт <strong className="text-amber-600">естественный солнечный спектр</strong> —  
        сбалансированный, без синего пика и с высоким индексом цветопередачи (CRI 90+).  
        Такой свет улучшает концентрацию, снижает стресс и поддерживает здоровые биоритмы.
      </p>
    </div>
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      {
        title: "Естественный свет",
        frontNote: "Плавный переход от рассвета до заката.",
        backText:
          "Высокий индекс цветопередачи CRI 90+ и динамическая регулировка цветовой температуры от 3000K до 5700K создают свет, максимально близкий к солнечному.",
        icon: (
          <MonoIcon>
            <SunMedium className="w-15 h-15" strokeWidth={1.75} />
          </MonoIcon>
        ),
      },
      {
        title: "Интеллект внутри",
        frontNote: "Полностью автономная работа и энергоэффективность.",
        backText:
          "Контроллер на базе ESP32 управляет всеми каналами света, обеспечивает автоматические режимы и настройку расписания. Встроенный датчик присутствия человека экономит энергию.",
        icon: (
          <MonoIcon>
            <Cpu className="w-15 h-15" strokeWidth={1.75} />
          </MonoIcon>
        ),
      },
      {
        title: "Управление и комфорт",
        frontNote: "Всё под контролем — с телефона или автоматически.",
        backText:
          "Удобное мобильное приложение позволяет настраивать освещение, выбирать режимы дня, управлять яркостью и температурой.",
        icon: (
          <MonoIcon>
            <Smartphone className="w-15 h-15" strokeWidth={1.75} />
          </MonoIcon>
        ),
      },
    ].map((card, index) => (
      <FlipCard key={index} {...card} />
    ))}
  </div>
</section>


      {/* === БЛОК: Почему обычный свет вреден === */}
<section className="relative w-full py-24 text-neutral-900 overflow-hidden"
>
  {/* Фоновый градиент — мягкий переход */}
  <div
    className="absolute inset-0 -z-10"
    style={{
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(250,240,220,0.7) 100%)",
    }}
  ></div>

  {/* Световой ореол для глубины */}
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[200px] opacity-40 -z-10"
    style={{
      background:
        "radial-gradient(circle, rgba(255,220,130,0.4) 0%, transparent 70%)",
    }}
  ></div>

  <div className="max-w-6xl mx-auto px-6 text-center md:text-left relative z-10">
    <h2 className="text-4xl md:text-4xl font-bold text-center mb-8 leading-tight">
      Почему обычное искусственное освещение <span className="text-amber-600">вреднно</span> для зрения и сна
    </h2>

    <p className="text-lg text-neutral-700 mb-12 text-center leading-relaxed max-w-3xl mx-auto">
      Большинство источников света используют <strong className="text-amber-600">синий кристалл (440–460 нм)</strong>,
      создающий выраженный “синий пик” в спектре.  
      Такое излучение вызывает фотохимическое повреждение сетчатки, подавляет выработку мелатонина  
      и нарушает циркадные ритмы — особенно у <strong>детей</strong> и <strong>пожилых</strong>.
    </p>

    {/* === Сравнение спектров === */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
      {/* — левая карточка — обычные диоды */}
      <div className="group bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 transition-transform hover:-translate-y-2 hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">
          Обычные диоды
        </h3>
        <img
          src={spectrumHarmful}
          alt="Спектр обычных диодов"
          className="rounded-lg shadow-md mx-auto w-full max-w-md transition-all group-hover:scale-[1.02]"
        />
        <p className="mt-4 text-sm text-neutral-600 text-center">
          Резкий синий пик (440–460 нм) усиливает усталость глаз и мешает нормальному сну.
        </p>
      </div>

      {/* — правая карточка — Искусственное окно */}
      <div className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 transition-transform hover:-translate-y-2 hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 text-green-600 text-center">
          Искусственное окно
        </h3>
        <img
          src={spectrumSafe}
          alt="Безопасный спектр Искусственного окна"
          className="rounded-lg shadow-md mx-auto w-full max-w-md transition-all group-hover:scale-[1.02]"
        />
        <p className="mt-4 text-sm text-neutral-600 text-center">
          Cпектр без синего пика — безопасен для глаз, сна и настроения.  
          Максимально близок к солнечному.
        </p>
      </div>
    </div>

    

    {/* === Источники === */}
    <div className="mt-16 space-y-6 text-left max-w-3xl mx-auto">
      <blockquote className="border-l-4 border-amber-400 pl-6 italic text-neutral-700">
        “Синий свет (440–460 нм) вызывает окислительный стресс, повреждение фоторецепторов
        и ускоряет возрастные изменения сетчатки.”
        <br />
        <span className="not-italic text-sm text-gray-500">
          — Tosini et al., *Nature Aging Mechanisms*, 2024
        </span>
      </blockquote>

      <blockquote className="border-l-4 border-amber-400 pl-6 italic text-neutral-700">
        “Синий свет подавляет выработку мелатонина в два раза сильнее зелёного, нарушая сон
        и циркадные ритмы человека.”
        <br />
        <span className="not-italic text-sm text-gray-500">
          — Harvard Health Publishing, 2018
        </span>
      </blockquote>

      <blockquote className="border-l-4 border-amber-400 pl-6 italic text-neutral-700">
        “Хроническое воздействие коротковолнового света связано с развитием макулярной
        дегенерации и зрительной усталости.”
        <br />
        <span className="not-italic text-sm text-gray-500">
          — Framingham Eye Study, 2021
        </span>
      </blockquote>
    </div>
  </div>
</section>


    



      {/* Где особенно полезно */}
<section id="places" className="py-20 w-full bg-white">
  <h2 className="text-4xl font-semibold text-center text-neutral-900 mb-16 px-4">
    Где Искусственное окно особенно полезно
  </h2>

  {/* ===== Дом ===== */}
  <div className="max-w-5xl mx-auto">
    <div className="mb-8">
  <h3 className="text-2xl font-semibold text-amber-700 text-center">Дом</h3>
  <div className="w-10 h-[2px] bg-amber-500 mx-auto mt-2 rounded-full"></div>
</div>

    <div className="max-w-3xl mx-auto text-neutral-800 leading-relaxed space-y-5">
      <p className="text-xl font-semibold text-neutral-900 text-center">
        Просыпайтесь с рассветом и засыпайте в мягком вечернем свете.
      </p>

      <p className="text-[17px] text-center">
        Искусственное окно наполняет комнату естественным сиянием, меняя оттенок света в течение дня —
        от бодрящего утреннего до тёплого вечернего. Оно бережно гаснет, когда вы уходите,
        создавая ощущение живого солнца у вас дома.
      </p>

      <p className="text-[17px] text-center">
        Идеально для <strong>спальни, гостиной и детской</strong> — там, где важны уют,
        мягкий свет и естественный ритм дня.
      </p>
      <br></br>
    </div>



    {/* галерея */}
    <div className="hidden md:grid grid-cols-3 gap-6 px-4">
      {[room1, room2, room3].map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Домашний интерьер с Искусственным окном"
          className="rounded-2xl h-[600px] w-full object-cover shadow-lg hover:scale-105 transition-transform"
        />
      ))}
    </div>

    {/* mobile scroll — центрирование изображений */}
<div className="md:hidden overflow-x-auto flex gap-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth">
  {/* Пустой отступ слева для центрирования первого изображения */}
  <div className="shrink-0 w-[calc(50vw-10rem)]" />

  { [room1, room2, room3].map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      className="snap-center shrink-0 w-80 h-[260px] object-cover rounded-2xl shadow-md"
    />
  ))}

  {/* Пустой отступ справа для центрирования последнего изображения */}
  <div className="shrink-0 w-[calc(50vw-10rem)]" />
</div>

  </div>

   {/* ===== ОФИСЫ ===== */}
<div className="max-w-5xl mx-auto mt-24">
  <div className="mb-8 text-center">
    <h3 className="text-2xl font-semibold text-amber-700">Офисы</h3>
    <div className="w-10 h-[2px] bg-amber-500 mx-auto mt-2 rounded-full"></div>
  </div>

  <div className="max-w-3xl mx-auto text-neutral-800 leading-relaxed space-y-5 text-center">
    <p className="text-xl font-semibold text-neutral-900">
      Искусственное окно делает офис светлее, продуктивнее и комфортнее.
    </p>

    <p className="text-[17px]">
      Свет без мерцания и бликов снижает усталость глаз и устраняет ощущение замкнутого пространства.
      В переговорных, open space и домашних кабинетах появляется естественное ощущение дня.
    </p>

    <p className="text-[17px]">
      Естественный свет — даже без окон: устройства устанавливаются вдоль рабочих зон,
      создавая эффект настоящих окон. Контроллер автоматически регулирует цветовую температуру и яркость.
    </p>

    <p className="text-[17px]">
      <strong>Результат —</strong> команда работает дольше без усталости, а пространство выглядит современно и живо.
    </p>
    <br></br>
  </div>

    <div className="hidden md:grid grid-cols-3 gap-6 px-4">
      {[office1, office2, office3].map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Офисное пространство с Искусственным окном"
          className="rounded-2xl h-[600px] w-full object-cover shadow-lg hover:scale-105 transition-transform"
        />
      ))}
    </div>

    {/* mobile scroll — центрирование изображений */}
<div className="md:hidden overflow-x-auto flex gap-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth">
  {/* Пустой отступ слева для центрирования первого изображения */}
  <div className="shrink-0 w-[calc(50vw-10rem)]" />

  { [office1, office2, office3].map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      className="snap-center shrink-0 w-80 h-[260px] object-cover rounded-2xl shadow-md"
    />
  ))}

  {/* Пустой отступ справа для центрирования последнего изображения */}
  <div className="shrink-0 w-[calc(50vw-10rem)]" />
</div>

  </div>

  {/* ===== ОБРАЗОВАТЕЛЬНЫЕ УЧРЕЖДЕНИЯ ===== */}
<div className="max-w-5xl mx-auto mt-24">
  <div className="mb-8 text-center">
    <h3 className="text-2xl font-semibold text-amber-700">Образовательные учреждения</h3>
    <div className="w-10 h-[2px] bg-amber-500 mx-auto mt-2 rounded-full"></div>
  </div>

  <div className="max-w-3xl mx-auto text-neutral-800 leading-relaxed space-y-5 text-center">
    <p className="text-xl font-semibold text-neutral-900">
      Искусственное окно создаёт здоровую световую среду для обучения и отдыха.
    </p>

    <p className="text-[17px]">
      В детских садах, школах и университетах оно помогает сохранять концентрацию днём
      и плавно снижает активность к вечеру. Безопасный спектр без синего пика бережно защищает зрение детей
      и поддерживает естественные биоритмы.
    </p>

    <p className="text-[17px]">
      <strong>Результат —</strong> комфортное пространство, где детям легче учиться,
      меньше устают глаза и сохраняется гармоничный ритм дня.
    </p>
    <br></br>
  </div>

    <div className="hidden md:grid grid-cols-3 gap-6 px-4">
      {[kids1, kids2, kids3].map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Класс или детская комната с Искусственным окном"
          className="rounded-2xl h-[600px] w-full object-cover shadow-lg hover:scale-105 transition-transform"
        />
      ))}
    </div>

    {/* mobile scroll — центрирование изображений */}
<div className="md:hidden overflow-x-auto flex gap-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth">
  {/* Пустой отступ слева для центрирования первого изображения */}
  <div className="shrink-0 w-[calc(50vw-10rem)]" />

  { [kids1, kids2, kids3].map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      className="snap-center shrink-0 w-80 h-[260px] object-cover rounded-2xl shadow-md"
    />
  ))}

  {/* Пустой отступ справа для центрирования последнего изображения */}
  <div className="shrink-0 w-[calc(50vw-10rem)]" />
</div>
</div>

</section>


      {/* Финальный CTA */}
      <section id="order" className="py-24 bg-amber-50 w-full text-center">
        <h2 className="text-4xl font-bold text-neutral-900 mb-6">
          Почувствуйте солнце, даже без окон
        </h2>
        <p className="text-lg text-neutral-700 mb-10">
          Искусственное окно — ваш личный источник естественного света.  
          Поддержка здоровья, спокойствия и настроения каждый день.
        </p>
        <button onClick={() => setShowModal(true)} className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-4 px-10 rounded-xl shadow-md transition text-lg">
          Почувствуй свет солнца →
        </button>

      </section>
      {/* Стационарная форма внизу */}
      <section id="contacts" className="py-16 bg-amber-50 text-center">
  <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900">Оставьте заявку</h3>
  <p className="text-neutral-700 mt-2">Мы свяжемся и подберём решение под ваше пространство.</p>
  <form action="https://formspree.io/f/mqayljgp" method="POST"
    className="mt-6 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 px-4">
    <input name="name" required placeholder="Имя" className="border rounded-lg p-3" />
    <input name="email" type="email" required placeholder="Email" className="border rounded-lg p-3" />
    <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg p-3">
      Отправить
    </button>
  </form>
</section>

      {/* ===== FOOTER ===== */}
<footer className="bg-neutral-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

    {/* Левая колонка */}
    <div>
      <h3 className="text-2xl font-semibold mb-4">Искусственное окно</h3>
      <p className="text-sm text-neutral-400">
        Свет, который живёт по тем же законам, что и солнце.  
        Уют, здоровье и ритм природы — в каждом дне.
      </p>
    </div>

    {/* Разделы */}
    <div>
      <h4 className="text-lg font-semibold mb-4 text-amber-400">Разделы</h4>
      <ul className="space-y-2 text-neutral-300">
        <li>
          <a href="#home" className="hover:text-amber-400 transition">Главная</a>
        </li>
        <li>
          <a href="#benefits" className="hover:text-amber-400 transition">Преимущества</a>
        </li>
        <li>
          <a href="#places" className="hover:text-amber-400 transition">Где полезно</a>
        </li>
        <li>
          <a href="#order" className="hover:text-amber-400 transition" onClick={() => setShowModal(true)}>Заказать</a>
        </li>
      </ul>
    </div>

    {/* Контакты */}
    <div>
      <h4 className="text-lg font-semibold mb-4 text-amber-400">Контакты</h4>
      <p className="text-neutral-400 text-sm leading-relaxed">
        galihanashvili@yandex.ru <br />
        +7 (921) 914-11-71 <br />
        Санкт-Петербург
      </p>
    </div>
  </div>

  <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-neutral-500 text-sm">
    © {new Date().getFullYear()} Искусственное окно. Все права защищены.
  </div>
</footer>

{/* === Модальное окно заявки === */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
      >
        ✕
      </button>

      <h3 className="text-2xl font-bold text-amber-600 mb-2">
        Закажите демо Искусственного окна
      </h3>
      <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
        Оставьте контакты — мы свяжемся с вами и подберём оптимальное решение.
      </p>

      {/* === ФОРМА FORMspree === */}
      <form
        action="https://formspree.io/f/mqayljgp"
        method="POST"
        className="space-y-4 text-left"
      >
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
          className="border w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Ваш e-mail"
          required
          className="border w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          required
          pattern="^[+0-9\s()-]{7,20}$"
          className="border w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <textarea
          name="message"
          placeholder="Комментарий (необязательно)"
          rows={3}
          className="border w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        ></textarea>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg w-full transition"
        >
          Отправить заявку
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
/* === Компонент FlipCard === */
interface FlipCardProps {
  title: string;
  frontNote: string;
  backText: string;
  icon: React.ReactNode; // ← мы используем icon, не image
}

function FlipCard({ title, frontNote, backText, icon }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // После первого нажатия подсказка исчезает
  useEffect(() => {
    if (flipped) setShowHint(false);
  }, [flipped]);

  return (
    <motion.div
      className="relative w-full h-72 perspective cursor-pointer group select-none"
      onClick={() => setFlipped(!flipped)}
      // 👇 Bounce-анимация при появлении карточки
      initial={{ scale: 0.95, opacity: 0, y: 40 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.1,
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        } group-hover:scale-[1.03] group-hover:-rotate-x-[2deg]`}
      >
        {/* Передняя сторона */}
        <div className="absolute inset-0 bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between items-center backface-hidden">
          {/* Светящийся контур */}
          <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-amber-300/50 transition-all duration-700 pointer-events-none"></div>

          {/* 🔸 Подсказка (адаптивная) */}
          {showHint && (
            <motion.div
              className="absolute bottom-3 right-3 flex items-center gap-1 text-amber-500 text-xs md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
              // 👇 На мобильных — пульсирующая подсказка
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hidden md:inline">нажмите</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.75 9.75a7.5 7.5 0 1114.25 2.25"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l3 3"
                />
              </svg>
            </motion.div>
          )}

          {/* Контент */}
          <div className="flex items-center justify-center mb-6 mt-2">{icon}</div>
          <h3 className="text-xl font-bold text-amber-600 mb-2">{title}</h3>
          <p className="text-sm text-neutral-500 border-t border-amber-100 pt-3 text-center min-h-[48px] flex items-center justify-center">
            {frontNote}
          </p>
        </div>

        {/* Задняя сторона */}
        <div className="absolute inset-0 bg-white rounded-2xl p-8 shadow-md text-left flex flex-col justify-center rotate-y-180 backface-hidden">
          <p className="text-base text-slate-700 leading-relaxed text-center">
            {backText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}


