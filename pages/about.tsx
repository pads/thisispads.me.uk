import { faWindowRestore } from "@fortawesome/free-regular-svg-icons";
import { faBiking, faLaptopCode, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../components/layout";

const handleFetchLiveTrack = async () => {
    try {
        const response = await fetch("/api/live-track");
        const data = await response.json();
        window.open(data.url, "_blank", "noopener,noreferrer");
    } catch {
        alert("Sorry, this feature isn't working right now. Please try again later.");
    }
};

export default function About(): JSX.Element {
    return (
        <Layout title="About" description="About Ben Paddock" url={`${process.env.HOST}/about`}>
            <section>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-2" icon={faWindowRestore} fixedWidth size="sm" />
                    <h2 className="uppercase">This Website</h2>
                </div>
                <br />
                <p>
                    This website was written using{" "}
                    <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                        Next.js
                    </a>{" "}
                    and is hosted on{" "}
                    <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
                        Netlify
                    </a>
                    . It can run without JavaScript and is tested for accessability issues using{" "}
                    <a href="https://www.deque.com/axe/devtools/" target="_blank" rel="noreferrer">
                        axe DevTools
                    </a>
                    .
                </p>
            </section>
            <br />
            <section>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-2" icon={faLaptopCode} fixedWidth size="sm" />
                    <h2 className="uppercase">Work</h2>
                </div>
                <br />
                <p>
                    I have been a professional software developer since 2006. I enjoy developing on the web and across
                    the stack, in a variety of languages.
                </p>
                <p>
                    For more detail about my career, visit my{" "}
                    <a href="https://www.linkedin.com/in/benpaddock/" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>{" "}
                    profile. At present, I am <strong>not</strong> available for hire.
                </p>
            </section>
            <br />
            <section>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-2" icon={faBiking} fixedWidth size="sm" />
                    <h2 className="uppercase">Cycling</h2>
                </div>
                <br />
                <p>
                    I am a member of the{" "}
                    <a href="https://www.wlrcyclingclub.co.uk/" target="_blank" rel="noreferrer">
                        Warwick Lanterne Rouge Cycling Club
                    </a>
                    . If you are into cycling and live around the area, I highly recommend joining!
                </p>
                <iframe
                    className="mb-2.5"
                    height="160"
                    width="300"
                    frameBorder="0"
                    scrolling="no"
                    src="https://www.strava.com/athletes/176806/activity-summary/9dfcb69a89547261a71bd324469120368db011e7"
                ></iframe>
                <p>
                    <button onClick={handleFetchLiveTrack}>
                        See where I am cycling right now
                    </button>
                </p>
            </section>
            <br />
            <section>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon className="mr-2" icon={faMusic} fixedWidth size="sm" />
                    <h2 className="uppercase">Music</h2>
                </div>
                <br />
                <p>
                    I have a keen interest in music. I have been a DJ in the past, presenting on university radio and
                    playing in clubs. I have a Fender electric guitar that I should really be playing more!
                </p>
            </section>
        </Layout>
    );
}

