import styles from "../styles/TedTalk.module.css";

export const TedTalk = ({ src, width = "100%", height = 480 }) => {
  return (
    <div className={styles.tedtalkContainer}>
      <iframe
        width={width}
        height={height}
        src={src}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen="1"
      />
    </div>
  );
};

// <div style="max-width:854px">
//    <div style="position:relative;height:0;padding-bottom:56.25%">
//      <iframe src="https://embed.ted.com/talks/luis_zambrano_these_salamanders_snack_on_each_other_but_don_t_die" width="854" height="480" style="position:absolute;left:0;top:0;width:100%;height:100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div></div>
