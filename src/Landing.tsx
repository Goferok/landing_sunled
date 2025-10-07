import { useState } from "react"; 

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



// Изображения спектров
import spectrumHarmful from "./assets/spectrum_harmful.png";
import spectrumSafe from "./assets/spectrum_safe.png";


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


  return (
    <div
      className="min-h-screen transition-colors duration-700 flex flex-col items-center"
      style={{
        backgroundColor: activeMode.color,
        transition: "background-color 1s ease",
      }}
    >

    {/* === HERO (мобильная версия) === */}
<section
  id="home"
  className="flex md:hidden flex-col items-center justify-center w-full bg-white text-center min-h-screen p-0 m-0"
  style={{ paddingTop: 0, paddingBottom: 0 }}
>
    {/* Текст */}
  <h1 className="text-3xl font-bold text-neutral-900 leading-snug px-4">
    Искусственное окно —{" "}
    <span className="text-amber-500">
      свет, который живёт по вашим ритмам
    </span>
    .
  </h1>
  {/* Изображение окна */}
  <div className="relative w-[260px] h-[380px] flex items-center justify-center my-0">
    <div
      className="absolute inset-0 blur-[60px] opacity-40 transition-all duration-700 rounded-3xl"
      style={{ backgroundColor: activeMode.color }}
    ></div>
    <img
      src={activeMode.image}
      alt="Искусственное окно"
      className="relative z-10 w-full h-auto object-contain drop-shadow-2xl m-0"
    />
  </div>

  {/* Переключатели режимов */}
  <div className="flex gap-3 mt-2 mb-4">
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
  </div>

  

  <p className="text-neutral-700 text-base mb-6 max-w-sm px-4">
    Естественный свет и комфорт даже там, где нет окон.  
    Управляйте светом, который подстраивается под вас.
  </p>

  {/* Кнопки */}
  <div className="flex flex-col gap-3 w-full max-w-xs mb-4">
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
  </div>
</section>



{/* === HERO (десктопная версия) === */}
<section
  className="hidden md:flex flex-row items-center justify-between max-w-7xl w-full px-10 py-20 mx-auto"
>
  {/* Текст */}
  <div className="flex-1 space-y-6 max-w-xl">
    <h1 className="text-6xl font-bold text-neutral-900 leading-tight">
      Искусственное окно —{" "}
      <span className="text-amber-500">
        свет, который живёт по вашим ритмам.
      </span>
    </h1>
    <p className="text-neutral-700 text-lg max-w-md">
      Естественный свет, динамика суток и спокойствие — даже там, где нет окон.
      Интеллектуальное устройство, которое имитирует естественный солнечный цикл.
    </p>

    <div className="flex gap-4 mt-6">
      <button
        onClick={() => setShowModal(true)}
        className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-6 rounded-xl shadow-md transition"
      >
        Почувствуй свет солнца →
      </button>

      <button
        onClick={() =>
          document
            .getElementById("benefits")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="border border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition"
      >
        Подробнее
      </button>
    </div>

    <div className="flex gap-3 mt-8">
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
    </div>
  </div>

  {/* Фото окна */}
  <div className="flex-1 flex justify-center relative">
    <div className="relative w-[450px] h-[820px] flex items-center justify-center">
      <div
        className="absolute inset-0 blur-[100px] opacity-40 transition-all duration-700 rounded-3xl"
        style={{ backgroundColor: activeMode.color }}
      ></div>
      <img
        src={activeMode.image}
        alt="Искусственное окно"
        className="relative z-10 transition-all duration-700 drop-shadow-2xl"
      />
    </div>
  </div>
</section>



      {/* Блок: Зачем нужно */}
<section id="benefits" className="py-24 bg-white text-neutral-900">
  <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
    <h2 className="text-4xl text-center font-bold mb-8">
      Почему обычный свет вреден для зрения и сна
    </h2>
    <p className="text-lg text-neutral-600 mb-12 text-center leading-relaxed md:text-left">
      Большинство источников света используют <strong className="text-amber-600">синий кристалл (440–460 нм)</strong>,
      создающий выраженный “синий пик” в спектре. Такое излучение вызывает
      фотохимическое повреждение сетчатки, подавляет выработку мелатонина и нарушает циркадные ритмы.
      Особенно опасно это для <strong>детей</strong>, <strong>пожилых</strong> и тех, кто проводит много времени
      без естественного освещения.
    </p>

    {/* Сравнение спектров */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Обычные диоды</h3>
        <img
          src={spectrumHarmful}
          alt="Спектр обычных диодов"
          className="rounded-lg shadow-lg mx-auto w-full max-w-md"
        />
        <p className="mt-4 text-sm text-neutral-600">
          Резкий синий пик. Повышает усталость глаз, нарушает сон и биоритмы.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4 text-green-600">Искусственное окно</h3>
        <img
          src={spectrumSafe}
          alt="Безопасный спектр Искусственного окна"
          className="rounded-lg shadow-lg mx-auto w-full max-w-md"
        />
        <p className="mt-4 text-sm text-neutral-600">
          Cпектр без синего пика — безопасен для глаз, сна и настроения.
        </p>
      </div>
    </div>

    {/* Наше преимущество */}
    <div className="bg-amber-50 rounded-3xl p-10 shadow-inner border border-amber-100">
      <h3 className="text-2xl font-bold text-amber-700 mb-4 text-center">
        🌤 Свет, как у солнца — без вреда, с пользой
      </h3>
      <p className="text-lg text-neutral-700 leading-relaxed max-w-4xl mx-auto">
        Искусственное окно создаёт <strong className="text-amber-700">естественный солнечный спектр</strong> —
        сбалансированный, без синего пика, с высоким индексом цветопередачи (CRI 90+).
        Такой свет не только безопасен, но и полезен:
        он улучшает концентрацию, снижает стресс и поддерживает здоровые циркадные ритмы.
      </p>
    </div>



          {/* Цитаты и источники */}
          <div className="mt-16 space-y-6 text-left">
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

     {/* === УНИКАЛЬНОСТЬ === */}
<section className="py-20 px-6 bg-neutral-50 w-full text-center">
  <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-12">
    Что делает Искусственное окно уникальным
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      {
        title: "Естественный свет",
        frontNote: "Плавный переход от рассвета до заката.",
        backText:
          "Высокий индекс цветопередачи CRI 90+ и динамическая регулировка цветовой температуры от 3000K до 5700K создают свет, максимально близкий к солнечному.",
        image: lightIcon,
      },
      {
        title: "Интеллект внутри",
        frontNote: "Полностью автономная работа и энергоэффективность.",
        backText:
          "Контроллер на базе ESP32 управляет всеми каналами света, обеспечивает автоматические режимы и настройку расписания. Встроенный датчик присутствия человека экономит энергию.",
        image: chipIcon,
      },
      {
        title: "Управление и комфорт",
        frontNote: "Всё под контролем — с телефона или автоматически.",
        backText:
          "Удобное мобильное приложение позволяет настраивать освещение, выбирать режимы дня, управлять яркостью и температурой.",
        image: phoneIcon,
      },
    ].map((card, index) => (
      <FlipCard key={index} {...card} />
    ))}
  </div>
</section>



      {/* Где особенно полезно */}
<section id="places" className="py-24 w-full bg-white">
  <h2 className="text-4xl font-semibold text-center text-neutral-900 mb-16">
    Где Искусственное окно особенно полезно
  </h2>

  {/* ===== ДОМ ===== */}
  <div className="max-w-7xl mx-auto mb-24">
  <h3 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6 px-4">
    🏠 Дом
  </h3>

  <p className="text-lg text-neutral-700 leading-relaxed mb-8 px-4 max-w-3xl">
  <strong className="text-neutral-900">
    Просыпайтесь с рассветом и засыпайте в мягком вечернем свете.
  </strong>
  <br /><br />
  Искусственное окно наполняет комнату естественным сиянием, меняя оттенок света в течение дня —
  от бодрящего утреннего до тёплого вечернего.
  <br /><br />
  Когда вы уходите, оно бережно гаснет само.  
  Уют, спокойствие и ритм живого солнца — прямо у вас дома.
  <br /><br />
  Идеально для <strong>спальни, гостиной и детской</strong> —
    там, где важны уют, мягкий свет и естественный ритм дня.
</p>



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

  {/* ===== ОФИС ===== */}
  <div className="max-w-7xl mx-auto mb-24">
    <h3 className="text-2xl font-bold text-amber-600 mb-4 px-4">💼 Офисы</h3>
    <p className="text-lg text-neutral-700 leading-relaxed mb-8 px-4 max-w-3xl">
  <strong className="text-neutral-900">
    Искусственное окно делает офис светлее, продуктивнее и комфортнее.
  </strong>
  <br /><br />
  Свет без мерцания и бликов снижает усталость глаз и снимает ощущение замкнутого пространства.
      В переговорных, open space и домашних кабинетах появляется ощущение естественного дня.
  <br /><br />
  Естественный свет — даже без окон: устройства устанавливаются вдоль рабочих зон, создавая эффект настоящих окон.
  <br /><br />
  Свет живёт по графику дня: утром — бодрящий холодный, вечером — тёплый расслабляющий.  
    Контроллер автоматически регулирует цветовую температуру и яркость.
    <br /><br />
    <strong>Результат - </strong>команда работает дольше без усталости, а пространство выглядит современно и живо.
</p>

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
  <div className="max-w-7xl mx-auto">
    <h3 className="text-2xl font-bold text-amber-600 mb-4 px-4">
      🎓 Образовательные учреждения
    </h3>
    <p className="text-lg text-neutral-700 leading-relaxed mb-8 px-4 max-w-3xl">
  <strong className="text-neutral-900">
    Искусственное окно создаёт здоровую световую среду для обучения и отдыха.
  </strong>
  <br /><br />
  В детских садах, школах и университетах оно помогает сохранять концентрацию днём  
    и плавно снижает активность к вечеру. Безопасный спектр без синего пика  
    бережно защищает зрение детей и поддерживает естественные биоритмы.
  <br /><br />
  <strong>Результат —</strong> комфортное пространство, где детям легче учиться,  
    меньше устают глаза и сохраняется гармоничный ритм дня.
</p>

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
  image: string;
}

function FlipCard({ title, frontNote, backText, image }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-72 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Передняя сторона */}
        <div className="absolute inset-0 bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between items-center backface-hidden">
          <img src={image} alt={title} className="w-30 h-30 object-contain mb-4 opacity-90" />
          <h3 className="text-xl font-bold text-amber-600 mb-2">{title}</h3>
          <p className="text-sm text-neutral-500 border-t border-amber-100 pt-3 text-center">
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
    </div>
  );
}
