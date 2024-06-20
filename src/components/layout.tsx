import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import React, {FC, JSX, useState} from "react";
import {useAuth} from "../hooks/AuthProvider.tsx";
import {modalStyles} from "../../utils";
import Modal from "react-modal";
import {ChangePassword} from "../pages/auth/change-password.tsx";
import LoadingOverlay from "react-loading-overlay-ts";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Layout: FC<{ children: JSX.Element | JSX.Element[] }> = ({children}) => {
  const auth = useAuth() as any;
  const isLoggedIn = auth?.user != null;
  const [isLoading, setIsLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (): void => {
    setIsOpen(true);
  }

  const afterOpenModal = (): void => {
  }

  const closeModal = (): void => {
    setIsOpen(false);
  }

  const user = {
    name: auth?.user?.full_name || 'Tom Cook',
    email: auth?.user?.email || 'tom@example.com',
    imageUrl:
      'https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png',
  }
  const navigation: { name: string, href: string, current: boolean }[] = [
    {name: 'Tweets Demo App', href: '/', current: true},
  ]
  const userNavigation = [
    {
      name: 'Change Password', href: '#', onClick: () => {
        openModal();
      }
    },
    {
      name: 'Sign out', href: '#', onClick: () => {
        logout(true);
      }
    },
  ]


  const logout = (askConfirm: boolean) => {
    if (askConfirm && window.confirm("Are you sure you want to logout?")) {
      auth.logOut();
    } else if(!askConfirm){
      auth.logOut();
    }
  }

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      styles={{
        "wrapper":{
          height: '100vh',
        },
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
      <>

        {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
        <div className="min-h-full flex flex-col grow">
          <Disclosure as="nav" className="bg-white shadow fixed w-full z-10">
            {({open}) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src="https://www.reshot.com/preview-assets/icons/NSM87GDYZ2/twitch-NSM87GDYZ2.svg"
                          alt="Logo"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {isLoggedIn && (
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <MenuButton
                                className="p-1.5 relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2- focus:ring-offset-gray-800">
                                <span className="absolute inset-1.5-"/>
                                <div className={'px-2'}>{user.email}</div>
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt=""/>
                              </MenuButton>
                            </div>
                            <Transition
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <MenuItems
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <MenuItem key={item.name}>
                                    {({focus}) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          focus ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700',
                                        )}
                                        onClick={(event) => {
                                          item.onClick && item.onClick();
                                          // event.preventDefault();
                                        }}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </MenuItem>
                                ))}
                              </MenuItems>
                            </Transition>
                          </Menu>
                        )}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      <DisclosureButton
                        className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5"/>
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                        )}
                      </DisclosureButton>
                    </div>
                  </div>
                </div>

                <DisclosurePanel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                  {isLoggedIn && (
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt=""/>
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-gray-400">{user.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            onClick={(event) => {
                              item.onClick && item.onClick();
                              // event.preventDefault();
                            }}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </div>
                    </div>
                  )}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          {/*<header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">TweetApp Demo</h1>

          </div>
        </header>*/}
          <main className={"grow flex flex-col"}>
            <div className="py-6 sm:px-6 lg:px-8 grow flex flex-col" style={{
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: 'cover',
              // backgroundPosition: 'center center',
              // backgroundAttachment: 'fixed',
              // backgroundImage: 'url(https://images.unsplash.com/photo-1527086983597-b4d44c4a66d0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
            }}>{children}</div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              className={"white-popup"}
              style={modalStyles}
              contentLabel="Change Password Modal">
              <ChangePassword setLoading={setIsLoading} setIsOpen={setIsOpen} logout={logout}/>
            </Modal>
          </main>
        </div>
      </>
    </LoadingOverlay>
  );
}
