import { getBlogs } from '@/services/get-blogs';
import RightSlideListsClient from './RightSlideListsClient';

const RightSlideLists = async ({ blogId }) => {
  const result = await getBlogs();

  // Handle error cases
  if (result.error || result.notFound || !result.blogs) {
    return <RightSlideListsClient blogs={[]} blogId={blogId} />;
  }

  return <RightSlideListsClient blogs={result.blogs} blogId={blogId} />;
};

export default RightSlideLists;
