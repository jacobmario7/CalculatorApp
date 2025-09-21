"use client";
import { useState } from "react";
import styles from "./Calculator.module.css";

export default function Calculator() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("0");

  const buttons: string[][] = [
    ["C", "(", ")", "÷"],
    ["%", "√", "x²", "×"],
    ["7", "8", "9", "−"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="], 
    ["0", ".", "⌫"],
  ];

  const handleClick = (val: string) => {
    if (val === "" || val === undefined) return;

    if (val === "C") {
      setInput("");
      setResult("0");
    } else if (val === "=") {
      try {
        const exp = input
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-")
          .replace(/√/g, "Math.sqrt");
        const evalResult = eval(exp);
        setResult(evalResult.toString());
      } catch {
        setResult("Error");
      }
    } else if (val === "⌫") {
      setInput(input.slice(0, -1));
    } else if (val === "x²") {
      if (input) {
        try {
          const evalResult = Math.pow(eval(input), 2);
          setResult(evalResult.toString());
        } catch {
          setResult("Error");
        }
      }
    } else {
      setInput(input + val);
    }
  };

  const isOperator = (val: string) =>
    ["÷", "×", "+", "−"].includes(val);

  const isSpecial = (val: string) =>
    ["%", "√", "x²","(",")"].includes(val);

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.calculator}>
        <div className={styles.header}>
          <h2>Calculator</h2>
          <button
            className={styles.toggle}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className={styles.display}>
          <div className={styles.input}>{input || "0"}</div>
          <div className={styles.result}>= {result}</div>
        </div>

        <div className={styles.buttons}>
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              className={`${styles.btn} 
                ${btn === "=" ? styles.equal : ""} 
                ${btn === "C" ? styles.clear : ""} 
                ${isOperator(btn) ? styles.operator : ""} 
                ${isSpecial(btn) ? styles.special : ""}`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
