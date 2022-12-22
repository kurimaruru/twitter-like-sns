import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { tweetDataType } from '../recoil/tweetState/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as WebSocket from 'websocket';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import AWS from 'aws-sdk';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
type CreateTweetProps = {
  socket: WebSocket.w3cwebsocket;
  userId: string;
};
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: '90%',
  left: '80%',
  right: 0,
});
export const CreateTweet = ({ socket, userId }: CreateTweetProps) => {
  const S3_BUCKET = process.env.REACT_APP_BUCKETNAME;
  const REGION = process.env.REACT_APP_REGION;
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });
  const navigate = useNavigate();
  const [binary, setBinay] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [image, setImage] = useState<Blob | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<tweetDataType>();
  // プレビュー表示
  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0) {
      return;
    }
    if (!event.target.files?.[0].type.match('image.*')) {
      return;
    }
    setImage(event.target.files?.[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setBinay(e.target?.result);
    };
    console.log('preview');
    reader.readAsDataURL(event.target?.files[0]);
  };
  const handleSubmitAction: SubmitHandler<tweetDataType> = async (tweet) => {
    const uuid = uuidv4();
    const reader = new FileReader();
    if (image !== undefined) {
      console.log(image);
      reader.readAsArrayBuffer(image);
      reader.onloadend = () => {
        const binaryData = reader.result;
        const params = {
          ACL: 'public-read',
          Body: binaryData!,
          Bucket: S3_BUCKET!,
          Key: `${uuid}.jpg`,
        };
        const res = myBucket
          .putObject(params)
          .on('httpUploadProgress', (evt) => {
            console.log(evt.loaded);
          })
          .send((err) => {
            if (err) console.log(err);
            const getUrlParam = {
              Bucket: S3_BUCKET!,
              Key: `${uuid}.jpg`,
              Expires: 86400, // URLの有効期限(秒)
            };
            const imageUrl = myBucket.getSignedUrl('getObject', getUrlParam);
            socket.send(
              JSON.stringify({
                action: 'crud',
                data: {
                  OperationType: 'PUT',
                  keys: {
                    partitionKey: uuid,
                  },
                  columns: {
                    header: {
                      user_name: 'testUser',
                      subheader: DateTime.now().toFormat('yyyy-MM-dd HH:mm'),
                    },
                    content: {
                      message: tweet.content.message,
                      imgName: `${uuid}.jpg`,
                      imgUrl: imageUrl,
                    },
                    action: {
                      good: 0,
                      bad: 0,
                    },
                    user_id: 'testUser',
                  },
                },
              })
            );
          });
        console.log('responce = ', res);
      };
    }

    // S3にアップロードされた画像のURLを取得し、APIを呼び出してDBに保存する

    navigate('/tweets');
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    let len = watch('content.message').length;
    if (len === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('content.message')]);

  // var reader = new FileReader();

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <Grid container mt={1}>
          <Grid item xs={3}>
            <Link to={'/tweets'} style={{ textDecoration: 'none' }}>
              <Button variant='text'>キャンセル</Button>
            </Link>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <Button
              variant='contained'
              type='submit'
              style={{ borderRadius: '20px' }}
              disabled={disable}
            >
              投稿する
            </Button>
          </Grid>
        </Grid>
        <Avatar src='images/cat.jpg' style={{ marginLeft: '3px' }} />
        <TextareaAutosize
          maxRows={4}
          placeholder='いまどうしてる？'
          style={{
            width: '100%',
            height: '20vh',
            outline: 'none',
            border: 'none',
            fontSize: '15pt',
          }}
          {...register('content.message', { required: true })}
        />
        {errors.content && <span>This field is required</span>}
        {!!binary && (
          <img
            src={`${binary}`}
            alt='B64image'
            style={{ width: '100%', height: '40vh', objectFit: 'contain' }}
          />
        )}
        <label htmlFor='image'>
          <StyledFab color='primary' aria-label='add'>
            <span>
              <input
                type='file'
                style={{
                  opacity: 0,
                }}
                id='image'
                onChange={onChangeFileInput}
              />
              <AddPhotoAlternateIcon style={{ marginBottom: '20px' }} />
            </span>
          </StyledFab>
        </label>
      </form>
    </>
  );
};
