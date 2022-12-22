import { atom } from 'recoil';
import { recoilKeyHashSet } from '../recoilKeys';

export const IsPostingAtom = atom<boolean>({
  key: recoilKeyHashSet.tweetList,
  default: false,
});
