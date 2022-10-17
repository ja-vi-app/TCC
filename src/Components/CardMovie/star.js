import PropTypes, { any } from "prop-types";
import "./CardMovie.scss";

function Star({ data, isSmall }) {
  return (
    <div
      className="relative flex justify-center align-center"
      style={isSmall ? null : { transform: "scale(2)", marginTop: "1.5rem" }}
    >
      <svg
        width="35"
        height="32"
        viewBox="0 0 35 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.4676 27.3586C17.1026 26.9758 17.8974 26.9758 18.5324 27.3586L25.4932 31.5542C27.0082 32.4673 28.8756 31.1088 28.4732 29.3863L26.6279 21.4868C26.4589 20.7632 26.705 20.0055 27.2669 19.5193L33.4112 14.2037C34.7498 13.0457 34.0352 10.8477 32.2715 10.6983L24.1807 10.0128C23.4418 9.95022 22.7982 9.48393 22.5085 8.80132L19.3411 1.33798C18.6515 -0.286881 16.3485 -0.286882 15.6589 1.33798L12.4915 8.80132C12.2018 9.48393 11.5582 9.95022 10.8193 10.0128L2.72846 10.6983C0.964847 10.8477 0.250241 13.0457 1.58878 14.2037L7.73307 19.5193C8.29504 20.0055 8.54113 20.7632 8.3721 21.4868L6.52676 29.3863C6.12439 31.1088 7.99184 32.4673 9.50677 31.5542L16.4676 27.3586Z"
          fill="url(#paint0_linear_635_1496)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_635_1496"
            x1="17.5"
            y1="-3"
            x2="17.5"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#DF8214" />
            <stop offset="1" stopColor="#F5C518" />
          </linearGradient>
        </defs>
      </svg>

      <span className="star">{data}</span>
    </div>
  );
}

Star.defaultProps = {
  data: any,
  isSmall: true,
};

Star.propTypes = {
  data: PropTypes.number.isRequired,
  isSmall: PropTypes.bool.isRequired,
};

export default Star;
