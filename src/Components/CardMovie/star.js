import PropTypes, { any } from "prop-types";
import "./CardMovie.scss";

function Star({ data }) {
  return (
    <div className="relative">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.98067 16.9967C10.2997 16.8027 10.7003 16.8027 11.0193 16.9967L15.5774 19.7666C16.334 20.2264 17.2708 19.5488 17.0709 18.6863L15.8565 13.4448C15.7731 13.0849 15.8949 12.7083 16.1734 12.4654L20.2237 8.93252C20.8889 8.3523 20.531 7.25767 19.6515 7.18254L14.3336 6.72828C13.9634 6.69665 13.6412 6.46235 13.497 6.11987L11.4217 1.18955C11.0782 0.373509 9.92183 0.37351 9.57833 1.18955L7.50295 6.11987C7.35879 6.46235 7.03662 6.69665 6.66639 6.72828L1.3485 7.18254C0.469014 7.25767 0.111086 8.3523 0.776285 8.93252L4.82665 12.4654C5.10506 12.7083 5.2269 13.0848 5.14351 13.4448L3.92907 18.6863C3.72924 19.5488 4.66604 20.2264 5.42259 19.7666L9.98067 16.9967Z"
          fill="url(#paint0_linear_628_760)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_628_760"
            x1="10.5"
            y1="-1"
            x2="10.5"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#DF8214" />
            <stop offset="1" stop-color="#F5C518" />
          </linearGradient>
        </defs>
      </svg>
      <span className="star">{data}</span>
    </div>
  );
}

Star.defaultProps = {
  data: any,
};

Star.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Star;
