

function Story() {
    const dogStories = [
        {
            owner: "Alice Johnson",
            dogImage: "https://w0.peakpx.com/wallpaper/127/935/HD-wallpaper-cute-dog-trees-dog-stones-nature.jpg"
        },
        {
            owner: "Bob Smith",
            dogImage: "https://st4.depositphotos.com/2166177/20076/i/450/depositphotos_200767750-stock-photo-dog-forest-old-labrador-retriever.jpg"
        },
        {
            owner: "Charlie Brown",
            dogImage: "https://www.thesprucepets.com/thmb/wBrxNlKB2jdg998eByNbLEVe0Qs=/1500x0/filters:no_upscale():strip_icc()/GettyImages-840217160-baaf0f08b17c477b8a34e28ab0b221a6.jpg"
        },
        {
            owner: "Diana Prince",
            dogImage: "https://www.thesprucepets.com/thmb/kUIpKapl2GTI-YhBeBo8k7mXZL0=/3600x0/filters:no_upscale():strip_icc()/best-small-dogs-for-kids-5087579-hero-059f95575185485ab365f6a09811131b.jpg"
        },
        {
            owner: "Ethan Hunt",
            dogImage: "https://www.petbarn.com.au/petspot/app/uploads/2015/12/Hyg5-4_Petbarn_What-type-of-dog-is-best-for-small-children.jpg"
        }
    ];
    return (

        <div className="container mx-auto flex w-3/4 justify-center items-center mt-8">
            <div className="flex gap-2 mb-6">
                {dogStories.map((el, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={el.dogImage}
                            alt={el.owner}
                            className="w-80 h-80  object-cover rounded-xl transition-transform transform group-hover:scale-105 group-hover:shadow-2xl"
                        />
                        <p className="absolute inset-0 text-center mt-2 text-xl text-white font-bold">{el.owner}</p>
                    </div>
                ))}
            </div>
        </div>




    )
}

export default Story