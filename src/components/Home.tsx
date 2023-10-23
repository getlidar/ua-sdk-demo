import { Link } from "react-router-dom";

export function Home() {
  return(
    <div>
      <div className="h-screen flexcol justify-center">
        <div className="flexrow spaceAround">
          <Link
            to={'http://localhost:3001/events-example'}
          >
            <div className="helikaButtonClass px-10">
              Events
            </div>
          </Link>
          <Link
            to={'http://localhost:3001/ua-example'}
          >
            <div className="helikaButtonClass px-10">
              UA
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}