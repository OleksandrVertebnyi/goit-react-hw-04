import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) {
            toast.error('Введіть текст для пошуку зображень');
            return;
        }
        onSubmit(trimmed);
    };

    return (
        <header className={styles.SearchBar}>
            <form className={styles.SearchForm} onSubmit={handleChange}>
                
                    <button className={styles.button} type="submit" aria-label="Search">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7" stroke="#616265ff" strokeWidth="2" fill="none"/>
          <line x1="17.5" y1="17.5" x2="21" y2="21" stroke="#616265ff" strokeWidth="2" />
        </svg>
      </button>
                <input
                    className={styles.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </header>
    );
}