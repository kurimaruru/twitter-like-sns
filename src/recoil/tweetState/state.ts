import { atom } from 'recoil';
import { tweetDataType } from './types';
import { recoilKeyHashSet } from '../recoilKeys';

export const TweetListAtom = atom<tweetDataType[]>({
  key: recoilKeyHashSet.tweetList,
  default: [],
});
