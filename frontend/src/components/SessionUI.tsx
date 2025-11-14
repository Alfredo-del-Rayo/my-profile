import useRouteChange from "../hooks/useRouteChange.ts";
export default function SessionUI() {
    const {sessionStatus, expiration: _expiration} = useRouteChange();
    const isAuthenticated =  sessionStatus === "authenticated";
    if (isAuthenticated){
        return ( <img className="icon-image" src="/lock-open.svg" alt="" /> )
    } else {
         return ( <img className="icon-image" src="/lock-closed.svg" alt="" />)
    }
}