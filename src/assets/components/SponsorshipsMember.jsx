import { useEffect, useState } from "react";

function SponsorshipsMember() {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);

    const sponsorships = [
        {
            id: 1,
            brand: "Royal Canin",
            image: 'https://urbanpets.rs/online/image/cache/catalog/royal-canin-hrana-za-pse/royal-canin-hrana-za-pse-maxi-adult-600x600.jpg.webp'
        },
        {
            id: 2,
            brand: "Hill's Science Diet",
            image: "https://i5.walmartimages.com/seo/Hill-s-Science-Diet-Dry-Dog-Food-Adult-Small-Bites-Chicken-Barley-Recipe-5-lb-Bag_8d425b3f-ccd1-462c-8c57-853459064c1b.9e1639d07feabe6b1ec2f0f4c634c58d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
        },
        {
            id: 3,
            brand: "Blue Buffalo",
            image: "https://i5.walmartimages.com/seo/Blue-Buffalo-Life-Protection-Formula-Natural-Adult-Dry-Dog-Food-Chicken-and-Brown-Rice-24-lb_f532933d-38dd-40be-a3f8-b4bec1b33668.09af0e2cbefc68cd30b77e32f88ed71c.jpeg"
        },
        {
            id: 4,
            brand: "Purina Pro Plan",
            image: "https://m.media-amazon.com/images/I/81-JmwroOOS._AC_UF1000,1000_QL80_.jpg"
        },
        {
            id: 5,
            brand: "Wellness Core",
            image: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2518701-center-1"
        }
    ];

    useEffect(() => {
        let startBrand = setInterval(() => {
            setIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % sponsorships.length;
                setData(sponsorships[newIndex]);
                return newIndex;
            })
        }, 2000);

        return () => {
            clearInterval(startBrand);
        };
    }, []);

    const progressBrands = () => {
        return ((index + 1) / sponsorships.length) * 100;
    };

    return (
        <div className="flex flex-col justify-center items-center mt-8">
            <div className="bg-blue-200 p-6 rounded-xl shadow-lg">
                <h2 className="text-center text-blue-800 text-xl font-semibold mb-4">Sponsorships</h2>
                <div
                    style={{ width: `${progressBrands()}%` }}
                    className="h-2 bg-blue-600 rounded-full mb-6 transition-all  ease-in-out"
                ></div>
                <div className="flex justify-center">
                    <img
                        src={data.image}
                        alt="sponsorships"
                        className="h-60 w-60 object-contain rounded-full shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default SponsorshipsMember;
