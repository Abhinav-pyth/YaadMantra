"use client";

import { Icon } from "@/components/Icon";
import styles from "@/components/components.module.css";
import type { QuizQuestion } from "@/utils/quiz";

type QuizCardProps = {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
};

export function QuizCard({ question, selectedAnswer, onSelect }: QuizCardProps) {
  return (
    <section aria-labelledby="quiz-question" className={styles.quizCard}>
      <p className={styles.cardMeta}>
        <span>{question.mnemonic.category}</span>
        <span>{question.mnemonic.difficulty}</span>
      </p>
      <h2 id="quiz-question">{question.prompt}</h2>
      <p className={styles.quizMnemonic}>{question.mnemonic.mnemonic}</p>

      <div className={styles.optionGrid}>
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = selectedAnswer !== null && option === question.answer;
          const isWrong = isSelected && option !== question.answer;

          return (
            <button
              className={`${styles.optionButton} ${isCorrect ? styles.optionCorrect : ""} ${isWrong ? styles.optionWrong : ""}`}
              disabled={selectedAnswer !== null}
              key={option}
              onClick={() => onSelect(option)}
              type="button"
            >
              <span>{option}</span>
              {isCorrect ? <Icon name="check" /> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
