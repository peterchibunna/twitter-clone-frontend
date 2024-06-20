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
            <div className={'text-shadow text-lg w-[300px] md:w-[800px] mx-auto'}>
              <h1 className={''}>Home Introductory Text</h1>
              <p>We exist to help others turn their ideas into great designs faster, easier, and better. We put
                innovative technology –like AI– and best-quality content within reach of everyone, including designers,
                marketers, small business owners, educators, and content creators.</p>
              <p>We exist to help others turn their ideas into great designs faster, easier, and better. We put
                innovative technology –like AI– and best-quality content within reach of everyone, including designers,
                marketers, small business owners, educators, and content creators.</p>
            </div>
          </div>
        )}
        {!isLoggedIn && <HomeNotLoggedIn/>}
        {isLoggedIn && <HomeLoggedIn/>}
      </>
    </Layout>
  )
}
