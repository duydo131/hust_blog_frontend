import SocialNetwork from "../components_hust/SocialNetwork";
import MainContent from "./MainContent";

function Content(){
    return (
        <div id="content" style={{display: 'inline-block'}}>
            <SocialNetwork/>
            <MainContent />
        </div>
    )
}
export default Content;