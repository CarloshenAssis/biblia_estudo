import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { daysSince, MISSION_TEMPLATES, TOTAL_BOOKS } from '../lib/missions';
import { BOOK_BY_VALUE } from '../lib/books';
import { BookIcon } from './Icons';
import homeStyles from '../pages/HomePage.module.css';
import headerStyles from './Header.module.css';

function ChapterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M4 4v16l6-4 6 4V4z" />
    </svg>
  );
}

function DaysIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function ReadingMissionCard() {
  const { activeMission, startMission, pauseOrResumeMission, restartMission, showToast } = useApp();
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  if (!activeMission) {
    return (
      <div className={homeStyles.noMissionCard}>
        <div className={homeStyles.missionProgressTitle}>Nenhuma missão de leitura ativa</div>
        <p className={homeStyles.noMissionBody}>
          Missões são opcionais — marque capítulos como concluídos durante a leitura pra acompanhar seu progresso pela Bíblia.
        </p>
        <button className={homeStyles.startMissionBtn} onClick={() => setPickerOpen(true)}>
          Começar uma missão
        </button>

        {pickerOpen && (
          <>
            <button className={headerStyles.backdrop} aria-label="Fechar" onClick={() => setPickerOpen(false)} />
            <div className={headerStyles.sheet}>
              <div className={headerStyles.sheetHandle} />
              <div className={homeStyles.sheetTitle}>Escolha uma missão</div>
              <div className={homeStyles.templateList}>
                {MISSION_TEMPLATES.map((name) => (
                  <button
                    key={name}
                    className={headerStyles.sheetRow}
                    onClick={() => {
                      startMission(name);
                      setPickerOpen(false);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  const percent = activeMission.progress;
  const days = daysSince(activeMission.startDate);
  const ctaLabel = activeMission.paused ? 'Retomar missão' : 'Continuar a missão';

  const lastRead = activeMission.readHistory[0] ?? null;

  const handleContinue = () => {
    if (lastRead) {
      showToast('Continuando a missão de onde você parou');
      const slug = BOOK_BY_VALUE.get(lastRead.book)?.slug ?? lastRead.book.toLowerCase();
      navigate(`/${slug}/${lastRead.chapter}/${lastRead.verse}`);
    } else {
      navigate('/joao/3/16');
    }
  };

  return (
    <div className={homeStyles.missionCard}>
      <div className={homeStyles.missionTopRow}>
        <div
          className={homeStyles.progressRingOuter}
          style={{ background: `conic-gradient(var(--accent) ${percent * 3.6}deg, var(--border) 0deg)` }}
        >
          <div className={homeStyles.progressRingInner}>{percent}%</div>
        </div>
        <div className={homeStyles.missionProgressCol}>
          <div className={homeStyles.missionProgressTitle}>Progresso geral</div>
          <div className={homeStyles.missionProgressSub}>
            {activeMission.finishedBooks.length} livros completos de {TOTAL_BOOKS}
          </div>
        </div>
      </div>

      {activeMission.paused && <div className={homeStyles.pausedTag}>Missão pausada</div>}

      {lastRead && (
        <div className={homeStyles.missionLastReadRow}>
          Você parou em <strong>{lastRead.ref}</strong>
        </div>
      )}

      <div className={homeStyles.missionStatsRow}>
        <div className={homeStyles.statBlock}>
          <BookIcon size={16} />
          <span className={homeStyles.statNum}>{activeMission.finishedBooks.length}</span>
          <span className={homeStyles.statLabel}>Livros concluídos</span>
        </div>
        <div className={homeStyles.statBlock}>
          <ChapterIcon />
          <span className={homeStyles.statNum}>{activeMission.finishedChapters.length}</span>
          <span className={homeStyles.statLabel}>Capítulos concluídos</span>
        </div>
        <div className={homeStyles.statBlock}>
          <DaysIcon />
          <span className={homeStyles.statNum}>{days}</span>
          <span className={homeStyles.statLabel}>Dias desde o início</span>
        </div>
      </div>

      <button className={homeStyles.missionCta} onClick={handleContinue}>
        {ctaLabel} ›
      </button>
      <div className={homeStyles.missionMetaRow}>
        <button className={homeStyles.missionLink} onClick={() => navigate('/missao')}>
          Ver progresso detalhado
        </button>
        <div className={homeStyles.missionControlsRow}>
          <button className={homeStyles.missionSmallLink} onClick={pauseOrResumeMission}>
            {activeMission.paused ? 'Retomar' : 'Pausar'}
          </button>
          <button className={homeStyles.missionSmallLink} onClick={restartMission}>
            Reiniciar
          </button>
          <button className={homeStyles.missionSmallLink} onClick={() => setPickerOpen(true)}>
            Nova missão
          </button>
        </div>
      </div>

      {pickerOpen && (
        <>
          <button className={headerStyles.backdrop} aria-label="Fechar" onClick={() => setPickerOpen(false)} />
          <div className={headerStyles.sheet}>
            <div className={headerStyles.sheetHandle} />
            <div className={homeStyles.sheetTitle}>Escolha uma nova missão</div>
            <div className={homeStyles.templateList}>
              {MISSION_TEMPLATES.map((name) => (
                <button
                  key={name}
                  className={headerStyles.sheetRow}
                  onClick={() => {
                    startMission(name);
                    setPickerOpen(false);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
