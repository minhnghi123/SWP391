import { Link} from "react-router-dom";
import Header from '../components/headerHomePage';
import BodyHomePage from '../components/bodyHomePage';
import FooterHomePage from '../components/footerHomPage';


export default  function Home(){

    return (
        <>
    
        <Header/> 
        <BodyHomePage/> 
        <FooterHomePage/>
        </>
    )
}
