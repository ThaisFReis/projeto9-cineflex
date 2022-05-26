export default function Footer({ src, title, weekday, time }) {
    return (
        <>
            <footer>
                <div className="poster" alt="poster">
                    <img src={src} alt="poster" />
                </div>
                <div className="sessionInfor">
                    <h1>{title}</h1>
                    <h2>{weekday} - {time}</h2>
                </div>
            </footer>
        </>
    )

}