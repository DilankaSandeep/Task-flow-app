import './Loader.css'
import {useUser} from "../../contex/UserContex.tsx";
export const Loader = () => {
    return (
        <>

            <div className="lds-ripple w-full h-full">
                <div></div>
                <div></div>
            </div>
        </>
    );

};