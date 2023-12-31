import {signOut} from "firebase/auth"
import {auth} from "../../firebase.ts";
import {Switcher} from "../../Switcher.tsx";
import {useUser} from "../../contex/UserContex.tsx";
import './Header.css'
export const Header = () => {
    const user = useUser();

    const nameArray = user?.displayName?.split(" ");
    // @ts-ignore
    const firtName = nameArray[0]!;
    function handlesignout(){
        signOut(auth);
    }


    return (

        <>
            <div className="flex flex-row justify-between p-2">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-2xl dark:text-white">Organize, Prioritize, Achieve: <span className="text-blue-600 dark:text-blue-500">Task-Flow </span>Achieve your Targets</h1>
                <div className="flex flex-row gap-8">
                    <Switcher />
                    <div className="user text-blue-600 dark:text-white">
                        <div>Signed In As</div>
                        {firtName}
                    </div>
                    <button type="button"
                            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlesignout}>Sign-Out
                    </button>
                </div>


            </div>
        </>
    );
};