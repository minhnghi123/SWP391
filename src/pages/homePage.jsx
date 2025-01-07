import { Link} from "react-router-dom";
export default  function Home(){

    return (
        <>
       <div className="">
        <div>Home </div>
       <Link to="/loginPage"> <div>Login</div> </Link>
       </div>
       <div>aloalo</div>
        </>
    )
}