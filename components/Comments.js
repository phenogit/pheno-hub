import Markdown from "markdown-to-jsx";
import ms from "ms";

export default function Comments({ slug }) {
  const comments = [];

  if (!comments) {
    return (
      <div className="comments">
        <div className="comments-info">loading...</div>
      </div>
    );
  }

  return (
    <div>
      {comments && comments.length > 0 ? (
        <div className="comments">
          {comments.map((c) => (
            <div
              key={c.id}
              className={c.clientOnly ? "comment client-only" : "comment"}
            >
              <div className="comment-content">
                <Markdown>{c.content || ""}</Markdown>
              </div>
              <div className="comment-author">
                <img src={c.avatar} title={c.name} />
                <div>
                  {c.name} ({ms(Date.now() - c.createdAt)} ago)
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="comments">
          <div className="comments-info">No comments so far.</div>
        </div>
      )}
    </div>
  );
}
