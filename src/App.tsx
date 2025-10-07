import React from "react";
import Landing from "./Landing";
import "./index.css"; // убедись, что стили Tailwind подключены

export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Проверочная полоса — Tailwind работает */}
      <div className="h-1 bg-amber-400" />
      <Landing />
    </main>
  );
}
