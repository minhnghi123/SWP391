import { Link} from "react-router-dom";
import Header from '../components/home/headerHomePage';
import BodyHomePage from '../components/home/bodyHomePage';
import FooterHomePage from '../components/home/footerHomPage';


export default  function Home(){

    return (
        <>
        <Header/> 
        <BodyHomePage/> 
        <FooterHomePage/>
        </>
    )
}
