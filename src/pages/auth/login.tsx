import {FC, FormEvent, useState} from "react";
import {useAuth} from "../../hooks/AuthProvider";
import {ErrorDisplay} from "../../components/error.tsx";
import LoadingOverlay from "react-loading-overlay-ts";

export const Login: FC = () => {
  const auth = useAuth() as any;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const formData: FormData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email !== "" && password !== "") {
      setIsLoading(true);
      const a = await auth.loginAction({email, password});
      setError(a.message);
      setIsLoading(false);
      return;
    } else {
      setError("Username and password are required");
    }
  }
  // return (
  //   <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
  //     <div className="flex flex-row gap-3 pb-4">
  //       <div>
  //         <img src="/favicon.svg" width="50" alt="Logo"/>
  //       </div>
  //       <h1 className="text-xl  text-[#4B5563] text-[#4B5563] my-auto">Your Company</h1>
  //
  //     </div>
  //     <div className="text-sm font-light text-[#6B7280] pb-8 ">Login to your account on Your Company.</div>
  //     <form className="flex flex-col">
  //       <div className="pb-2">
  //         <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
  //         <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span>
  //           <input type="email" name="email" id="email" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="name@company.com" autoComplete="off"/>
  //         </div>
  //       </div>
  //       <div className="pb-6">
  //         <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
  //         <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M12 8v8"></path><path d="m8.5 14 7-4"></path><path d="m8.5 10 7 4"></path></svg></span>
  //           <input type="password" name="password" id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list"/>
  //         </div>
  //       </div>
  //       <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Login</button>
  //       <div className="text-sm font-light text-[#6B7280] text-center">Don't have an accout yet? <a href="#" className="font-medium text-[#4F46E5] hover:underline">Sign Up</a>
  //
  //       </div>
  //     </form>
  //     <div className="relative flex py-8 items-center">
  //       <div className="flex-grow border-t border-[1px] border-gray-200"></div> <span className="flex-shrink mx-4 font-medium text-gray-500">OR</span>
  //       <div className="flex-grow border-t border-[1px] border-gray-200"></div>
  //     </div>
  //     <form>
  //       <div className="flex flex-row gap-2 justify-center">
  //         <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
  //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
  //             <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
  //             <path d="M9 18c-4.51 2-5-2-7-2"></path>
  //           </svg> <span className="font-medium mx-auto">Github</span>
  //
  //         </button>
  //         <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
  //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
  //             <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  //           </svg> <span className="font-medium mx-auto">Twitter</span>
  //
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href={'/'}>
            <img
              className="mx-auto h-10 w-auto"
              src="https://www.reshot.com/preview-assets/icons/NSM87GDYZ2/twitch-NSM87GDYZ2.svg"
              alt="Your Company"
            />
          </a>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-2 md:p-4 2xl:p-4 3xl:p-4 bg-[#ffffff] rounded-xl shadow-xl">
          <form
            className="space-y-6" action="#" method="POST"
            onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
            {error != "" && (
              <ErrorDisplay errorText={error}/>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No account yet?{' '}
            <a href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </LoadingOverlay>
  );
};
