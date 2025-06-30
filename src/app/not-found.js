import Image from "next/image";



const NotFound = () => {
    return (
        <section className='section'>
            <div className='container'>
                <div className="pagenotfound">
                    <Image
                        src="/assets/img/page-not-found.png"
                        width={100}
                        height={100}
                        alt="page not found"
                        className="not-found-img"
                        unoptimized
                    />
                </div>
            </div>
        </section>
    );
}

export default NotFound;
