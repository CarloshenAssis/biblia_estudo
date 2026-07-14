import { useState } from 'react';
import { Header } from '../components/Header';
import { MissionHistory } from '../components/MissionHistory';
import { useApp } from '../lib/AppContext';
import { daysSince, MISSION_TEMPLATES, TOTAL_BOOKS, TOTAL_CHAPTERS } from '../lib/missions';
import headerStyles from '../components/Header.module.css';
import homeStyles from './HomePage.module.css';
import styles from './MissionsPage.module.css';

export function MissionsPage() {
  const { missions, activeMission, startMission, pauseOrResumeMission, restartMission } = useApp();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <Header variant="simple" simpleTitle="Missão de leitura" />
      <div className={styles.wrap}>
        {!activeMission && (
          <div className={homeStyles.noMissionCard}>
            <div className={homeStyles.missionProgressTitle}>Nenhuma missão de leitura ativa</div>
            <p className={homeStyles.noMissionBody}>
              Missões são opcionais — comece uma para acompanhar seu progresso pela Bíblia, capítulo a capítulo.
            </p>
            <button className={homeStyles.startMissionBtn} onClick={() => setPickerOpen(true)}>
              Começar uma missão
            </button>
          </div>
        )}

        {activeMission && (
          <>
            <div className={homeStyles.missionCard}>
              <div className={homeStyles.missionTopRow}>
                <div
                  className={homeStyles.progressRingOuter}
                  style={{ background: `conic-gradient(var(--accent) ${activeMission.progress * 3.6}deg, var(--border) 0deg)` }}
                >
                  <div className={homeStyles.progressRingInner}>{activeMission.progress}%</div>
                </div>
                <div className={homeStyles.missionProgressCol}>
                  <div className={homeStyles.missionProgressTitle}>{activeMission.title}</div>
                  <div className={homeStyles.missionProgressSub}>
                    Iniciada em {new Date(activeMission.startDate).toLocaleDateString('pt-BR')} · {daysSince(activeMission.startDate)} dias atrás
                  </div>
                </div>
              </div>

              {activeMission.paused && <div className={homeStyles.pausedTag}>Missão pausada</div>}

              <div className={homeStyles.missionStatsRow}>
                <div className={homeStyles.statBlock}>
                  <span className={homeStyles.statNum}>{activeMission.finishedBooks.length}</span>
                  <span className={homeStyles.statLabel}>de {TOTAL_BOOKS} livros</span>
                </div>
                <div className={homeStyles.statBlock}>
                  <span className={homeStyles.statNum}>{activeMission.finishedChapters.length}</span>
                  <span className={homeStyles.statLabel}>de {TOTAL_CHAPTERS} capítulos</span>
                </div>
              </div>

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

            <MissionHistory mission={activeMission} />
          </>
        )}

        {missions.length > 0 && (
          <>
            <div className={styles.sectionLabel}>Todas as missões</div>
            <div className={styles.missionListAll}>
              {missions.map((m) => (
                <div key={m.id} className={styles.missionListRow}>
                  <span>{m.title}</span>
                  <span className={styles.missionListMeta}>
                    {m.progress}% · {m.paused ? 'pausada' : 'ativa'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

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
    </>
  );
}
