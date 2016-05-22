export default function getImpressionValue(post) {
  try {
    return post.insights.data.find(
      (insight) => insight.name === 'post_impressions'
    ).values[0].value;
  } catch (_) {
    // return 0 if passed argument post was broken
    return 0;
  }
}
