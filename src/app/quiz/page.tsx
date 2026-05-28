import type { Metadata } from "next";
import { QuizClient } from "@/app/quiz/QuizClient";
import { starterMnemonics } from "@/utils/data";

export const metadata: Metadata = {
  title: "Quiz Mode",
  description: "Practice Hindi mnemonics with timed MCQ quizzes and local score tracking."
};

export default function QuizPage() {
  return <QuizClient starterMnemonics={starterMnemonics} />;
}
