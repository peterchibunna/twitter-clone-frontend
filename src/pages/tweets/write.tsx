import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {addTweet} from "../../store/postsSlice.tsx";
import toast from "react-hot-toast";
import {API_SERVER_URL} from "../../../utils";
import {useAuth} from "../../hooks/AuthProvider.tsx";

export function WriteTweet({isLoading, setLoading, setIsOpen}: any) {
  const dispatch = useAppDispatch();
  const [tweet, setTweet] = useState('');
  const auth = useAuth() as any;

  const postTweet = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_SERVER_URL}/api/v1/tweet/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: tweet,
          by: `/api/v1/person/${auth?.user?.id}/`,
          // shared_with: [`/api/v1/person/${auth?.user?.id}/`], // todo:
          shared_with: [], // todo:
        }),
      });
      const res = await response.json();
      if (res.id) {
        setTimeout(() => {
          setLoading(false);
          setIsOpen(false);
          setTweet('');
          (document.querySelector('#tweet-container') as HTMLTextAreaElement).value = "";
          toast.success('Tweet Posted!');
          dispatch(addTweet([res]));
        }, 20);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong. Please try again later');
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full rounded-[12px] bg-white">
        <textarea
          onInput={(event) => {
            setTweet(event.currentTarget.value);
          }}
          id={'tweet-container'}
          className="h-36 p-3 outline-none border-gray-300 w-full resize-none border rounded-lg"
          placeholder="Write your tweet here"></textarea>
        <div className="flex justify-between mt-2 text-xs">{tweet.length} character{tweet.length != 1 && 's'}</div>
        <div className="flex justify-between mt-2">
          <p className="italic font-bold text-amber-700">Sharing Options [choose users: work in progress]</p>
          <button
            onClick={postTweet}
            disabled={tweet.length <= 1}
            className={`btn text-sm`}>
            Post Tweet
          </button>
        </div>
      </div>
    </div>
  );

}
