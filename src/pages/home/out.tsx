import {FC} from "react";

export const HomeNotLoggedIn: FC = () => {

  return (
    <div className={'grow flex flex-row flex-wrap items-center '}>
      <div className={"grow flex justify-center"}>
        <img className={'w-[300px]'} src={'https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?t=st=1718921633~exp=1718925233~hmac=edb308fc5f07fe21fe2704b94916f9ad423e2117a1638f83b7a53fc430a42d67&w=1060'} alt={'Twitter Logo'}/>
      </div>
      <div className={'grow p-3'}>
        <div>
          <div className={'flex flex-col'}>
            <div className={'text-center'}>
              <a className={'btn mb-3 w-52 bg-[#13132e] shadow btn-lg'} href={'/auth/signup'}>Create account</a>
            </div>
            <div className={'text-center'}>
              <a className={'btn mb-3 w-52 bg-[#13132e] shadow btn-lg'} href={'/auth/login'}>Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
