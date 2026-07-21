import { useState } from 'react';
import type { FormEvent } from 'react';
import { useActivityTracker } from './hooks/useActivityTracker';
import { ActivityTrackerView } from './ActivityTrackerView';

export function ActivityTrackerContainer() {
  const {
    weeklyMinutes,
    strengthSessions,
    compliance,
    streak,
    meetsModerate,
    meetsStrength,
    weeklyGoal,
    addEntry,
  } = useActivityTracker();

  const [minutes, setMinutes] = useState('');
  const [sessions, setSessions] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mm = Number(minutes) || 0;
    const ss = Number(sessions) || 0;
    if (mm > 0 || ss > 0) {
      addEntry({ moderateMinutes: mm, strengthSessions: ss });
      setMinutes('');
      setSessions('');
    }
  };

  return (
    <ActivityTrackerView
      weeklyMinutes={weeklyMinutes}
      strengthSessions={strengthSessions}
      compliance={compliance}
      streak={streak}
      meetsModerate={meetsModerate}
      meetsStrength={meetsStrength}
      weeklyGoal={weeklyGoal}
      minutes={minutes}
      sessions={sessions}
      onMinutesChange={setMinutes}
      onSessionsChange={setSessions}
      onSubmit={handleSubmit}
    />
  );
}
