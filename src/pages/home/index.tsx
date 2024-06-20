import {FC} from "react";
import {HomeNotLoggedIn} from "./out.tsx";
import {Layout} from "../../components/layout.tsx";
import {HomeLoggedIn} from "./in.tsx";
import {useAuth} from "../../hooks/AuthProvider.tsx";

export const Home: FC = () => {
  const auth = useAuth() as any;
  const isLoggedIn = (auth?.user != null) as boolean;

  return (
    <Layout>
      <>
        {!isLoggedIn && (<div className={'mb-3 mt-[90px] grow'}>
            <>Home Introductory Text</>
          </div>
        )}
        {!isLoggedIn && <HomeNotLoggedIn/>}
        {isLoggedIn && <HomeLoggedIn/>}
      </>
    </Layout>
  )
}
