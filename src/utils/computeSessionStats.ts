interface ResponseRow {
    session_code: string;
    student_id: string;
    strand: number;
    level: number;
  }
  
  interface SessionStats {
    joined: number;
    completed: number;
    percentComplete: number;
  }
  
  export function computeSessionStats(responses: ResponseRow[]): SessionStats {
    const studentStrands: Record<string, number[]> = {};
  
    for (const response of responses) {
      if (!studentStrands[response.student_id]) {
        studentStrands[response.student_id] = [];
      }
      studentStrands[response.student_id].push(response.level);
    }
  
    const joined = Object.keys(studentStrands).length;
  
    const completed = Object.values(studentStrands).filter((levels) => {
      const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
      return levels.length >= 3 || avg >= 3;
    }).length;
  
    const percentComplete = joined === 0 ? 0 : Math.round((completed / joined) * 100);
  
    return { joined, completed, percentComplete };
  }
  