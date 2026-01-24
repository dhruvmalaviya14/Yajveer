import { useRef, useEffect } from 'react';
import '../../CSS/Home/Slider2.css';
import img1 from '../../assets/NavBar2/AMLA.png';
import img2 from '../../assets/NavBar2/ASHWAGANDHA.png';
import img3 from '../../assets/NavBar2/Jamun.png';
import img4 from '../../assets/NavBar2/Karela.png';
import img5 from '../../assets/NavBar2/METHI.png';
import img6 from '../../assets/NavBar2/Moringa.png';

const Slider2 = () => {
    const sliderRef = useRef(null);

    const products = [
        { img: img1 },
        { img: img2 },
        { img: img3 },
        { img: img4 },
        { img: img5 },
        { img: img6 }
    ];

    useEffect(() => {
        const el = sliderRef.current;
        const onWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };
        el.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', onWheel);
        };
    }, []);

    return (
        <div className="slider2-section">
            <div className="slider2-header">
                <h2 className="slider2-title">What's Inside Our Product?</h2>
                <p className="slider2-subtitle">
                    Our carefully selected ingredients are rooted in Ayurvedic tradition, known to support your health and well-being naturally. Scroll to explore the richness of each herbal element.
                </p>
            </div>

            <div className="slider2-container">
                <div className="slider2-wrapper" ref={sliderRef}>
                    {products.map((product, index) => (
                        <div className="slider2-item" key={index}>
                            <div className="image-container">
                                <img src={product.img} alt={`Product ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider2;
