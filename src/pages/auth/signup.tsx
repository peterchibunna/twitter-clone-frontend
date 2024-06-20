import {FC, FormEvent, useState} from "react";
import {ErrorDisplay} from "../../components/error.tsx";
import LoadingOverlay from "react-loading-overlay-ts";
import {useAuth} from "../../hooks/AuthProvider";

export const Signup: FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth() as any;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email');
    const password = form.get('password') as string;

    const names = name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).slice(-names.length).join(' ');

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    setIsLoading(true);
    try {
      const a = await auth.registerAction({
        first_name: firstName,
        last_name: lastName,
        password,
        email,
        username: email
      });
      setError(a.message);
    } catch (exception) {
      console.error(exception);
    } finally {
      setIsLoading(false);
    }
  }

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
            Sign up to start tweeting
          </h2>
        </div>

        <div
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-2 md:p-4 2xl:p-4 3xl:p-4 bg-[#ffffff] rounded-xl shadow-xl">
          <form className="space-y-6" action="." method="POST"
                onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
            {error != "" && (
              <ErrorDisplay errorText={error}/>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
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
                {/*<div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>*/}
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
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already registered?{' '}
            <a href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in to your account
            </a>
          </p>
        </div>
      </div>
    </LoadingOverlay>
  );
};
