import React, {FC, MouseEvent, useEffect, useState} from "react";
import Modal from 'react-modal';
import {PersonalTweets} from "../tweets/personal.tsx";
import {SharedTweets} from "../tweets/shared.tsx";
import {WriteTweet} from "../tweets/write";
import {fetchTweets, modalStyles} from "../../../utils";
import {useAppDispatch, useAppSelector} from "../../store";
import LoadingOverlay from "react-loading-overlay-ts";
import {useAuth} from "../../hooks/AuthProvider.tsx";
import {resetTweets} from "../../store/postsSlice.tsx";

Modal.setAppElement('#root');

export const HomeLoggedIn: FC = () => {
  const dispatch = useAppDispatch();
  const tweets = useAppSelector((state) => state.tweets.tweetsState);

  const [activeTab, setActiveTab] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const openModal = (): void => {
    setIsOpen(true);
  }

  const afterOpenModal = (): void => {
  }

  const closeModal = (): void => {
    setIsOpen(false);
  }

  const auth = useAuth() as any;
  const prevTweets = useAppSelector((state) => state.tweets.tweetsState);

  useEffect(() => {
    if(auth?.user?.id) {
      fetchTweets(auth?.user?.id).then(data => {
        if (data.objects.length > 0) {
          dispatch(resetTweets(data.objects));
        }
      });
    }

  }, [auth?.user, dispatch]);

  return (
    <>
      <LoadingOverlay
        active={isLoading}
        spinner
        styles={{
          "overlay": {
            zIndex: 9800,
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'flex',
            top: '0px',
            left: '0px',
            backgroundColor: 'rgba(0,0,0,.85)',
            color: '#fff'
          },
        }}
        text='Please wait...'>
        <div className="flex flex-row flex-wrap justify-evenly tweets-tab">
          <button
            type={"button"} className={`grow ${activeTab == 0 ? " active" : ""}`}
            onClick={() => setActiveTab(0)}>My Tweets
          </button>
          <button
            type={"button"} className={`grow ${activeTab == 1 ? " active" : ""}`}
            onClick={() => setActiveTab(1)}>Shared With Me
          </button>
        </div>

        <div className="grow my-4 mt-[100px]">
          {activeTab === 0 && (
            <div className="flex flex-col justify-between mt-10">
              <PersonalTweets data={prevTweets.filter(tweet => tweet.by.id === auth?.user?.id)} />
            </div>
          )}
          {activeTab === 1 && (
            <div className="flex flex-col justify-between mt-10">
              <SharedTweets data={prevTweets.filter(tweet => {
                const sharedIds = tweet.shared_with.map((i: any)=>i.id);
                return sharedIds.includes( auth?.user?.id);
              })}/>
            </div>
          )}
        </div>

        <a href={'/tweets/write'} className={'floating--button'} onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          openModal();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor"
               className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/>
          </svg>
        </a>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className={"white-popup"}
          style={modalStyles}
          contentLabel="New Tweet Modal">
          <WriteTweet setLoading={setIsLoading} setIsOpen={setIsOpen} />
        </Modal>
      </LoadingOverlay>

    </>
  )
}
