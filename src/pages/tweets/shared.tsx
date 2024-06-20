import {ITweetProps, Tweet} from "../../components/tweet.tsx";

interface TweetData {
  data: any[]
}

export const SharedTweets = ({data}: TweetData) => {

  return (
    <div>
      {data.map(({by, created_at, id, text}: ITweetProps) => {
        return (
          <div className={'mb-3'} key={`tweet-${id}`}>
            <Tweet {...{by, created_at, id, text}}/>
          </div>
        );
      })}
    </div>
  );
};
