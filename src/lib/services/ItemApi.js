/** 게시글 전체 가져오기 */
export async function getArticles() {
  const res = await fetch(`https://panda-market-api.vercel.app/articles`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("게시글 목록을 가져오는데 실패했습니다");
  }
  const json = await res.json();

  const sorted = (json.list || []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return { ...json, list: sorted };
}

/** 특정 게시글 가져오기 */
export async function getArticleById(id) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/articles/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`${id}의 게시글 목록을 가져오는데 실패했습니다`);
  }
  const result = await res.json();

  return result;
}

export async function addArticle({ title, content }) {
  try {
    const response = await fetch(
      "https://panda-market-api.vercel.app/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          image: "https://example.com/image.jpg",
        }),
      }
    );
    if (!response.ok) {
      throw new Error("게시글 작성 실패");
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(articleId) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/articles/${articleId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("게시글 삭제 실패");
  }
  return { success: true };
}
