import toast from "react-hot-toast";

export const API_SERVER_URL: string = 'https://twitter-clone-backend-edju.onrender.com';
// export const API_SERVER_URL = 'http://localhost:8000';

export const fetchTweets = async (userId: string) => {
  const response = await fetch(`${API_SERVER_URL}/api/v1/tweet/?for_user=${userId}`, {
    method: 'GET'
  });
  return await response.json();
}
export const modalStyles: { content: any, overlay: any } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    inset: '1px',
    backgroundColor: 'rgba(23,22,22,0.65)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px',
    borderRadius: '5px',
    inset: ''
  }
};

export const uniqBy = (arr: any[], predicate: string | number) => {
  const cb = typeof predicate === 'function' ? predicate : (o: { [x: string]: any; }) => o[predicate];

  return [...arr.reduce((map, item) => {
    const key = (item === null || item === undefined) ?
      item : cb(item);

    map.has(key) || map.set(key, item);

    return map;
  }, new Map()).values()];
};

export const sendTweetEmailNotification = (data: any[]) => {
  data.forEach((item) => {
    const sender = item.by.username;
    toast.success(`New Tweet Posted by ${sender}. This is an [emulated] email`);
  });
}
export const fetcher = (url: string, token: string) => fetch(url).then(r => r.json())
