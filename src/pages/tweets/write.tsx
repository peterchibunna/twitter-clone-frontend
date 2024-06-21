import {useState} from "react";
import {useAppDispatch} from "../../store";
import {addTweet} from "../../store/postsSlice.tsx";
import toast from "react-hot-toast";
import {API_SERVER_URL, fetcher} from "../../../utils";
import {useAuth} from "../../hooks/AuthProvider.tsx";
import useSWR from "swr";


function getSelectValues(select: HTMLSelectElement) {
  const result = [];
  const options = select && select.options;
  let opt;

  for (let i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

export function WriteTweet({setLoading, setIsOpen}: any) {
  const dispatch = useAppDispatch();
  const [tweet, setTweet] = useState('');
  const {
    data: otherUsers,
    // isLoading: usersLoading,
    // error,
    // mutate
  } = useSWR(`${API_SERVER_URL}/api/v1/person/`, fetcher, {
    keepPreviousData: true,
  });
  const auth = useAuth() as any;

  const postTweet = async () => {
    const sharedWithIds = getSelectValues(document.querySelector('#shared_with_ids') as HTMLSelectElement);
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
          shared_with: sharedWithIds.map((item: string) => {
            return `/api/v1/person/${item}/`
          }),
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
        <div className="flex justify-between mt-2 items-center">
          <p className="italic text-gray-600 mb-0 items-center flex">
            <span>Share with others: </span>
            <select
              size={1}
              className={'ml-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300' +
                ' placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}
              multiple={true} id={'shared_with_ids'}>
              {otherUsers?.objects?.map((user: any) => {
                  if (user.id !== auth?.user?.id) {
                    return (
                      <option key={user.username} value={user.id}>{user.username}</option>
                    );
                  }
                }
              )}
            </select>
          </p>
          <button
            onClick={postTweet}
            disabled={tweet.length <= 1}
            className={`btn text-sm`}>
            Post Tweet
          </button>
        </div>
        <div className={'block text-xs'}>Hold down control to select/deselect items</div>
      </div>
    </div>
  );

}
