import AsyncStorage from '@react-native-async-storage/async-storage';
import {Course, Letter, Word} from '@src/constants/Types';
import x from '@src/constants/x';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

interface States {
  bears: number;
  increase: (by: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  font: string;
  setFont: (font: string) => void;
  letters: Letter[];
  setLetters: (letters: Letter[]) => void;
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  pdfMode: number;
  setPdfMode: (mode: number) => void;
  words: Word[];
  setWords: (words: Word[]) => void;
}

const useCaches = create<States>()(
  devtools(
    persist(
      set => ({
        bears: 0,
        increase: by => set(state => ({bears: state.bears + by})),
        theme: '#987123',
        setTheme: theme => set({theme}),
        font: x.Fonts.NotoSerifJP,
        setFont: font => set({font}),
        letters: [],
        setLetters: letters => set({letters}),
        courses: [],
        setCourses: courses => set({courses}),
        pdfMode: 0,
        setPdfMode: pdfMode => set({pdfMode}),
        words: [],
        setWords: words => set({words}),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          theme: state.theme,
          font: state.font,
          letters: state.letters,
          courses: state.courses,
          pdfMode: state.pdfMode,
          words: state.words,
        }),
      },
    ),
  ),
);

export {useCaches};
