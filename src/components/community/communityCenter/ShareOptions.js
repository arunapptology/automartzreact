import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { navCommunity } from "../../navbar/navigationSlugs";

const ShareOptions = () => {
  const url = `https://automartz.com${navCommunity}`;
  return (
    <>
      <div className="share__options">
        {/* <FacebookShareButton url={url}>
          <FacebookIcon />
        </FacebookShareButton> */}
        <TwitterShareButton url={url}>
          <TwitterIcon />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon />
        </LinkedinShareButton>
        <RedditShareButton url={url}>
          <RedditIcon />
        </RedditShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareOptions;
