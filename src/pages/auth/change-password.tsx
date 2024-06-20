import {FormEvent} from "react";
import toast from "react-hot-toast";
import {API_SERVER_URL} from "../../../utils";
import {useAuth} from "../../hooks/AuthProvider.tsx";

export const ChangePassword = ({setLoading, setIsOpen, logout}: any) => {
  const auth = useAuth() as any;

  const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    const newPassword = form.get('new-password')
    const confirmPassword = form.get('confirm-password');

    if (newPassword === confirmPassword) {
      setLoading(true);
      const response = await fetch(`${API_SERVER_URL}/api/v1/person/${auth?.user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword
        }),
      });
      const res = await response.json();
      if(res.date_joined){
        toast.success('Password updated successfully. You will need to login again');
        setIsOpen(false);
        setTimeout(() => {
          logout(false);
          setLoading(false);
        }, 3000);
      }
      setLoading(false);
      console.log(res);
    } else {
      toast.error('Passwords not matched');
      return;
    }
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-full rounded-[12px] bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"> {/**/}
          {/*<a href={'/'}>
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.reshot.com/preview-assets/icons/NSM87GDYZ2/twitch-NSM87GDYZ2.svg"
            alt="Your Company"
          />
        </a>*/}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>
        {/**/}
        <div
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-2 md:p-4 2xl:p-4 3xl:p-4 bg-[#ffffff] rounded-xl shadow-xl-">
          <form className="space-y-6" action="#" method="POST"
                onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
            {/*<div>
              <label htmlFor="old-password" className="block text-sm font-medium leading-6 text-gray-900">
                Old Password
              </label>
              <div className="mt-2">
                <input
                  id="old-password"
                  name="old-password"
                  type="password"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>*/}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
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
                Update Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not changing it now?{' '}
            <a href="/" onClick={(event) => {
              setIsOpen(false);
              event.preventDefault();
            }} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Cancel
            </a>
          </p>
        </div>
      </div>
    </div>

  );
};
