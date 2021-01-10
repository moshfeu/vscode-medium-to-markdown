export const getPostDetails = (postContent: string) => {
  const splitter = '=====================================';
  return {
    title: postContent.split(splitter)[0],
    content : postContent
  }
}

export const getFileName = (title: string): string => {
  return title.replace(/ /g, '-').toLowerCase();
}