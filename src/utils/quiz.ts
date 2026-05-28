import type { Mnemonic } from "@/types/mnemonic";

export type QuizQuestion = {
  id: string;
  prompt: string;
  answer: string;
  options: string[];
  mnemonic: Mnemonic;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function buildQuizQuestions(mnemonics: Mnemonic[], count = 8): QuizQuestion[] {
  const eligible = mnemonics.filter((mnemonic) => mnemonic.explanation.length >= 2);
  const values = eligible.flatMap((mnemonic) => mnemonic.explanation.map((item) => item.value));

  return shuffle(eligible)
    .slice(0, count)
    .map((mnemonic) => {
      const answerItem = shuffle(mnemonic.explanation)[0];
      const wrongOptions = shuffle(values.filter((value) => value !== answerItem.value)).slice(0, 3);

      return {
        id: `${mnemonic.id}-${answerItem.key}`,
        prompt: `"${mnemonic.mnemonic}" में "${answerItem.key}" किसके लिए है?`,
        answer: answerItem.value,
        options: shuffle([answerItem.value, ...wrongOptions]),
        mnemonic
      };
    });
}
