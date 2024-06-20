import {FC, useEffect} from "react";
import {ITweetProps, Tweet} from "../../components/tweet.tsx";
import {fetchTweets} from "../../../utils";
import {useAuth} from "../../hooks/AuthProvider.tsx";
import {useAppDispatch, useAppSelector} from "../../store";
import {resetTweets} from "../../store/postsSlice.tsx";

interface TweetData {
  data: any[]
}

export const PersonalTweets = ({data}: TweetData) => {

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
