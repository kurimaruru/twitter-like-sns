import { atom } from 'recoil';
import { ChatAtomType } from './types';
import { recoilKeyHashSet } from '../recoilKeys';

export const ChatAtom = atom<ChatAtomType[]>({
  key: recoilKeyHashSet.chatList,
  default: [],
});
