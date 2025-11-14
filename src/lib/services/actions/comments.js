"use server";

export async function addComment({ articleId, content }) {
  try {
    const response = await fetch(
      `http://panda-market-api.vercel.app/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          createdAt: new Date().toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("댓글 작성 실패");
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getComments(articleId) {
  const response = await fetch(
    `http://panda-market-api.vercel.app/articles/${articleId}/comments?_sort=createdAt&order=desc`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("댓글 불러오기 실패");
  }

  const data = await response.json();
  return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function deleteComment(articleId, commentId) {
  const response = await fetch(
    `http://panda-market-api.vercel.app/articles/${articleId}/comments/${String(
      commentId
    )}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("댓글 삭제 실패");
  }
  return { success: true };
}
