import "../../CSS/Home/ADT.css";
import IMG from  "../../assets/Hero.png";
import Frame1 from "../../assets/Frame1.png";
import Frame3 from "../../assets/Frame3.png";

export default function ADT() {
  return (
    <div className="adtm">
    <img src={Frame3} alt="frame" className="adti" />
    <div className="mainAdt">
         <div className="contentAdt">
            <div className="p1Adt">
                <p>..YAJVEER AYURVEDIC FOR WELLNESS..</p>
                <h1>UNLOCK WELLNESS WITH YAJVEER AYURVED</h1>
                 <h4>Discover the Power of Yajveer Ayurvedic Powders for Holistic Wellness</h4>
            </div>
            <div className="p2Adt">
                <div className="p2a1"><p><i className="bi bi-arrow-right ms-2 aradt"></i> 100% Indigenous and Ayurvedic</p></div>
                <div className="p2a2"><p><i className="bi bi-arrow-right ms-2 aradt"></i> Sustainability & Quality</p></div>
                <div className="p2a3"><p><i className="bi bi-arrow-right ms-2 aradt"></i> No Harmful Side Effects</p></div>
                <div className="p2a4"><p><i className="bi bi-arrow-right ms-2 aradt"></i> Safe and Effective</p></div>
            </div>
         </div>
         <div className="imgAdt">
             <img src={IMG} alt="" />
         </div>
    </div>
    <img src={Frame1} alt="frame" className="adti"  />
    </div>
  );
}