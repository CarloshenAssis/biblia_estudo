import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BOOKS, BOOK_BY_SLUG } from '../lib/books';
import { fetchApNotes, fetchChapterVerses } from '../lib/supabase';
import type { ApNote, CommentTab, Verse } from '../types';
import { useApp } from '../lib/AppContext';
import { StarIcon, ShareIcon } from '../components/Icons';
import styles from './ReadingView.module.css';

export function ReadingView() {
  const { bookSlug, chapter: chapterParam, verse: verseParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, toggleFavorite, addHistory, showToast } = useApp();

  const book = bookSlug ? BOOK_BY_SLUG.get(bookSlug) : undefined;
  const chapter = Math.max(1, parseInt(chapterParam ?? '1', 10) || 1);
  const selectedVerseNum = Math.max(1, parseInt(verseParam ?? '1', 10) || 1);

  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [apNotes, setApNotes] = useState<ApNote[]>([]);
  const [commentTab, setCommentTab] = useState<CommentTab>(
    (location.state as { commentTab?: CommentTab } | null)?.commentTab ?? 'expositor'
  );
  const [singleVerseMode, setSingleVerseMode] = useState(false);

  useEffect(() => {
    if (!book) return;
    let cancelled = false;
    setLoading(true);
    fetchChapterVerses(book.value, chapter).then((rows) => {
      if (cancelled) return;
      setChapterVerses(rows);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [book, chapter]);

  const selectedVerse = useMemo(
    () => chapterVerses.find((v) => v.verse === selectedVerseNum) ?? null,
    [chapterVerses, selectedVerseNum]
  );

  useEffect(() => {
    if (!book) return;
    fetchApNotes(book.value, chapter, selectedVerseNum).then(setApNotes);
  }, [book, chapter, selectedVerseNum]);

  useEffect(() => {
    if (selectedVerse) addHistory(selectedVerse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVerse?.id]);

  const goTo = useCallback(
    (slug: string, ch: number, vs: number, replace = false) => {
      navigate(`/${slug}/${ch}/${vs}`, { replace });
    },
    [navigate]
  );

  const selectVerse = (n: number) => {
    if (!book) return;
    goTo(book.slug, chapter, n, true);
  };

  const bookIndex = book ? BOOKS.findIndex((b) => b.value === book.value) : -1;

  const prevChapter = () => {
    if (!book) return;
    if (chapter > 1) {
      goTo(book.slug, chapter - 1, 1);
    } else if (bookIndex > 0) {
      const prevBook = BOOKS[bookIndex - 1];
      goTo(prevBook.slug, prevBook.chapters, 1);
    }
  };

  const nextChapter = () => {
    if (!book) return;
    if (chapter < book.chapters) {
      goTo(book.slug, chapter + 1, 1);
    } else if (bookIndex >= 0 && bookIndex < BOOKS.length - 1) {
      const nextBook = BOOKS[bookIndex + 1];
      goTo(nextBook.slug, 1, 1);
    }
  };

  const noPrev = !book || (chapter <= 1 && bookIndex <= 0);
  const noNext = !book || (chapter >= book.chapters && bookIndex >= BOOKS.length - 1);

  const isFav = selectedVerse ? favorites.some((f) => f.ref === `${book?.label} ${chapter}:${selectedVerseNum}`) : false;

  const handleShare = async () => {
    if (!book || !selectedVerse) return;
    const full = `${book.label} ${chapter}:${selectedVerseNum} — ${selectedVerse.text}`;
    try {
      await navigator.clipboard.writeText(full);
      showToast('Referência copiada');
    } catch {
      showToast('Não foi possível copiar');
    }
  };

  if (!book) {
    return (
      <div className={styles.grid}>
        <div className={styles.readingCol}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>✎</div>
            <div className={styles.emptyTitle}>Referência não encontrada</div>
            <div className={styles.emptyBody}>Escolha um livro no menu de navegação bíblica.</div>
          </div>
        </div>
      </div>
    );
  }

  const total = chapterVerses.length;
  const verseRangeLabel = loading
    ? 'Carregando…'
    : total === 0
      ? 'Capítulo indisponível'
      : singleVerseMode
        ? `Mostrando somente o versículo ${selectedVerseNum} de ${total}`
        : `Mostrando versículos 1–${total} de ${total}`;

  const displayVerses = singleVerseMode ? chapterVerses.filter((v) => v.verse === selectedVerseNum) : chapterVerses;

  const expositorText = selectedVerse?.comment?.trim() ?? '';
  const aplicacaoNotes = apNotes;

  return (
    <div className={styles.grid}>
      <div className={styles.readingCol}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.chapterTitle}>
              {book.label} {chapter}
            </h1>
            <div className={styles.chapterMeta}>{verseRangeLabel}</div>
          </div>
          <div className={styles.verseActions}>
            <button
              className={`${styles.singleVerseToggle} ${singleVerseMode ? styles.active : ''}`}
              onClick={() => setSingleVerseMode((v) => !v)}
            >
              {singleVerseMode ? 'Ver capítulo inteiro' : 'Ver somente este versículo'}
            </button>
            <button
              className={`${styles.roundIconBtn} ${isFav ? styles.accent : ''}`}
              onClick={() => selectedVerse && toggleFavorite(selectedVerse)}
              title="Favoritar versículo"
              aria-pressed={isFav}
            >
              <StarIcon size={17} filled={isFav} />
            </button>
            <button className={styles.roundIconBtn} onClick={handleShare} title="Compartilhar">
              <ShareIcon size={17} />
            </button>
          </div>
        </div>

        {loading && (
          <div className={styles.skeletonWrap}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.skeletonRow} />
            ))}
          </div>
        )}

        {!loading && total === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>✎</div>
            <div className={styles.emptyTitle}>Este capítulo ainda não está disponível</div>
            <div className={styles.emptyBody}>Verifique a referência ou escolha outro capítulo no menu de navegação.</div>
          </div>
        )}

        {!loading && total > 0 && (
          <>
            <div className={styles.verseList}>
              {displayVerses.map((v) => {
                const selected = v.verse === selectedVerseNum;
                const isDropCap = v.verse === 1;
                return (
                  <button key={v.id} className={`${styles.verseRow} ${selected ? styles.selected : ''}`} onClick={() => selectVerse(v.verse)}>
                    <span className={styles.verseNum}>{v.verse}</span>
                    {isDropCap ? (
                      <p className={styles.verseText}>
                        <span className={styles.dropCap}>{v.text.charAt(0)}</span>
                        {v.text.slice(1)}
                      </p>
                    ) : (
                      <p className={styles.verseText}>{v.text}</p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className={styles.chapterNavRow}>
              <button className={styles.navBtn} onClick={prevChapter} disabled={noPrev}>
                ← Capítulo anterior
              </button>
              <button className={styles.navBtn} onClick={nextChapter} disabled={noNext}>
                Próximo capítulo →
              </button>
            </div>
          </>
        )}
      </div>

      <div className={styles.commentsCol}>
        <div className={styles.tabRow}>
          <button className={`${styles.tabBtn} ${commentTab === 'expositor' ? styles.active : ''}`} onClick={() => setCommentTab('expositor')}>
            Expositor
          </button>
          <button className={`${styles.tabBtn} ${commentTab === 'aplicacao' ? styles.active : ''}`} onClick={() => setCommentTab('aplicacao')}>
            Aplicação Pessoal
          </button>
        </div>

        {commentTab === 'expositor' && (
          <div className={styles.commentBody}>
            {expositorText ? (
              <div className={styles.commentCard}>
                <p className={styles.commentText}>{expositorText}</p>
              </div>
            ) : (
              <div className={styles.emptyComment}>Nenhum comentário do Expositor para este versículo — selecione outro versículo em destaque.</div>
            )}
          </div>
        )}

        {commentTab === 'aplicacao' && (
          <div className={styles.commentBody}>
            {aplicacaoNotes.length > 0 ? (
              aplicacaoNotes.map((n) => {
                const spansMulti = n.chapter_start !== n.chapter_end || n.verse_start !== n.verse_end;
                const rangeLabel =
                  n.chapter_start === n.chapter_end
                    ? `Aplica-se a ${book.label} ${n.chapter_start}:${n.verse_start}–${n.verse_end}`
                    : `Aplica-se a ${book.label} ${n.chapter_start}:${n.verse_start}–${n.chapter_end}:${n.verse_end}`;
                return (
                  <div key={n.id} className={styles.commentCard}>
                    {spansMulti && <div className={styles.rangeTag}>{rangeLabel}</div>}
                    <p className={styles.commentText}>{n.comment}</p>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyComment}>Nenhum comentário de Aplicação Pessoal para este trecho.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
