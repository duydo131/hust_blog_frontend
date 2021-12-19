import PortletLayout from "./../components_hust/PortletLayout";
import News from "./../components_hust/News";
import EventNew from "../components_hust/EventNew";
import AdmissionNew from "../components_hust/AdmissionNew";
import ActivityStident from "../components_hust/ActivityStident";

function MainContent() {
    return (
        <div className="Hust_Trangchu" id="main-content" role="main">
            <PortletLayout />
            <News />
            <EventNew />
            <AdmissionNew />
            <ActivityStident />
        </div>
    )
}

export default MainContent;