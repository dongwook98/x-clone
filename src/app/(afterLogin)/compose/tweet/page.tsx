import TweetModal from '../../@modal/(.)compose/tweet/page';
import HomePage from '../../home/page';

export default function CratePostPage() {
  return (
    <>
      {/* HomePage는 레이아웃의 children으로 들어감 */}
      <HomePage />
      {/* TweetModal은 레이아웃의 modal로 들어감 */}
      <TweetModal />
    </>
  );
}
