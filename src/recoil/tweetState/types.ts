export type tweetDataType = {
  id: string;
  header: {
    user_name: string;
    subheader: string;
  };
  content: {
    message: string;
    imgName: string;
    imgUrl: string | undefined;
  };
  action: {
    good: number;
    bad: number;
  };
  user_id: string;
};
