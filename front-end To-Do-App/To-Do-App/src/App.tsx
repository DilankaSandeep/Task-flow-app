
import './App.css'
import {SignIn} from "./component/sign-in/signIn.tsx";
import 'animate.css';
import  {onAuthStateChanged} from  'firebase/auth';
import {Loader} from "./component/loader/Loader.tsx";
import {useEffect, useState} from "react";
import {auth} from "./firebase.ts";
import {useUser, useUserDispatcher} from "./contex/UserContex.tsx";
import {Header} from "./component/header/Header.tsx";

function App() {

    const [loader, setLoader] = useState(true);
    const user = useUser();
    const userDispatcher = useUserDispatcher();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoader(false);
            if (user) {
                userDispatcher({type: 'sign-in', user});
            } else {
                userDispatcher({type: 'sign-out'});
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            {loader ?
                <Loader/>
                :

                user ?
                    (<>
                        <Header/>

                    </>)
                    :
                    <SignIn/>
            }

        </>
    )
}

export default App
