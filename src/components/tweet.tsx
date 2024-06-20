import React, {MouseEvent} from 'react';
import moment from 'moment';

export interface ITweetProps {
  by: any,
  created_at: string,
  id: number,
  text: string,
  shared_with?: any,
}

export const Tweet = ({by, created_at, id, text}: ITweetProps) => {
  return (
    <div className="max-w-lg mx-auto border px-6 py-4 rounded-lg shadow bg-white">
      <div className="flex items-center mb-6">
        <img src="https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png" alt="Avatar" className="w-12 h-12 rounded-full mr-4"/>
        <div>
          <div className="text-sm font-medium text-gray-800">{by.full_name}</div>
          <div className="text-xs text-gray-500">{moment(created_at).calendar()}</div>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-6">
        {text}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" onClick={(event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
             className="text-gray-500 hover:text-gray-700 mr-4 flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
            </svg>
            <span>Like</span>
          </a>
          <a href="#" onClick={(event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
             className="text-gray-500 hover:text-gray-700"><i className="far fa-comment-alt"></i> Reply</a>
        </div>
        <div className="flex items-center">
          <a href="#" onClick={(event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
             className="text-gray-500 hover:text-gray-700 flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"/>
            </svg>
            <span>Share</span>
          </a>
        </div>
      </div>
    </div>
  )
}
