import {FC} from "react";

export const HomeNotLoggedIn: FC = () => {

  return (
    <div className={'grow flex flex-row flex-wrap items-center'}>
      <div className={"grow flex justify-center"}>
        <svg className={"w-100"} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
          <path fillRule="evenodd"
                clipRule="evenodd" fill="#6441A4"
                d="M28 30V18a2 2 0 1 1 4 0v12a2 2 0 1 1-4 0zm16 0V18a2 2 0 1 1 4 0v12a2 2 0 1 1-4 0zm18.356 11.644-1.782 1.782-.007-.008a2 2 0 0 1-2.837-2.816l-.01-.01 2.28-2.28V5.001A1 1 0 0 0 59.001 4H16.999A1 1 0 0 0 16 5.001v38a1 1 0 0 0 .999.999h8A3 3 0 0 1 28 47.001v1.375l2.744-2.744a5.961 5.961 0 0 1 4.1-1.632H49.75A4.25 4.25 0 0 1 54 48.25a4.237 4.237 0 0 1-1.222 2.972l-3.353 3.353A4.982 4.982 0 0 1 45.937 56H34l-6.577 6.577A4.98 4.98 0 0 1 23.937 64H20a4 4 0 0 1-4-4v-2.999A1 1 0 0 0 14.999 56h-6A4.998 4.998 0 0 1 4 51.001V18a2 2 0 1 1 4 0v33.001a1 1 0 0 0 .999.999h6A4.998 4.998 0 0 1 20 57.001v1.998A1 1 0 0 0 20.999 60h3.313l6.577-6.577A4.985 4.985 0 0 1 34.376 52h11.937l4-4H34l-5.236 5.236a2.822 2.822 0 0 1-1.928.764A2.838 2.838 0 0 1 24 51.164V48h-7.001A4.998 4.998 0 0 1 12 43.001v-38A4.998 4.998 0 0 1 16.999 0H59.001A4.998 4.998 0 0 1 64 5.001v32.531a5.967 5.967 0 0 1-1.644 4.112zM8 12a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 12z"/>
        </svg>
      </div>
      <div className={'grow p-3'}>
        <div>
          <div className={'flex flex-col'}>
            <div className={'text-center'}>
              <a className={'btn mb-3 w-52'} href={'/auth/signup'}>Create account</a>
            </div>
            <div className={'text-center'}>
              <a className={'btn mb-3 w-52'} href={'/auth/login'}>Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}