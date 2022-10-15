import React from "react";
import PropTypes from "prop-types";
import "./YoutubeVideo.scss";

const YoutubeEmbed = ({ embed_id }) => (
  <div className="video-responsive">
    <iframe
      src={`https://www.youtube.com/embed/${embed_id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embed_id: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
