"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { QuizCard } from "@/components/QuizCard";
import { showToast } from "@/components/Toast";
import { useCustomMnemonics } from "@/hooks/useCustomMnemonics";
import { useLocalStorageState } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/utils/storage";
import { buildQuizQuestions, type QuizQuestion } from "@/utils/quiz";
import styles from "@/app/pages.module.css";
import type { Mnemonic } from "@/types/mnemonic";

const quizSize = 8;
const questionSeconds = 30;

export function QuizClient({ starterMnemonics }: { starterMnemonics: Mnemonic[] }) {
  const { customMnemonics } = useCustomMnemonics();
  const allMnemonics = useMemo(() => [...starterMnemonics, ...customMnemonics], [customMnemonics, starterMnemonics]);
  const [bestScore, setBestScore] = useLocalStorageState<number>(STORAGE_KEYS.quizBest, 0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(questionSeconds);
  const [completed, setCompleted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length ? (completed ? 100 : Math.round(((currentIndex + 1) / questions.length) * 100)) : 0;

  useEffect(() => {
    if (initialized) {
      return;
    }

    setQuestions(buildQuizQuestions(allMnemonics, quizSize));
    setInitialized(true);
  }, [allMnemonics, initialized]);

  useEffect(() => {
    if (completed || selectedAnswer || !currentQuestion) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          moveNext(false);
          return questionSeconds;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [completed, currentQuestion, selectedAnswer]);

  function startNewQuiz() {
    setQuestions(buildQuizQuestions(allMnemonics, quizSize));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setSecondsLeft(questionSeconds);
    setCompleted(false);
  }

  function moveNext(answeredCorrectly: boolean) {
    if (answeredCorrectly) {
      setScore((currentScore) => currentScore + 1);
    }

    window.setTimeout(() => {
      if (currentIndex >= questions.length - 1) {
        const finalScore = score + (answeredCorrectly ? 1 : 0);
        setBestScore((currentBest) => Math.max(currentBest, finalScore));
        setCompleted(true);
        showToast({ title: "Quiz complete", message: `Score: ${finalScore}/${questions.length}`, type: "success" });
        return;
      }

      setCurrentIndex((index) => index + 1);
      setSelectedAnswer(null);
      setSecondsLeft(questionSeconds);
    }, selectedAnswer ? 750 : 0);
  }

  function handleSelect(answer: string) {
    setSelectedAnswer(answer);
    moveNext(answer === currentQuestion.answer);
  }

  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHero}>
        <p className={styles.overline}>Quiz Mode</p>
        <h1>Mnemonic recall को timer के साथ test करें</h1>
        <p>हर round में random MCQs आते हैं और best score localStorage में save होता है।</p>
      </header>

      <section className={styles.quizShell}>
        <div className={styles.quizTopbar}>
          <span>
            <Icon name="timer" /> {secondsLeft}s
          </span>
          <span>
            <Icon name="trophy" /> {score}/{questions.length}
          </span>
          <span>Best {bestScore}</span>
        </div>
        <div className={styles.progressTrack} aria-label={`Progress ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>

        {!questions.length ? (
          <div className={styles.skeletonGrid} aria-label="Loading quiz">
            <span />
          </div>
        ) : completed ? (
          <div className={styles.centeredState}>
            <Icon name="trophy" />
            <h2>Score {score}/{questions.length}</h2>
            <p>{score >= questions.length * 0.75 ? "मस्त recall!" : "अगला round और तेज होगा।"}</p>
            <button className="buttonPrimary" onClick={startNewQuiz} type="button">
              New quiz
            </button>
          </div>
        ) : currentQuestion ? (
          <QuizCard question={currentQuestion} selectedAnswer={selectedAnswer} onSelect={handleSelect} />
        ) : null}
      </section>
    </div>
  );
}
