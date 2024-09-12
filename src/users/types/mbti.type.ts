export enum MBTI {
  ENTP = 'ENTP',
  ENFP = 'ENFP',
  ESTP = 'ESTP',
  ESTJ = 'ESTJ',
  ENFJ = 'ENFJ',
  ESFP = 'ESFP',
  ENTJ = 'ENTJ',
  ESFJ = 'ESFJ',
  INTP = 'INTP',
  INFP = 'INFP',
  ISTP = 'ISTP',
  ISTJ = 'ISTJ',
  INFJ = 'INFJ',
  ISFP = 'ISFP',
  ISFJ = 'ISFJ',
  INTJ = 'INTJ',
}

type MbtiDescription = {
  [key in MBTI]: {
    title: string;
    description: string;
  };
};

export const MbtiResponse: MbtiDescription = {
  [MBTI.ENFJ]: { title: 'ENFJ 타이틀', description: 'ENFJ 설명' },
  [MBTI.ENTP]: { title: 'ENTP 타이틀', description: 'ENTP 설명' },
  [MBTI.ENFP]: { title: 'ENFP 타이틀', description: 'ENFP 설명' },
  [MBTI.ESTP]: { title: 'ESTP 타이틀', description: 'ESTP 설명' },
  [MBTI.ESTJ]: { title: 'ESTJ 타이틀', description: 'ESTJ 설명' },
  [MBTI.ESFP]: { title: 'ESFP 타이틀', description: 'ESFP 설명' },
  [MBTI.ENTJ]: { title: 'ENTJ 타이틀', description: 'ENTJ 설명' },
  [MBTI.ESFJ]: { title: 'ESFJ 타이틀', description: 'ESFJ 설명' },
  [MBTI.INTP]: { title: 'INTP 타이틀', description: 'INTP 설명' },
  [MBTI.INFP]: { title: 'INFP 타이틀', description: 'INFP 설명' },
  [MBTI.ISTP]: { title: 'ISTP 타이틀', description: 'ISTP 설명' },
  [MBTI.ISTJ]: { title: 'ISTJ 타이틀', description: 'ISTJ 설명' },
  [MBTI.INFJ]: { title: 'INFJ 타이틀', description: 'INFJ 설명' },
  [MBTI.ISFP]: { title: 'ISFP 타이틀', description: 'ISFP 설명' },
  [MBTI.ISFJ]: { title: 'ISFJ 타이틀', description: 'ISFJ 설명' },
  [MBTI.INTJ]: { title: 'INTJ 타이틀', description: 'INTJ 설명' },
};
