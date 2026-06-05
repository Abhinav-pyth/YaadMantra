"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { MnemonicCard } from "@/components/MnemonicCard";
import { showToast } from "@/components/Toast";
import { categories, categoryNames } from "@/data/categories";
import { useCustomMnemonics } from "@/hooks/useCustomMnemonics";
import { generateWithAi } from "@/utils/ai";
import { explanationToText, generateMnemonicSuggestions, textToExplanation } from "@/utils/mnemonicGenerator";
import styles from "@/app/pages.module.css";
import type { CategoryName, CustomMnemonic, Difficulty, GeneratedSuggestion } from "@/types/mnemonic";

type FormState = {
  title: string;
  mnemonic: string;
  explanationText: string;
  category: CategoryName;
  difficulty: Difficulty;
  keywords: string;
};

const emptyForm: FormState = {
  title: "",
  mnemonic: "",
  explanationText: "",
  category: "Geography",
  difficulty: "Easy",
  keywords: ""
};

export function CreateClient() {
  const { customMnemonics, addCustomMnemonic, updateCustomMnemonic, deleteCustomMnemonic, isReady } = useCustomMnemonics();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generatorInput, setGeneratorInput] = useState("Bangladesh, Afghanistan, China, Pakistan, Nepal, Myanmar, Bhutan");
  const [suggestions, setSuggestions] = useState<GeneratedSuggestion[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<CustomMnemonic | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const isValid = useMemo(
    () => form.title.trim() && form.mnemonic.trim() && textToExplanation(form.explanationText).length > 0,
    [form]
  );

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      showToast({ title: "Missing details", message: "Title, mnemonic और explanation भरें।", type: "warning" });
      return;
    }

    const input = {
      title: form.title.trim(),
      mnemonic: form.mnemonic.trim(),
      explanation: textToExplanation(form.explanationText),
      category: form.category,
      difficulty: form.difficulty,
      keywords: form.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    };

    if (editingId) {
      updateCustomMnemonic(editingId, input);
      showToast({ title: "Updated", message: "आपका mnemonic save हो गया।", type: "success" });
    } else {
      addCustomMnemonic(input);
      showToast({ title: "Created", message: "Custom mnemonic localStorage में सेव हुआ।", type: "success" });
    }

    resetForm();
  }

  function startEdit(mnemonic: CustomMnemonic) {
    setEditingId(mnemonic.id);
    setForm({
      title: mnemonic.title,
      mnemonic: mnemonic.mnemonic,
      explanationText: explanationToText(mnemonic.explanation),
      category: mnemonic.category,
      difficulty: mnemonic.difficulty,
      keywords: mnemonic.keywords.join(", ")
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function generateSuggestions() {
    const words = generatorInput.split(",").map(w => w.trim()).filter(Boolean);
    if (words.length < 2) {
      showToast({ title: "Need more words", message: "कम से कम दो words डालें।", type: "warning" });
      return;
    }

    setIsGenerating(true);
    try {
      const nextSuggestions = await generateWithAi(words);
      setSuggestions(nextSuggestions);
      showToast({ title: "Generated", message: "AI ने mnemonics बना दिए हैं!", type: "success" });
    } catch (error) {
      console.error(error);
      // Fallback to local generator if API fails
      const nextSuggestions = generateMnemonicSuggestions(generatorInput);
      setSuggestions(nextSuggestions);
      showToast({ title: "Fallback", message: "AI fail हुआ, local generator use किया।", type: "info" });
    } finally {
      setIsGenerating(false);
    }
  }

  function useSuggestion(suggestion: GeneratedSuggestion) {
    setForm((current) => ({
      ...current,
      mnemonic: suggestion.sentence,
      explanationText: explanationToText(suggestion.explanation)
    }));
  }

  function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    deleteCustomMnemonic(deleteTarget.id);
    setDeleteTarget(null);
    if (editingId === deleteTarget.id) {
      resetForm();
    }
    showToast({ title: "Deleted", message: "Custom mnemonic हटा दिया गया।", type: "info" });
  }

  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHero}>
        <p className={styles.overline}>Create Your Own</p>
        <h1>अपना mnemonic बनाएं, edit करें, save करें</h1>
        <p>Custom mnemonics सिर्फ आपके browser localStorage में रहते हैं। कोई backend, account या paid API नहीं।</p>
      </header>

      <section className={styles.createLayout}>
        <form className={styles.formPanel} onSubmit={handleSubmit}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.overline}>{editingId ? "Editing" : "New mnemonic"}</p>
              <h2>{editingId ? "Saved मंत्र update करें" : "Mnemonic details"}</h2>
            </div>
          </div>

          <label>
            <span>Title</span>
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} />
          </label>

          <label>
            <span>Mnemonic sentence</span>
            <textarea lang="hi" value={form.mnemonic} onChange={(event) => updateField("mnemonic", event.target.value)} />
          </label>

          <label>
            <span>Explanation lines</span>
            <textarea
              placeholder={"ब = बांग्लादेश\nअ = अफ़गानिस्तान"}
              value={form.explanationText}
              onChange={(event) => updateField("explanationText", event.target.value)}
            />
          </label>

          <div className={styles.formGrid}>
            <label>
              <span>Category</span>
              <select value={form.category} onChange={(event) => updateField("category", event.target.value as CategoryName)}>
                {categoryNames.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Difficulty</span>
              <select value={form.difficulty} onChange={(event) => updateField("difficulty", event.target.value as Difficulty)}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>
          </div>

          <label>
            <span>Keywords</span>
            <input
              placeholder="map, polity, java..."
              value={form.keywords}
              onChange={(event) => updateField("keywords", event.target.value)}
            />
          </label>

          <div className={styles.formActions}>
            <button className="buttonPrimary" disabled={!isValid} type="submit">
              <Icon name={editingId ? "check" : "plus"} /> {editingId ? "Update" : "Save"}
            </button>
            {editingId ? (
              <button className="buttonSecondary" onClick={resetForm} type="button">
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <aside className={styles.generatorBox}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.overline}>AI Generator</p>
              <h2>Minimax M3 Helper</h2>
            </div>
          </div>
          <label>
            <span>Words</span>
            <textarea value={generatorInput} onChange={(event) => setGeneratorInput(event.target.value)} />
          </label>
          <button className="buttonPrimary" onClick={generateSuggestions} type="button" disabled={isGenerating}>
            <Icon name="sparkles" /> {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
          <div className={styles.suggestionStack}>
            {isGenerating ? (
              <div className={styles.skeletonGrid}>
                <span style={{ height: "40px" }} />
                <span style={{ height: "40px" }} />
              </div>
            ) : (
              suggestions.map((suggestion) => (
                <button key={suggestion.id} onClick={() => useSuggestion(suggestion)} type="button">
                  {suggestion.sentence}
                </button>
              ))
            )}
          </div>
        </aside>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.overline}>Local Library</p>
            <h2>आपके custom mnemonics</h2>
          </div>
          <span>{customMnemonics.length} saved</span>
        </div>

        {!isReady ? (
          <div className={styles.skeletonGrid} aria-label="Loading custom mnemonics">
            <span />
            <span />
          </div>
        ) : customMnemonics.length ? (
          <div className={styles.cardGrid}>
            {customMnemonics.map((mnemonic) => (
              <div className={styles.editableCard} key={mnemonic.id}>
                <MnemonicCard mnemonic={mnemonic} />
                <div className={styles.editableActions}>
                  <button className="buttonSecondary" onClick={() => startEdit(mnemonic)} type="button">
                    <Icon name="edit" /> Edit
                  </button>
                  <button className={styles.dangerButton} onClick={() => setDeleteTarget(mnemonic)} type="button">
                    <Icon name="trash" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyLine}>अभी कोई custom mnemonic save नहीं है।</p>
        )}
      </section>

      <Modal isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete mnemonic?">
        <p className={styles.modalText}>{deleteTarget?.title} हटाने के बाद वापस नहीं आएगा।</p>
        <div className={styles.formActions}>
          <button className={styles.dangerButton} onClick={confirmDelete} type="button">
            Delete
          </button>
          <button className="buttonSecondary" onClick={() => setDeleteTarget(null)} type="button">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
�� के बाद वापस नहीं आएगा।</p>
        <div className={styles.formActions}>
          <button className={styles.dangerButton} onClick={confirmDelete} type="button">
            Delete
          </button>
          <button className="buttonSecondary" onClick={() => setDeleteTarget(null)} type="button">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
