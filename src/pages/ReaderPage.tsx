import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BOOKS, BOOK_BY_SLUG, BOOK_BY_VALUE } from '../lib/books';
import { fetchAdjacentVerse, fetchApNotes, fetchChapterVerses } from '../lib/supabase';
import type { ApNote, CommentTab, Verse } from '../types';
import { useApp } from '../lib/AppContext';
import { Header } from '../components/Header';
import { ShareIcon } from '../components/Icons';
import styles from './ReaderPage.module.css';

const TRUNCATE_LEN = 220;

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  );
}

function ListenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
      <path d="M16 8a5 5 0 0 1 0 8" />
    </svg>
  );
}

export function ReaderPage() {
  const { bookSlug, chapter: chapterParam, verse: verseParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, toggleFavorite, addHistory, markMissionRead, showToast, activeMission, toggleChapterFinished, isChapterMarked } =
    useApp();

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
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [prevVerse, setPrevVerse] = useState<Verse | null>(null);
  const [nextVerse, setNextVerse] = useState<Verse | null>(null);

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
    if (selectedVerse) {
      addHistory(selectedVerse);
      markMissionRead(selectedVerse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVerse?.id]);

  useEffect(() => {
    setExpandedIds(new Set());
  }, [selectedVerse?.id, commentTab]);

  useEffect(() => {
    if (!book) return;
    let cancelled = false;
    fetchAdjacentVerse(book.bookOrder, chapter, selectedVerseNum, 'prev').then((v) => {
      if (!cancelled) setPrevVerse(v);
    });
    fetchAdjacentVerse(book.bookOrder, chapter, selectedVerseNum, 'next').then((v) => {
      if (!cancelled) setNextVerse(v);
    });
    return () => {
      cancelled = true;
    };
  }, [book, chapter, selectedVerseNum]);

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

  const goToVerseObj = (v: Verse | null) => {
    if (!v) return;
    const slug = BOOK_BY_VALUE.get(v.book)?.slug;
    if (!slug) return;
    goTo(slug, v.chapter, v.verse);
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

  const noPrevChapter = !book || (chapter <= 1 && bookIndex <= 0);
  const noNextChapter = !book || (chapter >= book.chapters && bookIndex >= BOOKS.length - 1);

  const isFav = selectedVerse ? favorites.some((f) => f.ref === `${book?.label} ${chapter}:${selectedVerseNum}`) : false;
  const chapterMarked = book ? isChapterMarked(book.value, chapter) : false;

  const handleShare = async () => {
    if (!book || !selectedVerse) return;
    const full = `${book.label} ${chapter}:${selectedVerseNum} — ${selectedVerse.text}`;
    if (navigator.share) {
      try {
        await navigator.share({ text: full });
      } catch {
        /* usuário cancelou */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(full);
      showToast('Referência copiada');
    } catch {
      showToast('Não foi possível compartilhar');
    }
  };

  const handleCopy = async () => {
    if (!book || !selectedVerse) return;
    const full = `${book.label} ${chapter}:${selectedVerseNum} — ${selectedVerse.text}`;
    try {
      await navigator.clipboard.writeText(full);
      showToast('Versículo copiado');
    } catch {
      showToast('Não foi possível copiar');
    }
  };

  const handleListen = () => showToast('Áudio em breve');

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderComment = (id: string, text: string) => {
    const isExpanded = expandedIds.has(id);
    const isLong = text.length > TRUNCATE_LEN;
    const shown = isLong && !isExpanded ? `${text.slice(0, TRUNCATE_LEN).trimEnd()}…` : text;
    return (
      <>
        <p className={styles.commentText}>{shown}</p>
        {isLong && (
          <button className={styles.verMais} onClick={() => toggleExpand(id)}>
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </>
    );
  };

  if (!book) {
    return (
      <>
        <Header variant="simple" simpleTitle="Leitura" />
        <div className={styles.wrap}>
          <div className={styles.mainCol}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✎</div>
              <div className={styles.emptyTitle}>Referência não encontrada</div>
              <div className={styles.emptyBody}>Escolha um livro no menu de navegação bíblica.</div>
            </div>
          </div>
        </div>
      </>
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

  return (
    <>
      <Header
        variant="reading"
        readingCrumb={{ book: book.label, chapter, verseLabel: `Vers. ${selectedVerseNum}` }}
        currentFavorite={isFav}
        onToggleFavorite={() => selectedVerse && toggleFavorite(selectedVerse)}
      />
      <div className={styles.wrap}>
        <div className={styles.mainCol}>
          <div className={styles.chapterNavRow}>
            <button className={styles.chapterNavBtn} onClick={prevChapter} disabled={noPrevChapter} aria-label="Capítulo anterior">
              ‹
            </button>
            <div className={styles.chapterNavLabel}>
              {book.label} {chapter}
            </div>
            <button className={styles.chapterNavBtn} onClick={nextChapter} disabled={noNextChapter} aria-label="Próximo capítulo">
              ›
            </button>
          </div>

          <button
            className={`${styles.singleVerseToggle} ${singleVerseMode ? styles.active : ''}`}
            onClick={() => setSingleVerseMode((v) => !v)}
          >
            {singleVerseMode ? 'Ver capítulo inteiro' : 'Ver somente este versículo'}
          </button>

          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.chapterTitle}>
                {book.label} {chapter}
              </h1>
              <div className={styles.chapterMeta}>{verseRangeLabel}</div>
            </div>
            <div className={styles.verseActions}>
              <button
                className={`${styles.singleVerseToggleWide} ${singleVerseMode ? styles.active : ''}`}
                onClick={() => setSingleVerseMode((v) => !v)}
              >
                {singleVerseMode ? 'Ver capítulo inteiro' : 'Somente este versículo'}
              </button>
              <button className={styles.favVerseBtn} onClick={handleShare} title="Compartilhar">
                <ShareIcon size={16} />
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
              {displayVerses.map((v) => {
                const selected = v.verse === selectedVerseNum;
                const isDropCap = v.verse === 1;
                return (
                  <div key={v.id} className={styles.verseCard}>
                    <button
                      className={`${styles.verseRow} ${selected ? styles.selected : ''}`}
                      onClick={() => selectVerse(v.verse)}
                    >
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
                  </div>
                );
              })}

              <div className={styles.verseNavRow}>
                <button className={styles.verseNavBtn} onClick={() => goToVerseObj(prevVerse)} disabled={!prevVerse}>
                  ◂ Versículo anterior
                </button>
                <button className={styles.verseNavBtn} onClick={() => goToVerseObj(nextVerse)} disabled={!nextVerse}>
                  Próximo versículo ▸
                </button>
              </div>

              <div className={styles.verseActionsRow}>
                <button className={styles.actionIconBtn} onClick={handleShare} title="Compartilhar">
                  <ShareIcon size={16} />
                </button>
                <button className={styles.actionIconBtn} onClick={handleCopy} title="Copiar">
                  <CopyIcon />
                </button>
                <button className={styles.actionIconBtn} onClick={handleListen} title="Ouvir">
                  <ListenIcon />
                </button>
              </div>

              {activeMission && (
                <div className={styles.missionRow}>
                  <span className={styles.missionRowLabel}>
                    {chapterMarked ? 'Capítulo concluído na sua missão' : `Marcar ${book.label} ${chapter} como concluído`}
                  </span>
                  <button
                    className={`${styles.missionRowBtn} ${chapterMarked ? styles.done : ''}`}
                    onClick={() => toggleChapterFinished(book.value, chapter)}
                  >
                    {chapterMarked ? 'Concluído ✓' : 'Marcar'}
                  </button>
                </div>
              )}

              <div className={styles.verseFooterNav}>
                <button className={styles.arrowBtn} onClick={prevChapter} disabled={noPrevChapter} aria-label="Capítulo anterior">
                  ‹
                </button>
                <span className={styles.verseFooterLabel}>{verseRangeLabel}</span>
                <button className={styles.arrowBtn} onClick={nextChapter} disabled={noNextChapter} aria-label="Próximo capítulo">
                  ›
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
                <div className={styles.commentCard}>{renderComment('expositor', expositorText)}</div>
              ) : (
                <div className={styles.emptyComment}>
                  Nenhum comentário do Expositor para este versículo — selecione outro versículo em destaque.
                </div>
              )}
            </div>
          )}

          {commentTab === 'aplicacao' && (
            <div className={styles.commentBody}>
              {apNotes.length > 0 ? (
                apNotes.map((n) => {
                  const spansMulti = n.chapter_start !== n.chapter_end || n.verse_start !== n.verse_end;
                  const rangeLabel =
                    n.chapter_start === n.chapter_end
                      ? `Aplica-se a ${book.label} ${n.chapter_start}:${n.verse_start}–${n.verse_end}`
                      : `Aplica-se a ${book.label} ${n.chapter_start}:${n.verse_start}–${n.chapter_end}:${n.verse_end}`;
                  return (
                    <div key={n.id} className={styles.commentCard}>
                      {spansMulti && <div className={styles.rangeTag}>{rangeLabel}</div>}
                      {renderComment(`ap-${n.id}`, n.comment)}
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
    </>
  );
}
